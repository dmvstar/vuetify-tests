/**
 * Функція, що генерує тему та тіло електронного листа на основі даних JSON про помилки.
 * * @param {object} jsonData - Об'єкт JSON, що містить дані, включаючи масив 'errors' та дату 'cur_date'.
 * @returns {{subject: string, body: string}} - Об'єкт із готовою темою та текстом повідомлення.
 */
function generateErrorMailContent(jsonData) {
    // 1. Визначення констант полів та заголовків
    const ERROR_COUNT = jsonData.count_no;
    const RAW_DATE = jsonData.cur_date;
    
    // Поля з головного об'єкта помилки (Використовуємо ukraińskie nagłówki dla lepszej czytelności w treści maila)
    const rootFields = ["Ідентифікатор рішення", "Ідентифікатор черги", "Зовнішній ID"];
    // Поля із вкладеного об'єкта debtorData (Wartości kluczy pozostają angielskie, ale etykiety w nagłówku są ukraińskie)
    const debtorFields = ["Ідент. код", "Прізвище", "Ім'я", "По батькові", "Дата народження"];
    
    // Nazwy kluczy w danych JSON (używane do ekstrakcji danych z obiektu)
    const rootKeys = ["decID", "queueID", "externalId"];
    const debtorKeys = ["identCode", "lastName", "firstName", "middleName", "birthDate"];

    // Об'єднати всі поля в один заголовок для таблиці
    const allFieldsHeader = [...rootFields, ...debtorFields].join(' | ');
    const allFieldsHeaderIds = [...rootKeys, ...debtorKeys].join(' | ');

    // 2. Форматування дати для теми
    let formattedDate = '';
    try {
        // Дата у форматі ISO: "2025-11-04T20:24:03.866Z"
        const dateObj = new Date(RAW_DATE);
        
        // Форматування у читабельний вигляд (наприклад, 04.11.2025 20:24 UTC)
        formattedDate = dateObj.toLocaleDateString('uk-UA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }) + ' ' + dateObj.toLocaleTimeString('uk-UA', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
            timeZoneName: 'short'
        }).replace('GMT', 'UTC'); // Уніфікація часового поясу
    } catch (e) {
        // У разі помилки розбору дати використовуйте сире значення
        formattedDate = RAW_DATE;
        console.error("Помилка розбору дати:", e);
    }
    
    const subject = `Звіт про помилки: ${ERROR_COUNT} необроблених записів (станом на ${formattedDate})`;

    // 3. Генерація рядків даних
    const dataRows = (jsonData.errors || []).map(error => {
        const debtorData = error.debtorData || {};
        
        // Збір даних для головних полів, używając kluczy angielskich
        const rootValues = rootKeys.map(field => error[field] || '');
        
        // Збір даних для вкладених полів, używając kluczy angielskich
        const debtorValues = debtorKeys.map(field => debtorData[field] || '');
        
        // Об'єднання всіх значень в один рядок
        return [...rootValues, ...debtorValues].join(' | ');
    });

    // 4. Створення тіла повідомлення (Body)
    // Динамічний роздільник
    const separator = '-'.repeat(allFieldsHeader.length + (rootFields.length + debtorFields.length - 1) * 3); 

    const bodyContent = [
        `Звіт про помилки: Знайдено ${ERROR_COUNT} необроблених записів.`,
        `Час операції: ${jsonData.time}`,
        ``,
        `Нижче наведено список записів, які вимагали втручання, з ключовими даними:`,
        ``,
        // Заголовок
        allFieldsHeader,
        allFieldsHeaderIds,
        // Роздільник
        separator,
        // Рядки даних
        ...dataRows,
        separator
    ].join('\n');


    // 5. Повернення готового об'єкта
    return {
        subject: subject,
        body: bodyContent
    };
}

// --- ПРИКЛАД ВИКОРИСТАННЯ (симуляція вхідних даних) ---

const sampleJsonData = {
    "result": "ok",
    "code": 1200,
    "time": "Work time is: 3697.605 sec.",
    "has_error": true,
    "min_date": "2025-07-04T19:24:03.866Z",
    "cur_date": "2025-11-04T20:24:03.866Z",
    "count_total": 55605,
    "count_ok": 55582,
    "count_no": 23, // Кількість помилок для включення в тему
    "count_er": 0,
    "errors": [
        {
            "decID": "29597184970",
            "queueID": "29597194118",
            "externalId": "NR_29597184970",
            "debtorData": {
                "lastName": "Ветєв",
                "birthDate": "1994-06-27",
                "firstName": "Олег",
                "identCode": "3451115976",
                "middleName": "Володимирович",
            }
        },
        {
            "decID": "29640960623",
            "queueID": "29640966976",
            "externalId": "NR_29640960623",
            "debtorData": {
                "lastName": "Григоренко",
                "birthDate": "1985-07-21",
                "firstName": "Юрій",
                "identCode": "3124820692",
                "middleName": "Станіславович",
            }
        },
        // У скороченому прикладі решта записів пропущена.
    ]
    // ... решта 21 запису в оригінальному JSON ...
};


const mailContent = generateErrorMailContent(sampleJsonData);

console.log("------------------------------------------");
console.log("ТЕМА (SUBJECT):");
console.log(mailContent.subject);
console.log("------------------------------------------");
console.log("ТІЛО (BODY):");
console.log(mailContent.body);
console.log("------------------------------------------");
