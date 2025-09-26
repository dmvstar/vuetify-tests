/**
 * Formats a Date object into a string based on a provided pattern.
 * This function mimics the behavior of Java's SimpleDateFormat for a subset of patterns.
 * * @param {Date} dateObj The Date object to format.
 * @param {string} pattern The pattern string. Supported patterns:
 * - yyyy: The full year (e.g., 2023)
 * - MM: The month of the year (01-12)
 * - dd: The day of the month (01-31)
 * - HH: The hour in 24-hour format (00-23)
 * - mm: The minute (00-59)
 * - ss: The second (00-59)
 * - SSS: The millisecond (000-999)
 * - EEEE: The full day of the week name (e.g., Monday)
 * - E: The abbreviated day of the week name (e.g., Mon)
 * @returns {string} The formatted date string.
 */
function formatDateByPattern(dateObj, pattern) {
    if (!(dateObj instanceof Date) || isNaN(dateObj)) {
        console.error("Invalid Date object provided.");
        return "";
    }

    // Helper function to pad a number with a leading zero
    const pad = (number) => number.toString().padStart(2, '0');
    // Helper function to pad milliseconds
    const padMs = (number) => number.toString().padStart(3, '0');

    // Mappings for day and month names
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Replace the pattern tokens with the corresponding date values
    const replacements = {
        'yyyy': dateObj.getFullYear(),
        'MM': pad(dateObj.getMonth() + 1),
        'dd': pad(dateObj.getDate()),
        'HH': pad(dateObj.getHours()),
        'mm': pad(dateObj.getMinutes()),
        'ss': pad(dateObj.getSeconds()),
        'SSS': padMs(dateObj.getMilliseconds()),
        'EEEE': dayNames[dateObj.getDay()],
        'E': dayNamesShort[dateObj.getDay()]
    };

    let formattedString = pattern;
    for (const key in replacements) {
        if (Object.prototype.hasOwnProperty.call(replacements, key)) {
            // Use a regex to replace all occurrences of the pattern key
            const regex = new RegExp(key, 'g');
            formattedString = formattedString.replace(regex, replacements[key]);
        }
    }

    return formattedString;
}

/**
 * Parses a date string into a Date object based on a provided pattern.
 * This is the reverse function for formatDateByPattern.
 * @param {string} dateString The date string to parse.
 * @param {string} pattern The pattern string to use for parsing.
 * @returns {Date | null} The parsed Date object, or null if parsing fails.
 */
