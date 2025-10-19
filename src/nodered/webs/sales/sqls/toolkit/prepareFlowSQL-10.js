/**
 * @WHAT make SQL for API /api/common/db/sql/create/:id
 * @WHERE src/nodered/webs/projects/prepareFlowSQL-10.js
 * @AUTHOR stardust
 * @FLOW SQLs
 * @VERSION 0.0.10
 * @DATE 2024-06-28 13:11:48
 * @NEWS 2024-06-27 19:50:11 improve a update clause
 * 2024-06-28 13:11:29 improve a select clause
 * 2025-10-19 16:24 improve a select clause JOIN
*/
//--------------------------------------------------------------
var hasError = false;
var payload, sql = "", vals = "";
var MODE_WORK_LOCAL = true;
if (typeof msg != "undefined") MODE_WORK_LOCAL = false;
if (MODE_WORK_LOCAL) {
    var payloads = [
        {
            table: "projects",
            method: "update",
            method2: "insert",
            id: 6,
            values: {
                name: "name for upd",
                version: "0.0.1-" + new Date().toISOString(),
                status: 0
            }
        },
        {
            table: "var_values",
            alias: "vv",
            method: "select",
            fields: ["id:ИД", "date:Создано", "desc_id", "source_id", "value_kind", "date_from", "date_into", "value", "status", "updated"
                , "vd:code:Код опису"
            ],
            join: [
                {
                    "table": "var_descript",
                    "alias": "vd",
                    "field": "id",
                    "reffer": "desc_id"
                }
            ],
            where: [
                {
                    "kind": "AND",
                    "alias": "vd",
                    "field": "code",
                    "value": undefined
                },
                {
                    "kind": "AND",
                    "alias": "vd",
                    "field": "task",
                    "value": "DIJA",
                },
                {
                    "kind": "AND",
                    "alias": "vd",
                    "field": "info",
                    "value": undefined,
                },
                {
                    "kind": "AND",
                    "where": [
                        {
                            "brace": "(",
                            "kind": "",
                            "alias": "vd",
                            "field": "code",
                            "value": "LAST_STAT_WORK"
                        },
                        {
                            "brace": "",
                            "kind": "OR",
                            "alias": "vd",
                            "field": "code",
                            "value": "IS_REPO_WORK"
                        },
                        {
                            "brace": ")",
                            "kind": "OR",
                            "alias": "vd",
                            "field": "code",
                            "value": "LAST_STAT_WORK"
                        }
                    ]
                }
            ]
        },
        {
            table: "var_values",
            alias: "",
            method: "update",
            id: -1,
            values: {
                value: "start",
                status: 1
            },
            where: [
                {
                    "kind": "AND",
                    "alias": "",
                    "field": "value",
                    "value": "stop"
                },
                {
                    "kind": "AND",
                    "alias": "",
                    "field": "status",
                    "value": 1
                }
            ],
            select: {
                table: "var_descript",
                alias: "vd",
                method: "select",
                fields: ["id"],
                reffer: "desc_id",
                where: [
                    {
                        "kind": "AND",
                        "alias": "vd",
                        "field": "code",
                        "value": "LAST_STAT_WORK"
                    },
                    {
                        "kind": "AND",
                        "alias": "vd",
                        "field": "task",
                        "value": "DIJA",
                    },
                    {
                        "kind": "AND",
                        "alias": "vd",
                        "field": "source",
                        "value": "WORKER",
                    },
                ]
            }
        },
    ];
    payload = payloads[2];
} else {
    payload = msg.payload;
}
//--------------------------------------------------------------
if (!payload.table) {
    hasError = true;
    say_error("Not defined Table for " + payload.method);
}
if (!hasError) {
    if (payload.method === 'update' && !payload.id) {
        hasError = true;
        say_error("Not defined ID for method " + payload.method);
    }
    if (payload.method === 'delete' && !payload.id) {
        hasError = true;
        say_error("Not defined ID for method " + payload.method);
    }
    if ((payload.method === 'insert' || payload.method === 'update') && !payload.values) {
        hasError = true;
        say_error("Not defined Values");
    }
}
//--------------------------------------------------------------
if (payload.method === 'update') {
    sql = prepare_update(payload);
} else 
if (payload.method === 'insert') {
    sql = prepare_insert(payload);
} else
if (payload.method === 'delete') {
    sql = prepare_delete(payload);
} else
if (payload.method === 'select') {
    sql = prepare_select(payload);
} else 
{
    hasError = true;
    say_error("Bad request, not defined SQL method");    
}
//--------------------------------------------------------------
if (MODE_WORK_LOCAL) {
    console.log(sql);
} else {
    msg.payload = sql;
    if (!hasError) {
        return msg;
    }
}
//--------------------------------------------------------------
function prepare_delete(payload) {
    var sql = `DELETE FROM ${payload.table}\n`;
    if (Array.isArray(payload.id)) {
        var start = 0;
        sql += `WHERE\n  ID   IN (`;
        for (var item of payload.id) {
            sql += item;
            sql += (start < payload.id.length - 1) ? ", " : "";
            start++;
        }
        sql += `)\n`;
    } else {
        sql += `WHERE\n    id = ${payload.id}\n`;
    }
    sql += `RETURNING *;`;
    return sql;
}
function prepare_update(payload) {
    var alias = payload.alias ? `${payload.alias}.` : '';
    var sql = `UPDATE\n    ${alias}${payload.table} \nSET\n`;
    var start = 1;
    var keys = Object.keys(payload.values);
    for (var item in payload.values) {
        //console.log(item, payload.values[item]);
        start > 1 ? sql += "    , " : sql += "    ";
        sql += item + " = " + "'" + payload.values[item] + "'\n";
        start++;
    }
    sql += `    WHERE 1=1`;
    if (payload.where) {
        var ends = 0;
        var add = '\n';
        sql += add;
        for (var witem of payload.where) {
            //if (ends === payload.where.length - 1) { add = ''; }
            if (witem.value) {
                var alias = witem.alias ? `${witem.alias}.` : '';
                sql += `    ${witem.kind} ${alias}${witem.field} = '${witem.value}'${add}`;
            }
            ends++;
        }
    } else {
        //node.error(payload.id);
        //sql += `\n    AND id = ${payload.id}\n`;
        sql += `\n    AND id IN (${payload.id})\n`;
    }
    if (payload.select) {
        var select = prepare_select(payload.select, true);
        sql += `    AND ${payload.select.reffer} = (${select})\n`;
    }
    sql += `RETURNING *;`;
    return sql;
}
function prepare_insert(payload) {
    var add = '';
    var sql = `INSERT INTO\n${payload.table} (\n`;
    var start = true;
    for (var item in payload.values) {
        start ? sql += `    ${item}\n` : sql += `    , ${item}\n`;
        start ? add += `    '${payload.values[item]}'\n` : add += `    , '${payload.values[item]}'\n`;
        start = false;
    }
    sql += `)\n`;
    sql += `VALUES(\n`;
    sql += add;
    sql += `)\n`;
    sql += `RETURNING *;`;

    return sql;
}
function prepare_select(payload, nonl) {
    var add = '';
    var nl = nonl ? ' ' : '\n';
    var pref = nonl ? '' : '\t';
    var start = true;
    var prefix  = " " + (payload.prefix || "");
    var postfix = " " + (payload.postfix || "");
    var sql = `SELECT${prefix}${nl}`;
    if (payload.fields.length === 0) {
        sql += `${pref}*${nl}`
    } else {
        for (var item of payload.fields) {
            add = start ? '' : ', ';
            var parts = item.split(":");

            if (parts.length > 1) {
                switch (parts.length) {
                    case 2:
                        sql += `${pref}${add}${payload.alias}.${parts[0]} AS "${parts[1]}"${nl}`;
                        break;
                    case 3:
                        sql += `${pref}${add}${parts[0]}.${parts[1]} AS "${parts[2]}"${nl}`;
                        break;
                    default:
                        sql += `${pref}${add}${payload.alias}.${item}${nl}`;
                }
            } else {
                sql += `${pref}${add}${payload.alias}.${item}${nl}`;
            }
            start = false;
        }
    }
    sql += `FROM ${payload.table} ${payload.alias}${nl}`;
    if (payload.join) {
        for (var item of payload.join) {
            var ref_alias = item.ref_alias || payload.alias || "";
            sql += `JOIN ${item.table} ${item.alias} ON ${item.alias}.${item.field} = ${ref_alias}.${item.reffer}${nl}`;
        }
    }
    sql += `${pref}WHERE 1=1`;
    if (payload.where) {
        var ends = 0;
        add = nl;
        sql += add;
        for (var item of payload.where) {
            var quote = "'";
            if(item.quote != undefined) {
                quote = item.quote;
            }
        //node.error(`quote = [${quote}][${item.quote}]`);
            var opera = '=';
            if (ends === payload.where.length - 1) { add = ''; }
            if (item.where) {
                var ends = 0;
                sql += `    ${item.kind}`;
                for (var subs of item.where) {
                    var sbrace = '', ebrace = '';
                    if (ends === 0) { sbrace = subs.brace; }
                    if (ends === item.where.length - 1) { ebrace = ' ' + subs.brace; }
                    sql += ` ${sbrace}${subs.kind} ${subs.alias}.${subs.field} ${opera} ${quote}${subs.value}${quote}${ebrace}${add}`;
                    ends++;
                }
            } else {
                if (item.opera) {
                    opera = item.opera;
                }
        //node.error(`item = [${item.field}][${item.value}]`);
                if (item.value != undefined) {
                    sql += `${pref}${item.kind} ${item.alias}.${item.field} ${opera} ${quote}${item.value}${quote}${add}`;
                }
            }
            ends++;
        }
    }
    if (payload.order) {
        sql += `${nl}ORDER BY${nl}`;
        sql += `${pref}${payload.order.alias}.${payload.order.field}`;
        sql += `${nl}${payload.order.direction}`;
        sql += `${nl}`;
    }
    if (payload.limit) {
        sql += `LIMIT ${payload.limit}`; 
    }
    if (!nonl) {
        sql += `;`;
    }

    return sql;
}
function say_error(text) {
    if (MODE_WORK_LOCAL) {
        console.log(text);
    } else {
        node.error(text, msg);
    }
}