function generateHtmlTable(data) {
    if (!data || data.length === 0) return "<p>No data available</p>";

    const headers = Object.keys(data[0]);

    // Define 4 distinct professional colors (Subtle palettes)
    const colorClasses = ['color-1', 'color-2', 'color-3', 'color-4'];

    let html = `
    <style>
        .report-table { 
            border-collapse: collapse; 
            width: 50%;           /* SET TO 50% */
            min-width: 400px;     /* Prevents it from being too small on mobile */
            margin: 20px auto;    /* Centers the table horizontally */
            font-family: 'Segoe UI', sans-serif;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .report-table th { background-color: #063c2e; color: white; padding: 14px; text-align: left; text-transform: uppercase; font-size: 13px; }
        .report-table td { border: 1px solid #e0e0e0; padding: 12px; font-size: 14px; }
        
        /* The 4 Category Colors */
        .color-1 { background-color: #ffd3e9; } /* White */
        .color-2 { background-color: #f1f8e9; } /* Light Green */
        .color-3 { background-color: #e3f2fd; } /* Light Blue */
        .color-4 { background-color: #fff3e0; } /* Light Orange */
        
        .report-table tr:hover { background-color: #eeeeee !important; }
        .cat-label { font-weight: bold; color: #1a237e; }
        .val-num { text-align: right; font-family: monospace; font-weight: bold;font-size: 16px; }
    </style>
    
    <table class="report-table">
        <thead>
            <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
        </thead>
        <tbody>`;

    let currentCategory = "";
    let colorIndex = -1; // Start at -1 so the first change sets it to 0

    data.forEach(row => {
        // When Category changes, move to the next color in the array
        if (row["Категорія"] !== currentCategory) {
            currentCategory = row["Категорія"];
            colorIndex = (colorIndex + 1) % colorClasses.length;
        }

        const rowClass = colorClasses[colorIndex];

        html += `<tr class="${rowClass}">`;
        headers.forEach(header => {
            const value = row[header];

            // Apply specific styling based on column content
            let cellClass = "";
            if (header === "Категорія") cellClass = 'class="cat-label"';
            if (header === "Кількість") cellClass = 'class="val-num"';

            html += `<td ${cellClass}>${value}</td>`;
        });
        html += `</tr>`;
    });

    html += `</tbody></table>`;
    return html;
}

msg.payload = generateHtmlTable(msg.payload);

return msg;