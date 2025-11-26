/**
 * Oblicza numerologiczną redukcję (sumę cyfr do jednej cyfry).
 * Przyjmuje ciąg znaków, usuwa znaki niebędące cyframi i sumuje 
 * pozostałe cyfry, aż wynik będzie jednocyfrowy.
 * * Przykład: 19 -> 1 + 9 = 10 -> 1 + 0 = 1
 * Przykład: "1a2b3" -> 123 -> 1 + 2 + 3 = 6
 * * @param {string} input - Ciąg znaków (może zawierać cyfry i inne znaki).
 * @returns {number} Numerologiczna cyfra (od 1 do 9).
 */
function calculateLifePathNumber(input) {
    // 1. Oczyszczanie i wydobywanie cyfr
    // Zamień wejście na string, usuń wszystkie znaki niebędące cyframi,
    // a następnie połącz cyfry z powrotem w jeden ciąg.
    const cleanDigits = String(input).replace(/\D/g, '');

    // Jeśli po oczyszczeniu ciąg jest pusty, zwróć 0 lub błąd, 
    // w zależności od wymagań (tutaj zwracamy 0 dla bezpieczeństwa).
    if (cleanDigits.length === 0) {
        return 0;
    }

    // Funkcja pomocnicza do sumowania cyfr
    const sumDigits = (numString) => {
        return numString
            .split('')
            .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    };

    // 2. Redukcja (sumowanie cyfr do pojedynczej cyfry)
    let currentSum = sumDigits(cleanDigits);

    // Kontynuuj sumowanie, dopóki suma nie jest jednocyfrowa (i większa od 0)
    while (currentSum > 9) {
        currentSum = sumDigits(String(currentSum));
    }

    // W numerologii, wynik 0 jest często traktowany jako 9, ale 
    // dla czysto matematycznej redukcji, zwracamy sumę.
    // Specjalna obsługa liczby 0 (zwykle nie występuje w tym algorytmie dla liczb > 0)
    // Jeśli wejście było "00" lub "0", currentSum będzie 0.
    return currentSum;
}

// Przykłady użycia:
console.log(`Liczba 11: ${calculateLifePathNumber("11")}`);          // Wynik: 2
console.log(`Liczba 111: ${calculateLifePathNumber("111")}`);        // Wynik: 3
console.log(`Liczba 19: ${calculateLifePathNumber("19")}`);          // Wynik: 1 (1+9=10, 1+0=1)
console.log(`Liczba 29/02/1980: ${calculateLifePathNumber("29021980")}`); // Wynik: 4 (2+9+0+2+1+9+8+0 = 31, 3+1 = 4)
console.log(`Ciąg "1a2b3c4": ${calculateLifePathNumber("1a2b3c4")}`); // Wynik: 1 (1+2+3+4 = 10, 1+0 = 1)
console.log(`Ciąg "Test1": ${calculateLifePathNumber("Test1")}`);    // Wynik: 1
console.log(`Ciąg pusty: ${calculateLifePathNumber("")}`);           // Wynik: 0


console.log(`Liczba 10/04/1981: ${calculateLifePathNumber("10/04/1981")}`); 
console.log(`Liczba 09/11/1970: ${calculateLifePathNumber("09/11/1970")}`); 