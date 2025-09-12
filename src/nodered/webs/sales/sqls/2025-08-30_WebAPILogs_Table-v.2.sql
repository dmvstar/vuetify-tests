/** 
* @WHAT Table for WEB API Logging
* @VERSION v.0.0.2
* @WHERE src/nodered/webs/sales/sqls/2025-08-30_WebAPILogs_Table-v.1.sql
* @DATE 2025-09-11 08:11:01
*/

-- Utworzenie typów ENUM dla standaryzacji danych
-- e_http_method: dla metod HTTP
CREATE TYPE e_http_method AS ENUM ('GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS');
-- e_direction: dla kierunku wywołania (przychodzące, wychodzące)
CREATE TYPE e_direction AS ENUM ('REQUEST', 'RESPONSE', 'INTERNAL');
-- e_status: dla ogólnego statusu operacji (sukces, błąd, niepowodzenie)
CREATE TYPE e_status AS ENUM ('SUCCESS', 'FAILURE', 'ERROR');


-- Utworzenie tabeli logów
-- DROP TABLE sysApiLog;
CREATE TABLE sysApiLog (
    id bigserial PRIMARY KEY,
    created timestamp DEFAULT NOW() NOT NULL,
    updated timestamp DEFAULT NOW() NOT NULL,

    -- Informacje o wywołaniu
    request_id varchar(256) NOT NULL,
    source_host varchar(128) NOT NULL,
    process_name varchar(64) NOT NULL,
    direction e_direction NOT NULL,
    
    -- Informacje o API
    http_method e_http_method NOT NULL,    
    -- Status i rezultat
    --status e_status NOT NULL,
    http_status_code varchar(64) DEFAULT '' NOT NULL,
    process_status e_status NULL,

    api_host varchar(256) NOT NULL,
	api_path varchar(256) NOT NULL,
	api_result varchar(32) NOT NULL, -- "ok", "no", "error" ,"Success" inne
    api_code INT default 0 NOT NULL, -- 1200 1500 .... if exists

    -- Nagłówki i treść zapytania
    headers JSONB NULL,
	content_text TEXT NULL,
	content_body JSONB NULL,

    -- Informacje o błędach
    exception_message text NULL,
    duration_ms integer DEFAULT 0 NOT NULL
);

-- Dodanie indeksów dla lepszej wydajności wyszukiwania
CREATE INDEX idx_sys_api_log_request_id ON sysApiLog(request_id);
CREATE INDEX idx_sys_api_log_created_at ON sysApiLog(created DESC);
--CREATE INDEX idx_sys_api_log_uri ON sysApiLog(uri);
--CREATE INDEX idx_sys_api_log_status ON sysApiLog(status);
--COMMENT ON TABLE public.sysapilog IS 'sysapilog';
--DELETE FROM public.sysapilog;
--SELECT * FROM public.sysapilog;

-- Trigger for sysapilog table
-- Function to update the dateModified column
CREATE OR REPLACE FUNCTION set_date_modified()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_sysapilog_dateModified
BEFORE UPDATE ON sysapilog
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