/**
* @WHAT Database for project credo_card
* @VERSION v.0.0.4
* @WHERE 2025-07-03_Database_and_Table-v.1.sql
* @DATE 2025-07-15 17:43:32
*/
/*
DROP DATABASE dev_card_credo;

CREATE DATABASE dev_card_credo
WITH
    OWNER = user_card_credo ENCODING = 'UTF8' CONNECTION LIMIT = -1;

COMMENT ON DATABASE dev_card_credo IS 'CARD-CREDO applications';

GRANT ALL PRIVILEGES ON DATABASE dev_card_credo TO user_card_credo;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO user_card_credo;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO user_card_credo;
GRANT ALL PRIVILEGES ON DATABASE dev_card_credo TO dbmanager;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dbmanager;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO dbmanager;

*/

/*
DROP TABLE appsDecisions;
DROP TABLE appsErrorsHistory;
DROP TABLE appsErrors;
DROP TABLE dictsProductMapping;

DROP INDEX ad_applicationId_idx;
DROP INDEX ad_dateCreated_idx;
DROP INDEX ad_decissionDate_idx;
DROP INDEX ae_dateCreated_idx;
DROP INDEX ae_applicationId_idx;
DROP INDEX aeh_dateCreated_idx;
DROP INDEX aeh_applicationId_idx;
DROP INDEX dpm_dateCreated_idx;
*/

CREATE TABLE
    appsDecisions (
        id bigserial NOT NULL
      , dateCreated TIMESTAMP NOT NULL DEFAULT NOW()
      , dateModified TIMESTAMP NOT NULL DEFAULT NOW()

      , applicationId INT NOT NULL
      , applicationStatus VARCHAR(128) NULL DEFAULT 0
      , stateCode VARCHAR(20) NOT NULL
      , absProdCode VARCHAR(128) NOT NULL
      , decissionDate date NOT NULL

      , status INT DEFAULT 1
      , PRIMARY KEY (id)
      , CONSTRAINT applicationIdStateProduct_idx UNIQUE (stateCode, absProdCode, decissionDate, status)
	);

CREATE INDEX ad_applicationId_idx ON appsDecisions (applicationId);
CREATE INDEX ad_dateCreated_idx ON appsDecisions (dateCreated);
CREATE INDEX ad_decissionDate_idx ON appsDecisions (decissionDate);


CREATE TABLE
    appsErrors (
        id bigserial NOT NULL
      , dateCreated TIMESTAMP NOT NULL DEFAULT NOW()
      , dateModified TIMESTAMP NOT NULL DEFAULT NOW()

      , applicationId INT NOT NULL
      , decisionResult VARCHAR(128) NULL -- Помилка: ScroogeId клієнта не знайдено
      , recordStatus VARCHAR(128) NULL -- Статус - До врегулювання
      , stateCode VARCHAR(20) NOT NULL
      , clientId INT NULL
      , programTypeId INT NULL
      , absProdCode VARCHAR(64) NOT NULL
      , docUpdated DATE --VARCHAR(64) NULL
      , comment VARCHAR(128) NULL
      , history VARCHAR(128) NULL -- TRUE at end of work

      , status INT DEFAULT 1
      , PRIMARY KEY (id)
    );
CREATE INDEX ae_dateCreated_idx ON appsErrors (dateCreated);
CREATE INDEX ae_applicationId_idx ON appsErrors (applicationId);

CREATE TABLE
    appsErrorsHistory (
        id bigserial NOT NULL
      , dateCreated TIMESTAMP NOT NULL DEFAULT NOW() -- дата запису
      , dateModified TIMESTAMP NOT NULL DEFAULT NOW()

      , counterTries INT DEFAULT 0 --  Номер спроби обробки
      , applicationId INT NOT NULL --  Номер заявки
      , decisionResult VARCHAR(128) NOT NULL -- результат
      , recordStatus VARCHAR(128) NOT NULL -- статус запису

      , appsErrorsId INT NOT NULL

      , status INT DEFAULT 1
      , PRIMARY KEY (id)
      , CONSTRAINT fk_appsErrors
          FOREIGN KEY (appsErrorsId)
          REFERENCES appsErrors (id)

    );

CREATE INDEX aeh_dateCreated_idx ON appsErrorsHistory (dateCreated);
CREATE INDEX aeh_applicationId_idx ON appsErrorsHistory (applicationId);

CREATE TABLE
    dictsProductMapping (
        id bigserial NOT NULL
      , dateCreated TIMESTAMP NOT NULL DEFAULT NOW()
      , dateModified TIMESTAMP NOT NULL DEFAULT NOW()

      , absProdCode VARCHAR(64) NOT NULL --  Код продукту
      , absPacketCode VARCHAR(64) NOT NULL -- PacketCode продукту
      , absSystemCode INT NOT NULL -- Система "mobbank" "atb"
      , absProdId INT NOT NULL   -- 4200 Ід продукту
      , activity INT DEFAULT 1  -- Активність

      , status INT DEFAULT 1
      , PRIMARY KEY (id)
);
CREATE INDEX dpm_dateCreated_idx ON dictsProductMapping (dateCreated);


/*
[
{
      id : 1
      , absProdCode : "10.6.08.028.00."
      , absPacketCode  : "ECOkreditka_virtualna"
      , absSystemCode  : "mobbank"
      , absProdId : 1946
      , activity : 1
},
{
      id : 2
      , absProdCode : "10.6.08.027.00."
      , absPacketCode  : "ECO_kredytka_43_ATB_"
      , absSystemCode  : "atb"
      , absProdId : 1906
      , activity : 1
}
]
*/

