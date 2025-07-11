/** 
* @WHAT Database for project credo_card
* @VERSION v.0.0.3
* @WHERE 2025-07-03_Database_and_Table-v.3.sql
* @DATE 2025-07-09 19:42:59
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

-- DROP TABLE appsDecisions
-- DROP INDEX applicationId_idx  	
-- DROP INDEX dateCreated_idx  	
-- DROP INDEX decissionDate_idx  	

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
      
      
-- DROP TABLE appsErrors      
CREATE TABLE
    appsErrors (
        id bigserial NOT NULL
      , dateCreated TIMESTAMP NOT NULL DEFAULT NOW()
      , dateModified TIMESTAMP NOT NULL DEFAULT NOW()

      , applicationId INT NOT NULL
      , decisionResult VARCHAR(128) NULL -- Помилка: ScroogeId клієнта не знайдено
      , recordStatus VARCHAR(128) NULL 
      , stateCode VARCHAR(20) NOT NULL
      , clientId INT NULL
      , programTypeId INT NULL
      , absProdCode VARCHAR(64) NOT NULL
      , docUpdated VARCHAR(64) NULL
      , COMMENT VARCHAR(128) NULL
      , history VARCHAR(128) NULL

      , status INT DEFAULT 1
      , PRIMARY KEY (id)
    );
CREATE INDEX ae_dateCreated_idx ON appsErrors (dateCreated);  	
CREATE INDEX ae_applicationId_idx ON appsErrors (applicationId);  	


-- DROP TABLE appsErrorsHistory      
CREATE TABLE
    appsErrorsHistory (
        id bigserial NOT NULL
      , dateCreated TIMESTAMP NOT NULL DEFAULT NOW() -- дата запису
      , dateModified TIMESTAMP NOT NULL DEFAULT NOW()

      , counterTries INT NOT NULL --  Номер спроби обробки 
      , applicationId INT NOT NULL --  Номер заявки 
      , recordStatus VARCHAR(128) NOT NULL -- статус запису 
      , decisionResult VARCHAR(128) NOT NULL -- результат 

      , status INT DEFAULT 1 
      , PRIMARY KEY (id)

    );
CREATE INDEX aeh_dateCreated_idx ON appsErrorsHistory (dateCreated);  	
CREATE INDEX aeh_applicationId_idx ON appsErrorsHistory (applicationId);  	

-- DROP TABLE dictsProductMapping      
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


/* EXAMPLES */

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

UPDATE public.appsdecisions SET applicationstatus = 'MD Approved' WHERE id = 2