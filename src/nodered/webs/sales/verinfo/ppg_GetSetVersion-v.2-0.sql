/*
sp_helptext sc_GetVersion
sp_helptext sc_SetVersion
PG SQL Version Restored 2024-11-02 09:24:53
*/

-- TEST 

CALL sc_GetVersion ('UGB_listLastCardTransactions');
IF EXISTS (SELECT to_regproc('public.sc_GetVersion'))

--IF (SELECT to_regproc('public.sc_GetVersion') IS NOT NULL) THEN
    CALL sc_GetVersion ('sc_GetVersion');   
--END IF;

--IF (SELECT to_regproc('public.sc_GetVersion') IS NOT NULL) THEN
    CALL sc_GetVersionHistory('UGB_listLastCardTransactions');
--END IF;


--IF (SELECT to_regproc('public.sc_SetVersion') IS NOT NULL) THEN
    CALL sc_SetVersion (
         TaskCode := 'UGB_listLastCardTransactions',
         1,
         '0.0.11 from 23.11.2020',
         'Get list of last 50 cart transactions'
	);
--END IF;

-- TEST


-- PROCEDURES
-- sc_GetVersion
-- DROP PROCEDURE sc_GetVersion;
CREATE OR REPLACE PROCEDURE sc_getVersion(
	INOUT TaskCode character VARYING
	, INOUT Version character varying DEFAULT NULL::character VARYING
	, INOUT Build integer DEFAULT NULL::integer
	, INOUT TaskName character varying DEFAULT NULL::character VARYING
)
LANGUAGE plpgsql
AS $procedure$ 
DECLARE 
    -- Deklaracje zmiennych (opcjonalne)
	vTaskCode character VARYING;
 	total_rows integer;
BEGIN 
	vTaskCode := TaskCode;
    -- Treść procedury (instrukcje SQL)
	SELECT SPLIT_PART( TaskCode, '.', 1 ) INTO TaskCode;
	Version := '1.0.0';
	SELECT dob.TaskCode
	, dob.Version 
    , dob.Build  
    , dob.TaskName
	INTO TaskCode
	, Version 
    , Build  
    , TaskName
	FROM dbObjects dob
	WHERE dob.TaskCode = vTaskCode;
	--GET DIAGNOSTICS Build := ROW_COUNT;
END; 
$procedure$;

CALL sc_GetVersion('sc_GetVersion');

-- sc_GetVersion

-- sc_SetVersion
-- DROP PROCEDURE sc_SetVersion;
CREATE OR REPLACE PROCEDURE sc_SetVersion(
      INOUT TaskCode varchar(255) DEFAULT NULL  	-- название объекта
    , INOUT Version varchar(255) DEFAULT NULL  	-- версия объекта
    , INOUT Build  int  DEFAULT NULL   			-- билд объекта
    , INOUT TaskName varchar(255) DEFAULT NULL   	-- "читаемое" название объекта
    , IN Hash  bytea DEFAULT NULL      
    , IN Label  varchar(255) DEFAULT ''      
    , IN Note  varchar(255) DEFAULT ''    
    , INOUT SysError int DEFAULT 0 ) 
LANGUAGE plpgsql 
AS $procedure$ 
DECLARE 
    OldName varchar(255);  vFileName varchar(255);
    Error  int;      Count  int;      Issue  int;
	vTaskCode varchar(255);	vVersion varchar(255);	vTaskName varchar(255);	vBuild  int;
	vLabel varchar(255); vNote varchar(255);
BEGIN
	vFileName := '';
	vTaskCode := TaskCode;
	vBuild := Build;
	vVersion := Version;
	vNote := Note;
	vLabel := Label;