-- Function to update the dateModified column
CREATE OR REPLACE FUNCTION set_date_modified()
RETURNS TRIGGER AS $$
BEGIN
    NEW.dateModified = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for appsDecisions table
CREATE TRIGGER trg_appsDecisions_dateModified
BEFORE UPDATE ON appsDecisions
FOR EACH ROW
EXECUTE FUNCTION set_date_modified();

-- Trigger for appsErrors table
CREATE TRIGGER trg_appsErrors_dateModified
BEFORE UPDATE ON appsErrors
FOR EACH ROW
EXECUTE FUNCTION set_date_modified();

-- Trigger for appsErrorsHistory table
CREATE TRIGGER trg_appsErrorsHistory_dateModified
BEFORE UPDATE ON appsErrorsHistory
FOR EACH ROW
EXECUTE FUNCTION set_date_modified();

-- Trigger for dictsProductMapping table
CREATE TRIGGER trg_dictsProductMapping_dateModified
BEFORE UPDATE ON dictsProductMapping
FOR EACH ROW
EXECUTE FUNCTION set_date_modified();


-- Create a function that will be executed by the trigger
CREATE OR REPLACE FUNCTION apps_errors_insert_history()
RETURNS TRIGGER AS $$
DECLARE
    -- Declare a variable to hold the calculated next counterTries value
    next_counter_tries INT;
BEGIN
    SELECT COALESCE(MAX(ah.counterTries), 0) + 1
    INTO next_counter_tries
    FROM appsErrorsHistory ah
    WHERE ah.appserrorsid = NEW.id; -- Use NEW.id to link to the appsErrors record

    -- Insert the relevant fields from the NEW (inserted) row of appsErrors
    -- into the appsErrorsHistory table, including the appsErrors.id and counterTries.
    INSERT INTO appsErrorsHistory (
        appsErrorsId, -- Adding appsErrors.id to the history record
        applicationId,
        decisionResult,
        recordStatus	    
        , counterTries -- Adding the current counterTries value
    )
    VALUES (
        NEW.id, -- Value for appsErrors.id
        NEW.applicationId,
        OLD.decisionResult,
        OLD.recordStatus
		, next_counter_tries
		--, COALESCE(NEW.counterTries, 0) -- Value for counterTries, replacing NULL with 0
        --(SELECT MAX(counterTries)+1 FROM appsErrorsHistory ah WHERE ah.appsErrorsId = NEW.id)  -- Value for counterTries
    );
    RETURN NEW; -- For an AFTER trigger, RETURN NEW or OLD doesn't affect the row
END;
$$ LANGUAGE plpgsql;

-- Create the trigger that calls the function AFTER an INSERT on appsErrors
-- DROP TRIGGER trg_apps_errors_insert_log ON public.appserrors;
CREATE TRIGGER trg_apps_errors_insert_log
AFTER UPDATE ON appsErrors
FOR EACH ROW
EXECUTE FUNCTION apps_errors_insert_history();



/* EXAMPLES */


INSERT INTO appserrors
(applicationid, decisionresult, recordstatus, statecode, clientid, programtypeid, absprodcode, docupdated, comment, history)
VALUES
	( 2233, 'Ok', 'Progress', '1234567890', 45677890, 10, '10.2.4.56.', NULL, 'Test', 'NO'),
	( 2234, 'Ok', 'Progress', '1234567890', 45677890, 10, '10.2.4.57.', NULL, 'Test', 'NO'),
	( 2235, 'Ok', 'Progress', '1234567890', 45677890, 10, '10.2.4.57.', NULL, 'Test', 'NO');

SELECT * FROM appserrors
UPDATE appserrors SET decisionresult = 'None' WHERE id = 7;

--DELETE FROM appserrorshistory
SELECT * FROM appserrorshistory a 
UPDATE appserrors SET decisionresult = 'None1' WHERE id = 3;

SELECT MAX(counterTries) FROM appsErrorsHistory ah WHERE ah.appserrorsid=0 


INSERT INTO public.appsdecisions(
    applicationid, applicationstatus, statecode, absprodcode, decissiondate)
VALUES
    (123, 'MD Approved', '1234567890', '10.2.3.55.76.', '2025-07-07'),
    (124, 'MD Pending', '0987654321', '10.2.3.55.77.', '2025-07-08'),
    (125, 'MD Rejected', '1122334455', '10.2.3.55.78.', '2025-07-09'),
    (127, 'MD Approved', '1234567897', '10.2.3.55.76.', '2025-07-07'),
    (128, 'MD Pending',  '0987654328', '10.2.3.55.77.', '2025-07-08'),
    (129, 'MD Rejected', '1122334459', '10.2.3.55.78.', '2025-07-09');

SELECT * FROM public.appsdecisions

UPDATE public.appsdecisions SET applicationstatus = 'MD Approved' WHERE id = 2;


INSERT INTO public.appserrors(
	applicationid, decisionresult, recordstatus, statecode, clientid, programtypeid, absprodcode, docupdated, comment, history)
	VALUES
		(123, 'Result', 'Status MB', '1234567890', 2445666, 334, '10.2.25.99.', '2025-07-20', 'Comment', 'Last history'),
		(124, 'Result', 'Status MB', '1234567890', 2445666, 334, '10.2.25.99.', '2025-07-20', 'Comment', 'Last history'),
		(125, 'Result', 'Status MB', '1234567890', 2445666, 334, '10.2.25.99.', '2025-07-20', 'Comment', 'Last history'),
		(126, 'Result', 'Status MB', '1234567890', 2445666, 334, '10.2.25.99.', '2025-07-20', 'Comment', 'Last history');

select * from public.appserrors
