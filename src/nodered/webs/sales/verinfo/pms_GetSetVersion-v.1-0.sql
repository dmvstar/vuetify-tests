/*
sp_helptext sc_GetVersion
sp_helptext sc_SetVersion
MSSQL Restored 2024-11-02 09:24:53
*/

-- TEST 
IF OBJECT_ID('dbo.sc_GetVersion') IS NOT NULL
    EXEC dbo.sc_GetVersion
    	@TaskCode = 'UGB_listLastCardTransactions';
GO

IF OBJECT_ID('dbo.sc_GetVersionHistory') IS NOT NULL
    EXEC dbo.sc_GetVersionHistory
    	@TaskCode = 'UGB_listLastCardTransactions';
GO

IF OBJECT_ID('dbo.sc_SetVersion') IS NOT NULL
    EXEC dbo.sc_SetVersion
         @TaskCode = 'UGB_listLastCardTransactions',
         @Build = 4,
         @Version = '0.0.11 from 23.11.2021',
         @TaskName = 'Get list of last 50 cart transactions';        
GO
-- TEST


-- PROCEDURES
-- sc_GetVersion
CREATE OR ALTER PROCEDURE dbo.sc_GetVersion
	  @TaskCode varchar(255)
	, @Version varchar(255) = NULL OUT 
	, @Build int = NULL OUT
	, @TaskName varchar(255) = NULL OUT
	, @Mode int = 0
	, @SysError int = 0 OUT 
/*
 0 result SELECT
 1 result OUT params 
*/
	
AS
SET NOCOUNT  ON
SET ROWCOUNT 0

SELECT @TaskCode = parsename( @TaskCode, 1 )

SELECT @Version = Version 
    , @Build  = Build  
    , @TaskName = TaskName
FROM dbObjects
WHERE TaskCode = @TaskCode

IF @@ERROR <> 0
    OR @@ROWCOUNT <> 1
    GOTO ERR_FIND

IF @Mode = 0
    SELECT    	
    	cast( @TaskCode as varchar(80))  as TaskCode 
    	, cast( @Version as varchar(80))  as Version 
        , @Build as Build 
        , cast( @TaskName as varchar(240)) as TaskName

EXITSTAT:
    RETURN 1

ERR_FIND:
    RAISERROR( 'Not a info about [%s]', 16, -1, @TaskCode )
    GOTO ERR_TRAN

ERR_TRAN:
    IF @SysError IS NULL
    OR @SysError = 0
        SELECT @SysError = 50000
RETURN 0;
-- sc_GetVersion


-- sc_SetVersion
CREATE PROCEDURE dbo.sc_SetVersion
      @TaskCode varchar(255)   -- название объекта
    , @Version varchar(255) = NULL  -- версия объекта
    , @Build  int  = NULL   -- билд объекта
    , @TaskName varchar(255) = NULL   -- "читаемое" название объекта
    , @Label  varchar(255) = ''  
    , @Note  varchar(255) = ''
    , @SysError int  = 0 OUT 
AS

SET NOCOUNT  ON

DECLARE
    @OldName varchar(255) ,   @Error  int  ,    @Count  int  ,    @Issue  int

-- Делать нечего!
IF @Version IS NULL
AND @Build  IS NULL
AND @TaskName IS NULL 
BEGIN

EXEC dbo.sc_GetVersion
     @TaskCode = @TaskCode;

GOTO EXITSTAT;
END;

-- смена имени
IF @TaskCode <> parsename( @TaskCode, 1 )
 SELECT @OldName = @TaskCode
ELSE SELECT @OldName = NULL

SELECT @TaskCode = parsename( @TaskCode, 1 )

INSERT INTO
    dbHistory (
        ObjectId
        , Version
        , Build
        , TaskName
        , Changer
        , Changed
        , Creator
        , Created
        , Label
        , Note
    )
    SELECT
        Id
        , Version
        , Build
        , TaskName
        , Creator
        , Created
        , system_user
        , getdate()
        , Label
        , Note
    FROM
        dbObjects
    WHERE
        TaskCode  = @TaskCode

SELECT  @SysError = @@ERROR 
        , @Count  = @@ROWCOUNT

IF @SysError <> 0
    GOTO ERR_TRAN

-- Объект не зарегистрирован?
IF @Count = 0 BEGIN

 -- А то не вставится
