/** 
* @WHAT Table for WEB API Logging
* @VERSION v.0.0.1
* @WHERE src/nodered/webs/sales/sqls/2025-08-30_WebAPILogs_Table-v.1.sql
* @DATE 2025-08-30 21:19:36
*/

CREATE TYPE e_method AS ENUM ('GET', 'POST', 'PATCH', 'DELETE', 'PUT');
CREATE TYPE e_direct AS ENUM ('REQUEST', 'RESPONSE', 'NEVER');

CREATE TABLE sysapilog (
	id bigserial NOT NULL,
	created timestamp DEFAULT NOW() NOT NULL,
	updated timestamp DEFAULT NOW() NOT NULL,

	requestid varchar(256) NOT NULL,
	--clientip INET DEFAULT('127.0.0.1') NOT NULL,
    hostname varchar(256) NOT NULL,
    process varchar(64) NOT NULL,
    
	method e_method DEFAULT('GET') NOT NULL,
	direction e_direct DEFAULT('NEVER') NOT NULL,
	statuscode varchar(32) NOT NULL,
	
	apihost varchar(256) NOT NULL,
	apipath varchar(256) NOT NULL,

	result varchar(32) NOT NULL,
	contenttext TEXT NULL,
	contentbody JSONB NULL,
	headers JSONB,

	exception TEXT NULL,
	duration INTEGER DEFAULT 0
);

COMMENT ON TABLE public.sysapilog IS 'sysapilog';


INSERT INTO sysapilog (
    requestid,
    hostname,
    method,
    direction,
    statuscode,
    process,
    apihost,
    apipath,
    result,
    contenttext,
    contentbody,
    headers,
    exception,
    duration
) VALUES (
    '87943d6c-6a7f-4f1a-b03a-6f7d2f9d8e77',
    '192.168.1.100',
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
    '192.168.1.100',
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
    '192.168.1.100',
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


