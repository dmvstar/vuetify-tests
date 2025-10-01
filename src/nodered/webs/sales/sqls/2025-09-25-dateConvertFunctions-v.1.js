/**
 * Formats a Date object into a string based on a provided pattern.
 * This function mimics the behavior of Java's SimpleDateFormat for a subset of patterns.
 * @param {Date} dateObj The Date object to format.
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

    dateString = dateString.slice(0, pattern.length);
    console.log("dateString", dateString);

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
/**
 * Konwertuje ciąg znaków reprezentujący liczbę (z uwzględnieniem
 * europejskich formatów, gdzie przecinek jest separatorem dziesiętnym
 * oraz spacji/apostrofu jako separatora tysięcy) do liczby zmiennoprzecinkowej (double).
 * @param {string | null | undefined} str - Ciąg znaków do konwersji.
 * @returns {number} Przekonwertowana liczba zmiennoprzecinkowa lub NaN, jeśli konwersja się nie powiedzie.
 */
function stringSafeToDouble(str) {
    if (str === null || str === undefined || !isValidNumericString(str)) {
        return 0;
    }

    // 1. Upewnienie się, że mamy string i usunięcie białych znaków na końcach
    let cleanStr = removeNonNumericSymbols(str);//   String(str).trim();

    if (cleanStr.length === 0) {
        return 0; // Pusty ciąg zwraca 0
    }

    // 2. Usunięcie separatorów tysięcy (spacja ' ' i apostrof ''')
    // Używamy wyrażeń regularnych z flagą 'g' (global)
    cleanStr = cleanStr.replace(/[\s'`]/g, '');

    // 3. Zamiana przecinka (europejski separator dziesiętny) na kropkę (JS/angielski separator)
    // UWAGA: Ta operacja zakłada, że ostatni przecinek w ciągu jest separatorem dziesiętnym.
    // Jeśli w stringu jest kropka ORAZ przecinek, to zakłada, że kropka jest separatorem tysięcy
    // (np. 1.200,75), ale po kroku 2 zostawiamy tylko ostatni separator, jeśli to przecinek.
    cleanStr = cleanStr.replace(/,/g, '.');

    // 4. Konwersja na liczbę. parseFloat zatrzyma się, jeśli napotka nieprawidłowe znaki.
    var result = parseFloat(cleanStr);
    return result;
}

/**
 * Sprawdza, czy ciąg znaków zawiera jakiekolwiek znaki inne niż cyfry (0-9), kropka (.),
 * przecinek (,) lub spacja (' ').
 * Przydatne do wstępnej walidacji pól numerycznych.
 * @param {string} str - Ciąg znaków do sprawdzenia.
 * @returns {boolean} True, jeśli ciąg zawiera tylko cyfry, kropki, przecinki lub spacje.
 */
function isValidNumericString(str) {
    if (typeof str !== 'string') {
        return false;
    }
    // Wyrażenie regularne: szuka jakiegokolwiek znaku, który NIE jest cyfrą (\d), kropką (\.),
    // przecinkiem (,) lub białym znakiem (\s).
    // Jeśli znajdzie cokolwiek spoza tej grupy, to znaczy, że zawiera "coś nienumerycznego".
    return !/[^\d.,\s'`-]/.test( removeNonNumericSymbols(str) );
}
/**
 * Czyści ciąg znaków, usuwając separatory tysięcy (spacje, apostrofy),
 * zamieniając przecinek na kropkę oraz usuwając wszelkie inne znaki
 * nienumeryczne (np. waluty, litery), pozostawiając czysty format numeryczny
 * gotowy do konwersji przez parseFloat().
 *
 * @param {string | null | undefined} str - Ciąg znaków do oczyszczenia.
 * @returns {string} Oczyszczony ciąg znaków, zawierający tylko cyfry, kropkę i opcjonalnie znak +/-.
 */
function removeNonNumericSymbols(str) {
    if (str === null || str === undefined) {
        return "0";
    }

    let cleanStr = String(str).trim();
    if (cleanStr.length === 0) {
        return ":0";
    }

    // 1. Usunięcie separatorów tysięcy (spacja ' ' i apostrof ''')
    cleanStr = cleanStr.replace(/[\s'`]/g, '');

    // 2. Zamiana przecinka (europejski separator dziesiętny) na kropkę
    cleanStr = cleanStr.replace(/,/g, '.');

    // 3. Zachowanie tylko fragmentu będącego poprawną liczbą (cyfry, kropka, plus/minus na początku).
    // Usuwa wszystkie niepożądane znaki, takie jak waluty, litery, itp., które mogłyby pozostać.
    var ret = cleanStr.match(/[+-]?\d*\.?\d*/)?.[0] || "";
    //console.log(`removeNonNumericSymbols ${str} => ${ret}`);
    return ret;
}

function toLocalISOString(date) {
    // 1. Get the local time zone offset in minutes. getTimezoneOffset() returns
    //    a value that is positive if the local time is behind UTC and negative if ahead.
    const offsetMinutes = date.getTimezoneOffset();
    
    // 2. Determine the sign for the offset string and calculate absolute hours/minutes.
    const sign = offsetMinutes > 0 ? '-' : '+'; // Invert the sign for the ISO string
    const absOffsetMinutes = Math.abs(offsetMinutes);
    const offsetHours = Math.floor(absOffsetMinutes / 60);
    const offsetMins = absOffsetMinutes % 60;
    
    // 3. Format hours and minutes to be two digits (e.g., '02' or '30').
    const pad = (n) => String(n).padStart(2, '0');
    
    // 4. Construct the timezone offset string (e.g., '+02:00').
    const timezoneOffsetString = `${sign}${pad(offsetHours)}:${pad(offsetMins)}`;
    
    // 5. Adjust the date's internal UTC value to *fake* the local time being UTC.
    //    This ensures toISOString() uses the local hour/minute values.
    const adjustedDate = new Date(date.getTime() - (offsetMinutes * 60000));
    
    // 6. Get the UTC ISO string, remove the 'Z', and append the local offset.
    return adjustedDate.toISOString().slice(0, -1) + timezoneOffsetString;
}

// --- Example Usage ---
// Create a new Date object
const myDate = new Date();
const localISO = toLocalISOString(myDate);

console.log(`Original toISOString: ${myDate.toISOString()}`);
console.log(`Custom Local ISO:     ${localISO}`);

myDate.setFullYear(2023, 8, 25); // Set to September 25, 2023
myDate.setHours(14, 30, 5, 123); // Set to 14:30:05.123
console.log(`Original Date New:    ${toLocalISOString(myDate)}`);

// --- Example Usage for formatDateByPattern ---
var patternsInto = [
    {    
        patternString : "yyyy-MM-dd HH:mm:ss.SSS"
    },
    {    
        patternString : "EEEE, MMMM dd, yyyy"
    },
    {    
        patternString : "yyyy-MM-dd"
    },
    {    
        patternString : "dd.MM.yyyy HH:mm:ss"
    },
    {    
        patternString : "dd.MM.yyyy"
    },
];

for(var o of patternsInto) {
    o.formatDate = formatDateByPattern(myDate, o.patternString);
}
//\\ console.log(`patternsInto`, patternsInto);

// --- Example Usage for parseDateFromPattern ---
var patternsFrom = [
    {
        dateString : "2024-03-10 09:05:45.000",
        patternString : "yyyy-MM-dd HH:mm:ss.SSS"
    },
    {
        dateString : "12/25/2023",
        patternString : "MM/dd/yyyy"
    },
    {
        dateString : "12.09.2025 56",
        patternString : "dd.MM.yyyy"
    },
]

for(var o of patternsFrom) {
    o.parsedDate = parseDateFromPattern(o.dateString, o.patternString);
}
//\\ console.log(`patternsFrom`, patternsFrom);


// Dane testowe
var test_str = [
    "-23,98",        // Przecinek jako separator dziesiętny
    "-22",           // Liczba całkowita
    "2.8766",       // Kropka jako separator dziesiętny
    "23 2.8766",    // Spacja traktowana jako separator tysięcy (wynik: 232.8766)
    "1'200,766",    // Apostrof jako separator tysięcy, przecinek jako dziesiętny
    "1`200`988,76",    // Apostrof jako separator tysięcy, przecinek jako dziesiętny
    "-1`200,76 USD",    // Apostrof jako separator tysięcy, przecinek jako dziesiętny
    "1 200,766",    // Spacja jako separator tysięcy, przecinek jako dziesiętny
    "abc",          // Nieprawidłowy ciąg
    "-99,99 zł",     // Nieprawidłowe znaki po liczbie
    null,           // Null
    ""              // Pusty ciąg
];

test_str = [
    "-1`200,76 USD",    // Apostrof jako separator tysięcy, przecinek jako dziesiętny
    "1`200,76 USD",    // Apostrof jako separator tysięcy, przecinek jako dziesiętny
]
console.log("--- Konwersja za pomocą stringToDouble ---");
for (var o of test_str) {
    var res = stringSafeToDouble(o);
    console.log(`Input: "${o}" => ${res} (Type: ${typeof res})`);
}
