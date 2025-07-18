/*
 * [CEPIKControl]_Cepik_Control_Tables_2025-03-04-v.2.sql
*/

-- DROP TABLE [DriverControlLicence]
CREATE TABLE [DriverControlLicence] (
  [DriverControlLicenceID] ID NOT NULL IDENTITY(1, 1),
  [DriverID] ID NOT NULL,
  [ControlDate] datetime NOT NULL DEFAULT GETDATE(),
  [DocumentType] varchar(32) NULL,
  [ExpiredDate] date NULL,
  [DocumentState] varchar(64) NULL,
  [Message] varchar(256),
  [LicenceNumber] varchar(32) NULL, -- < Driver.LicenceNumber w przypadku błędów
  [LicenceExpiredDate] date NULL,
  [DocumentIssuer] varchar(32) NULL,
  [CreateDate] datetime NOT NULL DEFAULT GETDATE(),
  [UserCreated] INT,
  [LastModificationDate] datetime NOT NULL DEFAULT GETDATE(),
  [UserModificated] INT,
  [Status] BIT NOT NULL DEFAULT (1)
);
ALTER TABLE [DriverControlLicence] ADD FOREIGN KEY ([DriverID]) REFERENCES [Driver] ([DriverID]);

-- DROP TABLE [DriverControlCategories]
CREATE TABLE [DriverControlCategories] (
  [DriverControlCategoriesID] ID NOT NULL IDENTITY(1, 1),
  [DriverControlId] ID NOT NULL,
  [DriverLicenceTypeID] ID NOT NULL,
  [Categorie] varchar(32) NOT NULL,
  [ExpiredDate] date NULL,
  [Status] BIT NOT NULL DEFAULT (1)
);
ALTER TABLE [DriverControlCategories] ADD FOREIGN KEY ([DriverControlId]) REFERENCES [DriverControlLicence] ([DriverControlLicenceID]);
ALTER TABLE [DriverControlCategories] ADD FOREIGN KEY ([DriverLicenceTypeID]) REFERENCES [DriverLicenceType] ([DriverLicenceTypeID]);


------------------------------------------------

PRINT 'Etap 1 - tworzenie tabel';

-- DROP TABLE CEPIKDriverControl
IF OBJECT_ID('CEPIKDriverControl', 'U') IS NULL
BEGIN

END
ELSE
BEGIN
    -- Table exist
    PRINT 'Table CEPIKDriverControl exist.';
END;


