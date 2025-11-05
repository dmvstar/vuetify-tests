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
    // Поля із вкладеного об'єкта debtorData (Wartości kluczy pozostają angielskie, але etykiety w nagłówku są ukraińskie)
    const debtorFields = ["Ідент. код", "Прізвище", "Ім'я", "По батькові", "Дата народження"];
    
    // Nazwy kluczy w danych JSON (używane do ekstrakcji даних z obiektu)
    const rootKeys = ["decID", "queueID", "externalId"];
    const debtorKeys = ["identCode", "lastName", "firstName", "middleName", "birthDate"];

    const keys = [...rootKeys, ...debtorKeys];
    const headers = [...rootFields, ...debtorFields];
    const errors = jsonData.errors || [];
    const numCols = keys.length;

    // 2. Розрахунок максимальної ширини для кожного стовпця
    const maxWidths = new Array(numCols).fill(0);

    // Ініціалізація довжиною заголовків
    headers.forEach((header, i) => {
        maxWidths[i] = header.length;
    });

    // Оновлення максимальної довжини на основі даних у рядках
    errors.forEach(error => {
        const debtorData = error.debtorData || {};
        
        // Вилучення всіх значень для цього рядка
        const rowValues = [
            ...rootKeys.map(key => error[key] || ''),
            ...debtorKeys.map(key => debtorData[key] || '')
        ];
        
        // Оновлення maxWidths
        rowValues.forEach((value, i) => {
            var len = String(value).length; 
            if (len > maxWidths[i]) {
                maxWidths[i] = len;
            }
            len = keys[i].length; 
            if (len > maxWidths[i]) {
                maxWidths[i] = len;
            }
        });
    });

    // Хелпер для вирівнювання вмісту
    const padContent = (content, width) => {
        // Заповнює рядок пробілами до заданої ширини (вирівнювання по лівому краю)
        return String(content).padEnd(width, ' '); 
    };
    
    // 3. Форматування дати для теми
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

    // 4. Генерація рядків Markdown таблиці з вирівнюванням
    
    // 4.1. Заголовок Markdown таблиці (з вирівнюванням)
    const paddedHeaders = headers.map((header, i) => padContent(header, maxWidths[i]));
    const allFieldsHeader = '| ' + paddedHeaders.join(' | ') + ' |';
    const paddedFieldsKeys = keys.map((keys, i) => padContent(keys, maxWidths[i]));
    const allFieldsKeys = '| ' + paddedFieldsKeys.join(' | ') + ' |';

    // 4.2. Рядок розділювача Markdown ( | ----- | ------- | ... | )
    // Використовуємо '-'.repeat(width) для заповнення всієї ширини стовпця
    const mdSeparatorParts = maxWidths.map(width => ' ' + '-'.repeat(width) + ' ');
    const mdSeparator = '|' + mdSeparatorParts.join('|') + '|'; 


    // 4.3. Рядки даних Markdown таблиці
    const dataRows = errors.map(error => {
        const debtorData = error.debtorData || {};
        
        // Збір сирих даних
        const rawValues = [
            ...rootKeys.map(key => error[key] || ''),
            ...debtorKeys.map(key => debtorData[key] || '')
        ];

        // Вирівнювання даних
        const paddedValues = rawValues.map((value, i) => padContent(value, maxWidths[i]));
        
        // Об'єднання в рядок MD
        return '| ' + paddedValues.join(' | ') + ' |';
    });


    // 5. Створення тіла повідомлення (Body)
    const bodyContent = [
        `Звіт про помилки: Знайдено ${ERROR_COUNT} необроблених записів.`,
        `Час операції: ${jsonData.time}`,
        ``,
        `Нижче наведено список записів, які вимагали втручання, з ключовими даними:`,
        ``,
        // Заголовок Markdown таблиці (з вирівнюванням)
        allFieldsHeader,
        allFieldsKeys,
        // Роздільник Markdown таблиці (з вирівнюванням)
        mdSeparator,
        // Рядки даних Markdown таблиці (з вирівнюванням)
        ...dataRows
    ].join('\n');


    // 6. Повернення готового об'єкта
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