IF Version IS NULL 
	AND Build  IS NULL
	AND TaskName IS NULL
	THEN
		SysError := 1;	
		RETURN;
	END IF;
	CALL sc_GetVersion( vTaskCode, vVersion, vBuild, vTaskName);
	RAISE NOTICE 'IS NULL vTaskCode: % %', vTaskCode, vVersion;

	IF vVersion IS NULL 
	THEN
		RAISE NOTICE 'IS NULL vTaskCode: %', vTaskCode;
		SELECT SPLIT_PART( TaskCode, '.', 1 ) INTO vTaskCode;
	INSERT INTO dbObjects ( 
         TaskCode         , Version 
        , Build         , TaskName 
        , Creator         , Created 
        , Label         , Note ) 
	VALUES ( 
        vTaskCode         , Version 
        , Build         , TaskName 
        , current_user      , NOW()         
		, Label         , Note );
	ELSE 
		vBuild   := Build;
		vVersion := Version;
		RAISE NOTICE 'ELSE+ % % % %', vTaskCode, vVersion, vBuild, vTaskName;

		INSERT INTO dbHistory (objectid,label,version,build,taskname,note,creator,created,stamp)
		SELECT                       o.id,o.label,o.version,o.build,o.taskname,o.note,o.creator,o.created,o.stamp
		FROM dbObjects o 
		WHERE o.TaskCode = vTaskCode; 
		--WHERE o.TaskCode = 'sc_GetVersion';

		UPDATE dbObjects o
		SET Version = vVersion
        , Build = vBuild 	 , TaskName = vTaskName
        , Label = vLabel     , Note = vNote
		WHERE o.TaskCode = vTaskCode;

	END IF;
END; 
$procedure$;

CALL sc_SetVersion (
         TaskCode := 'UGB_listLastCardTransactions3'
         , Version := '0.1.16 from 23.11.2024'
         , Build := 38
         , TaskName := 'Get list of last 50 cart transactions 11'
);

CALL sc_GetVersion (
         TaskCode := 'UGB_listLastCardTransactions3');

CALL sc_SetVersion (
         TaskCode := 'sc_GetVersion'
         , Version := '0.0.11 from 12.11.2024'
         , Build := 5
         , TaskName := 'Define Versions of procedures'
);
CALL sc_GetVersion (
         TaskCode := 'sc_GetVersion');

-- sc_SetVersion 
-- PROCEDURES
 
-- dbObjects definition
-- Drop table
-- DROP TABLE dbObjects;
CREATE TABLE
    dbObjects (        
        Id bigserial NOT NULL
        , TaskCode varchar(255) NOT NULL UNIQUE
        , Label varchar(255) DEFAULT '' NOT NULL
        , Version varchar(255) DEFAULT '' NOT NULL
        , Build int DEFAULT 0 NOT NULL
        , TaskName varchar(255) DEFAULT '' NOT NULL
        , Note varchar(255) DEFAULT '' NOT NULL
        , Creator varchar(255) DEFAULT current_user NOT NULL
        , Created timestamp NOT NULL DEFAULT NOW()
        , Stamp timestamp NOT NULL DEFAULT NOW()
        , CONSTRAINT IdbObjectsId PRIMARY KEY (Id)
);

-- dbo.dbHistory definition
-- Drop table
-- DROP TABLE dbHistory;
CREATE TABLE
    dbHistory (
        Id bigserial NOT NULL
        , ObjectId int NOT NULL
        , Label varchar(255) NOT NULL
        , Version varchar(255) NOT NULL
        , Build int NOT NULL
        , TaskName varchar(255) DEFAULT '' NOT NULL
        , Note varchar(255) DEFAULT '' NOT NULL
        , Creator varchar(255) DEFAULT current_user NOT NULL
        , Created timestamp NOT NULL DEFAULT NOW()
        , Changer varchar(255) DEFAULT current_user NOT NULL
        , Changed timestamp NOT NULL DEFAULT NOW()
        , Stamp timestamp NOT NULL DEFAULT NOW()
        , CONSTRAINT IdbHistoryId PRIMARY KEY (Id)
);
-- dbo.dbHistory foreign keys
ALTER TABLE dbHistory ADD CONSTRAINT RdbHistoryObjectId FOREIGN KEY (ObjectId) REFERENCES dbObjects(Id) ON DELETE CASCADE;

SELECT * FROM dbHistory;
SELECT * FROM dbObjects;





