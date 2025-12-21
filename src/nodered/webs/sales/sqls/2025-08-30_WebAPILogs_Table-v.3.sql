/** 
* @WHAT Table for WEB API Logging
* @VERSION v.0.0.3
* @WHERE src/nodered/webs/sales/sqls/2025-08-30_WebAPILogs_Table-v.3.sql
* @DATE 2025-10-31 17:24:35
*/

-- Utworzenie typów ENUM dla standaryzacji danych
-- e_http_method: dla metod HTTP
/*
DROP TYPE e_http_method;
DROP TYPE e_direction;
DROP TYPE e_status;
DROP TYPE e_level;
*/
CREATE TYPE e_http_method AS ENUM ('CALL', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS');
-- e_direction: dla kierunku wywołania (przychodzące, wychodzące)
CREATE TYPE e_direction AS ENUM ('REQUEST', 'RESPONSE', 'INTERNAL');
-- e_status: dla ogólnego statusu operacji (sukces, błąd, niepowodzenie)
CREATE TYPE e_status AS ENUM ('SUCCESS', 'FAILURE');
CREATE TYPE e_level AS ENUM ('INFO', 'ERROR', 'WARNING');


-- Utworzenie tabeli logów
-- DROP TABLE syscallapilog;
CREATE TABLE syscallapilog (
    id bigserial PRIMARY KEY,
    created timestamp DEFAULT NOW() NOT NULL,
    updated timestamp DEFAULT NOW() NOT NULL,

    -- Informacje o wywołaniu
    request_id varchar(256) NOT NULL, -- UUID 
    --source_host varchar(128) NULL,-- from

    --process    
    process_status e_status NULL,   
    log_level e_level NULL,   --< nrlog.level

    process_name varchar(64) NOT NULL,
    process_step varchar(32) NOT NULL,
    process_info varchar(128) NOT NULL, -- additional id for group calls 

    direction e_direction NOT NULL,
    
    -- API Method
    http_method e_http_method NOT NULL DEFAULT 'CALL',    
    -- Status 
    http_status_code varchar(64) DEFAULT '' NOT NULL,
    
    api_source varchar(256) NOT NULL,   --< nrlog.source
    api_url varchar(512) NOT NULL,      --< nrlog.url
    api_host varchar(256) NOT NULL,     --< nrlog.url
	api_path varchar(512) NOT NULL,     --< nrlog.url
	api_result varchar(32) NOT NULL, -- "ok", "no", "error" ,"Success" inne
    api_code INT default 0 NOT NULL, -- 1200 1500 .... if exists

    -- Nagłówki i treść zapytania
    headers JSONB NULL,
	content_text TEXT NULL, -- request or response --< nrlog.payload
	content_body JSONB NULL,-- request or response --< nrlog.message

    -- Informacje o błędach
    exception_message text NULL,        --< nrlog.exception
    duration_ms integer DEFAULT 0 NOT NULL
);
-- Dodanie indeksów dla lepszej wydajności wyszukiwania
CREATE INDEX idx_sys_api_log_request_id ON syscallapilog(request_id);
CREATE INDEX idx_sys_api_log_created_at ON syscallapilog(created DESC);
--CREATE INDEX idx_sys_api_log_uri ON app_sys_apilog(uri);
--CREATE INDEX idx_sys_api_log_status ON app_sys_apilog(status);
--COMMENT ON TABLE public.sysCallApiLog IS 'app_sys_apilog';
--DELETE FROM public.app_sys_apilog;
--SELECT * FROM public.app_sys_apilog;

-- Trigger for app_sys_apilog table
-- Function to update the dateModified column
CREATE OR REPLACE FUNCTION set_date_modified()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_syscallapilog_dateModified
BEFORE UPDATE ON syscallapilog
FOR EACH ROW
EXECUTE FUNCTION set_date_modified();

/*
-- DEMO_TEST_DS.dbo.WebAPiLog definition
-- Drop table
-- DROP TABLE DEMO_TEST_DS.dbo.WebAPiLog;

CREATE TABLE DEMO_TEST_DS.dbo.WebAPiLog (
	WebAPILogID ID IDENTITY(1,1) NOT NULL,
	WebAPILogDate datetime NOT NULL,
	WebAPIName nvarchar(50) COLLATE Polish_CI_AS NULL,
	WebAPIMethod nvarchar(10) COLLATE Polish_CI_AS NULL,
	WebAPIRoute nvarchar(300) COLLATE Polish_CI_AS NULL,
	TableName nvarchar(50) COLLATE Polish_CI_AS NULL,
	ObjectID int NULL,
	StatusNR int NULL,
	StatusDetails nvarchar(4000) COLLATE Polish_CI_AS NULL,
	CONSTRAINT PK_WebAPiLog PRIMARY KEY (WebAPILogID)
);
*/


/*
{  
  "request_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "source_host": "internal-service-a",
  
  "process_status": "SUCCESS",
  "log_level": "INFO",
  
  "process_name": "USER_DATA_SYNC",
  "process_step": "FETCH_DETAILS",
  "process_info": "user_id_9876",
  
  "direction": "RESPONSE",
  
  "http_method": "GET",
  "http_status_code": "200",
  
  "api_source": "ExternalUserService",
  "api_url": "https://api.external.com/users/9876/details",
  "api_host": "api.external.com",
  "api_path": "/users/9876/details",
  "api_result": "ok",
  "api_code": 1200,
  
  "headers": {
    "content-type": "application/json",
    "x-ratelimit-remaining": "599"
  },
  "content_text": null,
  "content_body": {
    "status": "OK",
    "user_details": {
      "name": "Jan Kowalski",
      "email": "jan.kowalski@example.com"
    }
  },
  
  "exception_message": null,
  "duration_ms": 150
}
*/