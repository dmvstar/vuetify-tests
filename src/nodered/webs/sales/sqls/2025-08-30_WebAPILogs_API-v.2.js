
var payload = {
    table : "sysCallApiLog",
    method : "insert",
    values : 
    {
        "request_id": "8b1f56a0-4c3e-4d89-9a2c-f67f8a123b45",
        "source_host": "source-app-name",
        "process_status": "SUCCESS",  /* e_status: np. 'PENDING', 'SUCCESS', 'FAILURE' */
        "process_name": "ModuleName",
        "process_step": "STEP_1",
        "process_info": "AdditionalId-X123",
        "direction": "OUTGOING",       /* e_direction: np. 'INCOMING', 'OUTGOING' */
        "http_method": "GET",          /* e_http_method: np. 'GET', 'POST', 'PUT' */
        "http_status_code": "",
        "api_host": "",
        "api_path": "",
        "api_result": "ok",          /* np. 'ok', 'no', 'error', 'Success' */
        "api_code": 0,               /* Kod błędu lub sukcesu API (INT) */
        "headers": {},               /* Nagłówki zapytania/odpowiedzi (JSONB) */
        "content_text": "",        /* Treść w formacie tekstowym (TEXT) */
        "content_body": msg.payload,        /* Treść w formacie JSON (JSONB) */
        "exception_message": null,   /* Szczegóły błędu (TEXT) */
        "duration_ms": 0
    }
}
return msg;
