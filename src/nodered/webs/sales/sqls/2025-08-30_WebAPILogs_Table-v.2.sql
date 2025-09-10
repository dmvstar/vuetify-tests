/** 
* @WHAT Table for WEB API Logging
* @VERSION v.0.0.1
* @WHERE src/nodered/webs/sales/sqls/2025-08-30_WebAPILogs_Table-v.1.sql
* @DATE 2025-08-30 21:19:36
*/

-- Utworzenie typów ENUM dla standaryzacji danych
-- e_http_method: dla metod HTTP
CREATE TYPE e_http_method AS ENUM ('GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS');
-- e_direction: dla kierunku wywołania (przychodzące, wychodzące)
CREATE TYPE e_direction AS ENUM ('REQUEST', 'RESPONSE', 'INTERNAL');
-- e_status: dla ogólnego statusu operacji (sukces, błąd, niepowodzenie)
CREATE TYPE e_status AS ENUM ('SUCCESS', 'FAILURE', 'ERROR');


-- Utworzenie tabeli logów
CREATE TABLE sys_api_log (
    id bigserial PRIMARY KEY,
    created_at timestamp DEFAULT NOW() NOT NULL,

    -- Informacje o wywołaniu
    request_id varchar(256) NOT NULL,
    source_host varchar(128) NOT NULL,
    process_name varchar(64) NOT NULL,
    direction e_direction NOT NULL,
    
    -- Informacje o API
    http_method e_http_method NOT NULL,    
    api_host varchar(256) NOT NULL,
	api_path varchar(256) NOT NULL,

    -- Status i rezultat
    status e_status NOT NULL,
    http_status_code varchar(64) DEFAULT '' NOT NULL,

    -- Nagłówki i treść zapytania
	content_text TEXT NULL,
	content_body JSONB NULL,
    headers JSONB NULL,

    -- Informacje o błędach
    exception_message text NULL,
    duration_ms integer DEFAULT 0 NOT NULL
);

-- Dodanie indeksów dla lepszej wydajności wyszukiwania
CREATE INDEX idx_sys_api_log_request_id ON sys_api_log(request_id);
CREATE INDEX idx_sys_api_log_created_at ON sys_api_log(created_at DESC);
CREATE INDEX idx_sys_api_log_uri ON sys_api_log(uri);
CREATE INDEX idx_sys_api_log_status ON sys_api_log(status);





















CREATE TABLE sysapilog (
	id bigserial NOT NULL,
	created timestamp DEFAULT NOW() NOT NULL,
	updated timestamp DEFAULT NOW() NOT NULL,

	requestid varchar(256) NOT NULL,
	srchost varchar(128) NOT NULL,
    process varchar(64) NOT NULL,
	method e_http_method DEFAULT('GET') NOT NULL,
	direction e_direction DEFAULT('NEVER') NOT NULL,

	statuscode varchar(32) DEFAULT 0 NOT NULL,
	
	apihost varchar(256) NOT NULL,
	apipath varchar(256) NOT NULL,

	result varchar(32) NOT NULL,

	contenttext TEXT NULL,
	contentbody JSONB NULL,

	headers JSONB NULL,
	exception TEXT NULL,
	duration INTEGER DEFAULT 0
);

COMMENT ON TABLE public.sysapilog IS 'sysapilog';


INSERT INTO sysapilog (
    requestid,
    clientip,
    method,
    direction,
    statuscode,
    process,
    host,
    path,
    result,
    contenttext,
    contentbody,
    headers,
    exception,
    duration
) VALUES (
    '87943d6c-6a7f-4f1a-b03a-6f7d2f9d8e77',
    '192.168.1.100'::INET,
    'POST'::e_method,
    'REQUEST'::e_direct,
    '0',
    'GenSQL',
    'api.example.com',
    '/v2/users',
    '',
    '{"name": "Jane Doe", "email": "jane.doe@example.com"}',
    '{"name": "Jane Doe", "email": "jane.doe@example.com"}',
    '{"content-type": "application/json", "accept": "application/json", "user-agent": "PostmanRuntime/7.29.0"}',
    NULL,
    0
),
(
    '87943d6c-6a7f-4f1a-b03a-6f7d2f9d8e77',
    '192.168.1.100'::INET,
    'POST'::e_method,
    'RESPONSE'::e_direct,
    '200',
    'GenSQL',
    'api.example.com',
    '/v2/users',
    'ok',
    '{"message": "User successfully created."}',
    '{"message": "User successfully created."}',
    '{"content-type": "application/json", "accept": "application/json", "user-agent": "PostmanRuntime/7.29.0"}',
    NULL,
    450
),
(
    '87943d6c-6a7f-4f1a-b03a-6f7d2f9d8e77',
    '192.168.1.100'::INET,
    'POST'::e_method,
    'RESPONSE'::e_direct,
    '500',
    'GenSQL',
    'api.example.com',
    '/v2/users',
    'error',
    '{"message": "Failed connect to slave server"}',
    '{"message": "Failed connect to slave server"}',
    '{"content-type": "application/json", "accept": "application/json", "user-agent": "PostmanRuntime/7.29.0"}',
    'Failed connect to slave server',
    980
);


--DELETE FROM public.sysapilog;
SELECT * FROM public.sysapilog;