function parseDateFromPattern1(dateString, pattern) {
    // Escape special characters in the pattern to be used in a regex
    const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const date = new Date();
    const offsetInMinutes = date.getTimezoneOffset();
    const offsetInHours = offsetInMinutes / 60
    
    // Create a mapping of pattern parts to regex groups
    const patternRegexMap = {
        'yyyy': '(\\d{4})',
        'MM': '(\\d{2})',
        'dd': '(\\d{2})',
        'HH': '(\\d{2})',
        'mm': '(\\d{2})',
        'ss': '(\\d{2})',
        'SSS': '(\\d{3})',
        'EEEE': '([a-zA-Z]+)', // Matches day names like 'Monday'
        'E': '([a-zA-Z]+)' // Matches abbreviated day names like 'Mon'
    };
    
    // Get the order of the patterns
    const patternOrder = ['yyyy', 'MM', 'dd', 'HH', 'mm', 'ss', 'SSS'];
    const regexParts = [];
    
    // Build the dynamic regex and capture the order of groups
    let regexString = escapedPattern;
    for (const key of patternOrder) {
        if (regexString.includes(key)) {
            regexString = regexString.replace(new RegExp(key, 'g'), patternRegexMap[key]);
            regexParts.push(key);
        }
    }
    
    // Handle day names separately since they don't affect the Date constructor
    regexString = regexString.replace(/EEEE/g, patternRegexMap['EEEE']);
    regexString = regexString.replace(/E/g, patternRegexMap['E']);

    const finalRegex = new RegExp(`^${regexString}$`);
    const match = finalRegex.exec(dateString);

    if (!match) {
        console.error("Failed to parse date string. No match found.");
        return null;
    }

    // Extract values based on the order determined above
    let year, month, day, hour=0, minute=0, second=0, millisecond=0;
    for (let i = 0; i < regexParts.length; i++) {
        const value = parseInt(match[i + 1], 10);
        switch (regexParts[i]) {
            case 'yyyy': year = value; console.error(value);   break;
            case 'MM': month = value - 1; break; // Months are 0-indexed in JS
            case 'dd': day = value; break;
            case 'HH': hour = value; break;
            case 'mm': minute = value; break;
            case 'ss': second = value; break;
            case 'SSS': millisecond = value; break;
            default :break;
        }
    }

    // Return the new Date object    
    const str = `new Date (${year}, ${month}, ${day}, ${hour}, ${minute}, ${second}, ${millisecond})`
    console.log("   Original Date:", str);
    const parsedDate = new Date(year, month, day, hour-offsetInHours, minute, second, millisecond);

    // Basic validation
    if (isNaN(parsedDate)) {
        console.error(`Failed to create a valid Date object for ${str}.`);
        return null;
    }

    return parsedDate;
}
function parseDateFromPattern(dateString, pattern) {
    const patternRegexMap = {
        'yyyy': '(\\d{4})',
        'MM': '(\\d{2})',
        'dd': '(\\d{2})',
        'HH': '(\\d{2})',
        'mm': '(\\d{2})',
        'ss': '(\\d{2})',
        'SSS': '(\\d{3})',
        'EEEE': '([a-zA-Z]+)', // Matches day names like 'Monday'
        'E': '([a-zA-Z]+)' // Matches abbreviated day names like 'Mon'
    };

    // Correctly build the regex and a list of keys in the order they appear
    const orderedKeys = [];
    let regexString = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    for (const key in patternRegexMap) {
        if (regexString.includes(key)) {
            // Use a non-greedy regex to find all occurrences
            const regex = new RegExp(key, 'g');
            let match;
            while ((match = regex.exec(regexString)) !== null) {
                orderedKeys.push({ key: key, index: match.index });
            }
        }
    }
    
    // Sort keys by their index in the pattern string
    orderedKeys.sort((a, b) => a.index - b.index);

    // Build the final regex string with capture groups in the correct order
    for (const item of orderedKeys) {
        const regex = new RegExp(item.key, 'g');
        regexString = regexString.replace(regex, patternRegexMap[item.key]);
    }
    
    const finalRegex = new RegExp(`^${regexString}$`);
    const match = finalRegex.exec(dateString);

    if (!match) {
        console.error("Failed to parse date string. No match found.");
        return null;
    }

    // Now, correctly map the captured values to date parts.
    let year, month, day, hour=0, minute=0, second=0, millisecond=0;
    for (let i = 0; i < orderedKeys.length; i++) {
        const value = parseInt(match[i + 1], 10);
        switch (orderedKeys[i].key) {
            case 'yyyy': year = value; break;
            case 'MM': month = value - 1; break; // Months are 0-indexed in JS
            case 'dd': day = value; break;
            case 'HH': hour = value; break;
            case 'mm': minute = value; break;
            case 'ss': second = value; break;
            case 'SSS': millisecond = value; break;
        }
    }

    const parsedDate = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));

    // Basic validation
    if (isNaN(parsedDate.getTime())) {
        console.error("Failed to create a valid Date object.");
        return null;
    }

    return parsedDate;
}
// --- Example Usage for formatDateByPattern ---

// Create a new Date object
/*
const myDate = new Date();
myDate.setFullYear(2023, 8, 25); // Set to September 25, 2023
myDate.setHours(14, 30, 5, 123); // Set to 14:30:05.123

console.log("Original Date:", myDate.toString());

// Example 1: Full date and time
const pattern1 = "yyyy-MM-dd HH:mm:ss.SSS";
const formattedDate1 = formatDateByPattern(myDate, pattern1);
console.log(`Pattern "${pattern1}":`, formattedDate1);

// Example 2: Date with full day of the week
const pattern2 = "EEEE, MMMM dd, yyyy";
const formattedDate2 = formatDateByPattern(myDate, pattern2);
console.log(`Pattern "${pattern2}":`, formattedDate2);

// --- Example Usage for parseDateFromPattern ---
console.log("\n--- Parsing Examples ---");

// Parsing Example 1: Round-trip from the first example
const parsedDate1 = parseDateFromPattern(formattedDate1, pattern1);
console.log(`Parsing "${formattedDate1}" with pattern "${pattern1}":`, parsedDate1);
*/
/*
// Parsing Example 2: Parsing a different string
const dateString2 = "2024-03-10 09:05:45.000";
const patternString2 = "yyyy-MM-dd HH:mm:ss.SSS";
const parsedDate2 = parseDateFromPattern(dateString2, patternString2);
console.log(`Parsing "${dateString2}" with pattern "${patternString2}":`, parsedDate2);

// Parsing Example 3: Parsing with a different pattern
const dateString3 = "12/25/2023";
const patternString3 = "MM/dd/yyyy";
const parsedDate3 = parseDateFromPattern(dateString3, patternString3);
console.log(`Parsing "${dateString3}" with pattern "${patternString3}":`, parsedDate3);
*/

var patterns = [
    {
        dateString : "2024-03-10 09:05:45.000",
        patternString : "yyyy-MM-dd HH:mm:ss.SSS"
    },
    {
        dateString : "12/25/2023",
        patternString : "MM/dd/yyyy"
    },
    {
        dateString : "12.09.2025",
        patternString : "dd.MM.yyyy"
    },
]

for(var o of patterns) {
    o.parsedDate = parseDateFromPattern(o.dateString, o.patternString);
}

console.log(`Parsing`, patterns);