SELECT   @Version = ISNULL( @Version ,'' )
       , @TaskName = ISNULL( @TaskName ,'' )
       , @Build = ISNULL( @Build ,0 )
       --, @FileName = ISNULL( @FileName ,'' )
       , @Label = ISNULL( @Label ,'' )
       , @Note = ISNULL( @Note ,'' )

INSERT INTO dbObjects ( 
         TaskCode 
        , Version 
        , Build 
        , TaskName 
        , Creator 
        , Created 
        , Label 
        , Note ) 
VALUES ( 
        @TaskCode 
        , @Version 
        , @Build 
        , @TaskName 
        , system_user 
        , getdate() 
        , @Label 
        , @Note )

SET @SysError = @@ERROR

IF @SysError <> 0
  GOTO ERR_TRAN

END ELSE BEGIN

UPDATE dbObjects
SET    Version  = ISNULL( @Version , Version )
       , Build  = ISNULL( @Build , Build  )
       , TaskName  = ISNULL( @TaskName , TaskName  )
       --, Path  = ISNULL( @FileName , Path  )       
       , Creator  = system_user  
       , Created  = getdate()  
       , Label  = ISNULL( @Label , ''  )
       , Note  = ISNULL( @Note  , ''  )
WHERE TaskCode  = @TaskCode;

SET @SysError = @@ERROR

IF @SysError <> 0
  GOTO ERR_TRAN
END
-- если указано "старое" имя, то подправим историю и уберем старую точку входа
IF @OldName IS NOT NULL
AND EXISTS ( 
    SELECT 1
    FROM dbObjects
    WHERE TaskCode = @OldName
)
BEGIN
    UPDATE dbHistory
    SET ObjectId =
    ( 
        SELECT Id
        FROM dbObjects
        WHERE TaskCode  = @TaskCode
    )
WHERE ObjectId =
    ( 
        SELECT Id
        FROM dbObjects
        WHERE TaskCode  = @OldName
    )

SET @SysError = @@ERROR

IF @SysError <> 0
    GOTO ERR_TRAN

DELETE
    FROM dbObjects
    WHERE TaskCode = @OldName

SET @SysError = @@ERROR

IF @SysError <> 0
    GOTO ERR_TRAN
END

EXITSTAT:
    RETURN 1

ERR_EXEC:
    SELECT @SysError = @Error
    GOTO ERR_TRAN

ERR_TRAN:
    IF @SysError IS NULL
    OR @SysError = 0
    SELECT @SysError = 50000

RETURN 0;
-- sc_SetVersion
 
-- PROCEDURES

 
-- dbo.dbObjects definition
-- Drop table
-- DROP TABLE dbo.dbObjects;
CREATE TABLE
    dbObjects (
        Id int IDENTITY (1, 1) NOT NULL
        , TaskCode varchar(255) NOT NULL
        , Label varchar(255) DEFAULT '' NOT NULL
        , Version varchar(255) DEFAULT '' NOT NULL
        , Build int DEFAULT 0 NOT NULL
        , TaskName varchar(255) DEFAULT '' NOT NULL
        , Note varchar(255) DEFAULT '' NOT NULL
        , Creator varchar(255) DEFAULT suser_sname() NOT NULL
        , Created datetime DEFAULT getdate() NOT NULL
        , CONSTRAINT IdbObjectsId PRIMARY KEY (Id)
        , CONSTRAINT IdbObjectsName UNIQUE (TaskCode)
);

-- dbo.dbHistory definition
-- Drop table
-- DROP TABLE dbo.dbHistory;
CREATE TABLE
    dbHistory (
        Id int IDENTITY (1, 1) NOT NULL
        , ObjectId int NOT NULL
        , Label varchar(255) NOT NULL
        , Version varchar(255) NOT NULL
        , Build int NOT NULL
        , TaskName varchar(255) DEFAULT '' NOT NULL
        , Note varchar(255) DEFAULT '' NOT NULL
        , Changer varchar(255) NOT NULL
        , Changed datetime NOT NULL
        , Creator varchar(255) DEFAULT suser_sname () NOT NULL
        , Created datetime DEFAULT getdate () NOT NULL
        , CONSTRAINT IdbHistoryId PRIMARY KEY (Id)
);
-- dbo.dbHistory foreign keys
ALTER TABLE dbo.dbHistory ADD CONSTRAINT RdbHistoryObjectId FOREIGN KEY (ObjectId) REFERENCES dbObjects(Id) ON DELETE CASCADE;

SELECT * FROM dbHistory;
SELECT * FROM dbObjects;



