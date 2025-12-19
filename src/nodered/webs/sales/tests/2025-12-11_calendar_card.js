var testdata = {"data":{"debtParts":[{"name":"Рахунок для погашення заборгованості:","eventCode":"","amount":"0.00","currencyTag":""},{"name":"транзитний рахунок UA403204780000037393767000245","eventCode":"","amount":"9183.84","currencyTag":""},{"name":"асоційований рахунок UA833204780000026208131171602","eventCode":"","amount":"1369462.00","currencyTag":""},{"name":"Cума заборгованості за основним боргом","eventCode":"","amount":"83875.06","currencyTag":""},{"name":"Cума заборгованості за нарахованими відсотками","eventCode":"","amount":"8069.86","currencyTag":""},{"name":"Сума донарахування по договору","eventCode":"","amount":"0.00","currencyTag":""},{"name":"Сума донарахування відсотків на строкову заборгованість","eventCode":"","amount":"0.00","currencyTag":""},{"name":"Сума донарахування відсотків на прострочену заборгованість","eventCode":"","amount":"0.00","currencyTag":""},{"name":"Сума донарахування штрафів на простроченą заборгованість по тілу","eventCode":"","amount":"0.00","currencyTag":""},{"name":"Сума донарахування штрафів на прострочену заборгованість по відсоткам","eventCode":"","amount":"0.00","currencyTag":""},{"name":"Сума донарахування штрафів na прострочену заборгованість по комісії","eventCode":"","amount":"0.00","currencyTag":""},{"name":"Загальна сума заборгованості до погашення","eventCode":"","amount":"28346.77","currencyTag":""},{"name":"Сума найближчого планового платежу (20/12/2025)","eventCode":"","amount":"19162.93","currencyTag":""},{"name":"Основна заборгованість до погашення","eventCode":"","amount":"15186.73","currencyTag":""},{"name":"Проценти до погашення нараховані на строкову заборгованість","eventCode":"","amount":"3976.20","currencyTag":""},{"name":"Комісії до погашення","eventCode":"","amount":"0.00","currencyTag":""},{"name":"Сума прострочених платежів","eventCode":"","amount":"9183.84","currencyTag":""},{"name":"Прострочений основний борг","eventCode":"","amount":"6124.94","currencyTag":""},{"name":"Прострочені відсотки","eventCode":"","amount":"3058.90","currencyTag":""},{"name": "Прострочені комісії","eventCode":"","amount":"0.00","currencyTag":""},{"name":"Інші платежі","eventCode":"","amount":"0.00","currencyTag":""},{"name":"Комісії","eventCode":"","amount":"0.00","currencyTag":""},{"name":"Штрафи na прострочену заборгованість","eventCode":"","amount":"0.00","currencyTag":""}]},"status":"Success","processRef":"866971b7-4b38-422f-a7e4-1e73710d932c"}
var data = testdata.data.debtParts;

if (msg.payload?.data?.debtParts && msg.payload?.data?.debtParts.length > 0) {
    data = msg.payload.data.debtParts;
}

var totalSum = 0.0;

const calculated_field = [
    "Cума заборгованості за основним боргом", 
    "Cума заборгованості за нарахованими відсотkami", 
    "Сума донарахування по договору", 
    "Сума прострочених платежів", 
    "Інші платежі"
];

// Zmieniono 'for...in' na 'for...of'
for (const item of data) {
    // Używamy 'item' zamiast 'o' i sprawdzamy jego właściwość 'name'
    if (calculated_field.includes(item.name)) {
        // Logowanie poprawnego pola
        console.log(`Dodawane pole: ${item.name} (${item.amount})`);
        
        // Upewniamy się, że 'amount' jest traktowane jako liczba dziesiętna (kropka jako separator)
        totalSum += parseFloat(item.amount.replace(",", "."));
    }
}

// Sprawdzenie końcowej sumy
console.log(`Obliczona suma całkowita (totalSum): ${totalSum.toFixed(2)}`);

data.push(
    {
        "code": "REST_SUM_DEBT",
        "name": "Сума до повного погашення",
        "eventCode": "",
        "amount": totalSum.toFixed(2), // Formatowanie do 2 miejsc po przecinku
        "currencyTag": ""
    }
);

console.log(data);
// Zwrócenie całej zmiennej 'data', jeśli jest używana w systemie takim jak Node-RED
// return { payload: { data: { debtParts: data } } };
return msg;