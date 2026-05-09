function cleanAndSplitLocation(str) {
    if (!str) return [];

    // 1. Remove dots and commas immediately
    let cleanStr = str.replace(/[.,]/g, ' ');

    // 2. Define noise words (case-insensitive)
    // Included: single letters (с, м), common abbreviations, and full words
    const noiseWords = [
        'с', 'м', 'смт', 'с-ще', 'село', 'місто', 
        'обл', 'області', 'область', 
        'район', 'району', 'районі', 'отг'
    ];

    // 3. Split into words first to handle them individually
    let words = cleanStr.split(/\s+/);

    // 4. Filter out the noise
    let result = words.filter(word => {
        const normalized = word.toLowerCase();
        // Return true only if the word is NOT in our noise list and NOT empty
        return normalized.length > 0 && !noiseWords.includes(normalized);
    });

    return result;
}

// --- Testing with your examples ---
const examples = [
    "м Комарно,ЛЬВІВСЬКА ОБЛ.",
    "С. ПРІСКИ ПУСТОМИТІВСЬКОГО РАЙОНУ ЛЬВІВСЬКА ОБЛ.",
    "с Олександрівка  Петрівського району  Кіровоградської  області",
    "село Городок Рівненського району Рівненської області",
    "село Василівка Кобеляцького району Полтавської області",
    "с. Скориківка Черкаська область",
    "М.ВІННИЦЯ","ЛЬВІВСЬКА ОБЛ."

];

examples.forEach(ex => {
    console.log(`Original: ${ex}`);
    console.log(`Result:`, cleanAndSplitLocation(ex));
    console.log('---');
});