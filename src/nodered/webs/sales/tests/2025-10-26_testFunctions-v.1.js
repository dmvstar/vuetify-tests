/**
 * @param {number} year - The full year (e.g., 2025).
 * @param {number} month - The month (0 for January, 11 for December).
 * @returns {Date} The Date object for the last day of the month.
 */
function getLastDayDate(year, month) {
  // Use month + 1 for the next month, and 0 for the day.
  // JavaScript auto-corrects this to the last day of the 'month' parameter.
  return new Date(year, month , 0).toISOString().slice(0,10);
}

// Example: Get the last day of February 2024 (a leap year)
const lastDayFeb2024 = getLastDayDate(2024, 1); // Month 1 is February
console.log(lastDayFeb2024); 
// Output: Thu Feb 29 2024 00:00:00 GMT... (The 29th)

// Example: Get the last day of October 2025
const lastDayOct2025 = getLastDayDate(2025, 9); // Month 9 is October
console.log(lastDayOct2025);
// Output: Fri Oct 31 2025 00:00:00 GMT... (The 31st)


var fromDate = new Date('2025-01-01');
var intoDate = new Date(fromDate.getFullYear(), fromDate.getMonth()+1 , 0);

console.log(fromDate.toISOString().slice(0,10), intoDate.toISOString().slice(0,10));
//new Date(fromDate.getFullYear(), getMonth() , 0).toISOString().slice(0,10)

