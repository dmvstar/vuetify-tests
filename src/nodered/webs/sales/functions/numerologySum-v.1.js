function numerologySum(str) {
  // Usuń wszystkie znaki niebędące cyframi
  const digitsOnly = str.replace(/\D/g, '');

  // Jeśli po usunięciu pozostały jakieś cyfry
  if (digitsOnly.length === 0) {
    return 0; // Lub możesz zwrócić null, undefined, lub zgłosić błąd w zależności od wymagań
  }

  let sum = digitsOnly.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);

  // Dopóki suma ma więcej niż jedną cyfrę, kontynuuj sumowanie
  while (sum.toString().length > 1) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }

  return sum;
}

// Przykłady użycia:
/*
console.log(numerologySum("11"));      // Output: 2
console.log(numerologySum("111"));     // Output: 3
console.log(numerologySum("19"));      // Output: 1 (1 + 9 = 10, 1 + 0 = 1)
console.log(numerologySum("12345"));   // Output: 6 (1+2+3+4+5 = 15, 1+5 = 6)
console.log(numerologySum("abc123xyz45")); // Output: 6 (usuwa litery, 1+2+3+4+5 = 15, 1+5 = 6)
console.log(numerologySum(""));        // Output: 0
console.log(numerologySum("---"));     // Output: 0
*/
let dta = "09.11.1970"
console.log(dta, numerologySum(dta));
dta = "1982-10-04"
console.log(dta, numerologySum(dta));


