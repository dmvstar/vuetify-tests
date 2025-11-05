/**
 * Функція, що генерує тему та тіло електронного листа на основі даних JSON про помилки.
 * @param {object} jsonData - Об'єкт JSON, що містить дані, включаючи масив 'errors' та дату 'cur_date'.
 * @returns {{subject: string, body: string}} - Об'єкт із готовою темою та текстом повідомлення.
 * @WHERE src/nodered/webs/sales/models/2025-11-04-checkSetLimits-3.js
 */

var MODE_WORK_LOCAL = true;

if (typeof msg != "undefined") {
    MODE_WORK_LOCAL = false;
    //alert(`1 ${MODE_WORK_LOCAL}`);
}

function alert(message){    
    if(MODE_WORK_LOCAL){
        console.log(message);
    } else {
        node.error(message);
    }    
}

alert(`2 ${MODE_WORK_LOCAL}`);

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
    let minFormattedDate = '';
    let intoFormattedDate = '';
    const RAW_MIN_DATE = jsonData.min_date; // Отримання сирої min_date

    try {
        // Функція для форматування дати
        const formatDateTime = (rawDate) => {
            if (!rawDate) return 'Недоступно';
            const dateObj = new Date(rawDate);
            // Форматування у читабельний вигляд (наприклад, 04.11.2025 20:24 UTC)
            return dateObj.toLocaleDateString('uk-UA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }) + ' ' + dateObj.toLocaleTimeString('uk-UA', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'UTC',
                timeZoneName: 'short'
            }).replace('GMT', 'UTC'); // Уніфікація часового поясу
        };

        // Форматування поточної дати (cur_date)
        formattedDate = formatDateTime(RAW_DATE);
        // Форматування мінімальної дати (min_date)
        minFormattedDate = formatDateTime(RAW_MIN_DATE);
    } catch (e) {
        // У разі помилки розбору дати використовуйте сирі значення
        formattedDate = RAW_DATE || 'Недоступно';
        minFormattedDate = RAW_MIN_DATE || 'Недоступно';
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
        `Період звіту: з ${minFormattedDate} по ${formattedDate}`, // Додано період звіту
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

var payload;

alert(`3 ${MODE_WORK_LOCAL}`)

if (MODE_WORK_LOCAL) {
    payload = require('./2025-11-04-checkSetLimits-1.json');
} else {
    payload = msg.payload;
}

var mailContent = generateErrorMailContent(payload);
if(payload.count_no == 0){
    mailContent.hasMail = false;    
} else {
    mailContent.hasMail = true;
}
    

alert(mailContent);

if (MODE_WORK_LOCAL) {
    console.log("------------------------------------------");
    console.log("ТЕМА (SUBJECT):");
    console.log(mailContent.subject);
    console.log("------------------------------------------");
    console.log("ТІЛО (BODY):");
    console.log(mailContent.body);
    console.log("------------------------------------------");
} else {
    msg.payload = mailContent;
    return msg;
}