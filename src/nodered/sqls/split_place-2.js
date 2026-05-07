/** 
 * Helper to clean, trim suffixes, and format casing
 */
const cleanAndSplitLocation = (str) => {
    if (!str || typeof str !== 'string') return [];
    
    const noiseWords = new Set([
        'с', 'м', 'смт', 'с-ще', 'село', 'місто', 
        'обл', 'області', 'область', 
        'район', 'району', 'районі', 'отг'
    ]);

    return str
        .replace(/[.,]/g, ' ')            // Remove punctuation
        .split(/\s+/)                     // Split by whitespace
        .filter(word => {                 // Preliminary filter
            const low = word.toLowerCase();
            return low.length > 0 && !noiseWords.has(low);
        })
        .map(word => {
            let upper = word.toUpperCase();
            
            // 1. Strict suffix trimming (Order matters: longest first)
            // Handles: ПУСТОМИТІВСЬКОГО -> ПУСТОМИТІВСЬК, etc.
            upper = upper.replace(/(ІВСЬКОГО|ІВСЬКОЇ|ЕЦЬКОГО|АЦЬКОГО|ОВСЬКОГО|ІВСЬКА)$/, (match) => {
                if (match === "ІВСЬКА") return "ІВСЬКА"; // Keep as requested for Lvivska/Cherkaska
                return match.substring(0, match.length - 3); // Remove -ОГО, -ОЇ etc (3 chars)
            });

            // Specific manual overrides based on your requirements
            if (upper.endsWith("ОГО")) upper = upper.slice(0, -3);
            if (upper.endsWith("ОЇ")) upper = upper.slice(0, -2);

            // 2. Convert to Title Case (First letter Upper, rest lower)
            return upper.charAt(0).toUpperCase() + upper.slice(1).toLowerCase();
        });
};

/*
// 1. Process the payload
try {
    const input = msg.payload?.data?.place || "";
    msg.payload = cleanAndSplitLocation(input);
} catch (err) {
    node.status({fill: "red", shape: "ring", text: "3 Processing Error"});
    return [null, null, msg];
}

// 2. Logic Check & Node Status
if (Array.isArray(msg.payload)) {
    const count = msg.payload.length;
    
    if (count > 0) {
        node.status({fill: "green", shape: "dot", text: `1 OK: found ${count}`});
        return [msg, null, null];
    } else {
        node.status({fill: "yellow", shape: "dot", text: "2 No results"});
        return [null, msg, null];
    }
} else {
    node.status({fill: "red", shape: "ring", text: "3 Invalid Type"});
    return [null, null, msg];
}
*/

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
