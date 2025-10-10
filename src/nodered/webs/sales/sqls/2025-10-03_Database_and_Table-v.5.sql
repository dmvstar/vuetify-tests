/**
* @WHAT Database for project credo_card
* @VERSION v.0.0.5
* @WHERE 2025-10-03_Database_and_Table-v.1.sql
* @DATE 2025-10-06 17:43:32
*/
/*
DROP DATABASE dev_card_credo;

CREATE DATABASE dev_card_credo
WITH
    OWNER = user_card_credo ENCODING = 'UTF8' CONNECTION LIMIT = -1;

COMMENT ON DATABASE dev_card_credo IS 'CARD-CREDO applications';

GRANT ALL PRIVILEGES ON DATABASE dev_card_credo TO user_card_credo;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO user_card_credo;
GRANT ALL PRIVILEGES ON ALL SEQUNEW.updatedENCES IN SCHEMA public TO user_card_credo;
GRANT ALL PRIVILEGES ON DATABASE dev_card_credo TO dbmanager;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dbmanager;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO dbmanager;

*/

/*
DROP TABLE appsDecisions;
DROP TABLE appsErrorsHistory;
DROP TABLE appsErrors CASCADE;

DROP TABLE dictsProductMapping;

DROP INDEX ad_applicationId_idx;
DROP INDEX ad_dateCreated_idx;
DROP INDEX ad_decisionDate_idx;
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
      , decisionDate date NOT NULL
        
      , status INT DEFAULT 1
      , PRIMARY KEY (id)
      , CONSTRAINT ad_applicationIdStateProduct_idx UNIQUE (applicationId, stateCode, absProdCode, decisionDate, status)
	);
CREATE INDEX ad_applicationId_idx ON appsDecisions (applicationId);
CREATE INDEX ad_dateCreated_idx ON appsDecisions (dateCreated);
CREATE INDEX ad_decisionDate_idx ON appsDecisions (decisionDate);

CREATE TABLE
    appsErrors (
    id bigserial NOT NULL
      , dateCreated TIMESTAMP NOT NULL DEFAULT NOW()
      , dateModified TIMESTAMP NOT NULL DEFAULT NOW()
-- Init
      , applicationId INT NOT NULL
      , stateCode VARCHAR(20) NOT NULL
      , programTypeId INT NULL
      , absProdCode VARCHAR(64) NOT NULL
      , docUpdated DATE --VARCHAR(64) NULL
-- Update
      , clientId INT NULL
      , recordStatus VARCHAR(128) NULL -- Статус - До врегулювання        
      , decisionResult VARCHAR(128) NULL -- Помилка: ScroogeId клієнта не знайдено
      , comment VARCHAR(128) NULL
      , recordInfo VARCHAR(128) NULL -- TRUE at end of work
-- Main
      , status INT DEFAULT 1
      , PRIMARY KEY (id)
      , CONSTRAINT ae_applicationIdStateProduct_idx UNIQUE (applicationId, stateCode, absProdCode, status)
    );
CREATE INDEX ae_dateCreated_idx ON appsErrors (dateCreated);
CREATE INDEX ae_applicationId_idx ON appsErrors (applicationId);

-- drop table appsErrorsHistory
CREATE TABLE
    appsErrorsHistory (
        id bigserial NOT NULL
      , dateCreated TIMESTAMP NOT NULL DEFAULT NOW() -- дата запису
      , dateModified TIMESTAMP NOT NULL DEFAULT NOW()

      , counterTries INT DEFAULT 0 --  Номер спроби обробки
      , applicationId INT NOT NULL --  Номер заявки
      , decisionResult VARCHAR(128) NOT NULL -- результат
      , recordStatus VARCHAR(128) NULL -- статус запису

      , appsErrorsId INT NOT NULL

      , status INT DEFAULT 1
      , PRIMARY KEY (id)
      , CONSTRAINT fk_appsErrors
          FOREIGN KEY (appsErrorsId)
	        REFERENCES appsErrors (id) ON DELETE CASCADE -- Added ON DELETE CASCADE for clarity
    );
CREATE INDEX aeh_dateCreated_idx ON appsErrorsHistory (dateCreated);
CREATE INDEX aeh_applicationId_idx ON appsErrorsHistory (applicationId);
CREATE INDEX aeh_appsErrorsId_idx ON appsErrorsHistory (appsErrorsId);

-----
-- DROP TABLE dictsProductMapping
CREATE TABLE
    dictsProductMapping (
        id bigserial NOT NULL
      , dateCreated TIMESTAMP NOT NULL DEFAULT NOW()
      , dateModified TIMESTAMP NOT NULL DEFAULT NOW()

      , absProdCode VARCHAR(64) NOT NULL --  Код продукту
      , absPacketCode VARCHAR(64) NOT NULL -- PacketCode продукту
      , absSystemCode VARCHAR(32) NOT NULL -- Система "mobbank" "atb"
      , absProdId INT NOT NULL   -- 4200 Ід продукту
      , activity INT DEFAULT 1  -- Активність

      , status INT DEFAULT 1
      , PRIMARY KEY (id)
);
CREATE INDEX dpm_dateCreated_idx ON dictsProductMapping (dateCreated);

-----
-- DROP TABLE appsProcessSteps
CREATE TABLE
    appsProcessSteps (
        id bigserial NOT NULL
      , dateCreated TIMESTAMP NOT NULL DEFAULT NOW()
      , dateModified TIMESTAMP NOT NULL DEFAULT NOW()
      
      , applicationId INT NOT NULL
      , stateCode VARCHAR(20) NOT NULL
	  , programTypeId INT NOT NULL
	  , absProdCode VARCHAR(64) NOT NULL
	  
      , stepUUID VARCHAR(64) NOT NULL
      , stepCode VARCHAR(64) NOT NULL
      
      , payload JSONB
      
      , status INT DEFAULT 1
      , PRIMARY KEY (id)
      
      , CONSTRAINT appsProcessSteps_idx UNIQUE (stepUUID, applicationId, stateCode, programTypeId, absProdCode, stepCode, status)
      
	);
CREATE INDEX aps_dateCreated_idx ON appsProcessSteps (dateCreated);
CREATE INDEX aps_stepUUID_idx ON appsProcessSteps (stepUUID);
CREATE INDEX aps_stepUUID_CODE_idx ON appsProcessSteps (stepUUID, stepCode);

-- Function to update the dateModified column

CREATE OR REPLACE FUNCTION set_date_modified()
RETURNS TRIGGER AS $$
BEGIN
    NEW.dateModified = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for appsDecisions table
CREATE TRIGGER trg_aCREATE OR REPLACE FUNCTION set_date_modified()
RETURNS TRIGGER AS $$
BEGIN
    NEW.dateModified = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;ppsDecisions_dateModified
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

-- Trigger for appsprocesssteps table
CREATE TRIGGER trg_appsprocesssteps_dateModified
BEFORE UPDATE ON appsprocesssteps
FOR EACH ROW
EXECUTE FUNCTION set_date_modified();

-- Trigger for dictsaddcardinfo table
CREATE TRIGGER trg_dictsaddcardinfo_dateModified
BEFORE UPDATE ON dictsaddcardinfo
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
        coalesce(OLD.decisionResult,''),
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


-- https://docs.google.com/document/d/1qD6meZnTKV8lxOLLWKL4Jepmi_H3TAiEJKsRHXieLQY
-- https://docs.google.com/document/d/1qD6meZnTKV8lxOLLWKL4Jepmi_H3TAiEJKsRHXieLQY/edit?tab=t.0#heading=h.bvqz7drqvpkx
-- drop table dictsAddCardInfo
CREATE TABLE
    dictsAddCardInfo (
        id bigserial NOT NULL
        
      , dateCreated TIMESTAMP NOT NULL DEFAULT NOW()
      , dateModified TIMESTAMP NOT NULL DEFAULT NOW()

      , productId INT NOT NULL
      , availCardsNoComm INT NOT NULL
      , availCardsToChilds INT NOT NULL
      
      , imageAddCartUrlVisa VARCHAR(512) NOT NULL 
      , imageAddCartUrlMaster VARCHAR(512) NOT NULL 
      
      , screenHeadAddCard VARCHAR(512) NULL 
      , screenTextAddCard VARCHAR(512) NOT NULL
      
      , availableVisa INT NULL
      , availableMaster INT NULL
      , ipsPriority VARCHAR(32) NOT NULL 
      , bpcCodeVisa VARCHAR(3) NULL 
      , bpcCodeMaster VARCHAR(3) NULL
      , bpcCodeVerify  VARCHAR(128) NOT NULL 
      , status INT DEFAULT 1
      
      , PRIMARY KEY (id)      
	);
CREATE INDEX daci_productId_idx ON dictsAddCardInfo (productId);
-- Trigger for dictsAddCardInfo table
CREATE TRIGGER trg_dictsAddCardInfo_dateModified
BEFORE UPDATE ON dictsAddCardInfo
FOR EACH ROW
EXECUTE FUNCTION set_date_modified();

ALTER TABLE dictsAddCardInfo
ALTER COLUMN bpcCodeVerify SET DATA TYPE VARCHAR(256);


DROP TABLE IF EXISTS public.semaphores;
CREATE TABLE IF NOT EXISTS public.semaphores
(
    id bigserial NOT NULL,
    dateCreated timestamp NOT NULL DEFAULT now(),
    dateModified timestamp NOT NULL DEFAULT now(),
    code character varying(32)  NOT NULL UNIQUE,
    ident character varying(64) NOT NULL DEFAULT '',
    isbusy boolean NOT NULL DEFAULT FALSE,
    CONSTRAINT semaphores_pkey PRIMARY KEY (id)
);
CREATE TRIGGER trg_semaphores_dateModified
BEFORE UPDATE ON semaphores
FOR EACH ROW
EXECUTE FUNCTION set_date_modified();


INSERT INTO public.semaphores(code, ident, isbusy)
    VALUES 
    ('CARDCREDO.MAIN', '', false),
    ('MKPSEP.DIGITAL', '', false),
    ('MKPSEP.SCROOGE', '', false);



