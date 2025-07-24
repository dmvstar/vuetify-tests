/*
 * [CEPIKControl]_Cepik_Control_Tables_2025-03-04-v.2.sql
*/

PRINT 'Etap 1 - tworzenie tabel';

-- Tabela DriverControlLicences
IF OBJECT_ID('DriverControlLicences', 'U') IS NULL
BEGIN
    -- DROP TABLE [DriverControlLicences] -- Zakomentowane, aby uniknąć przypadkowego usunięcia
    CREATE TABLE [DriverControlLicences] (
      [DriverControlLicencesID] INT PRIMARY KEY NOT NULL IDENTITY(1, 1), -- Zmieniono ID na INT (lub BIGINT, jeśli przewidujesz bardzo dużą liczbę rekordów)
      [DriverID] INT NOT NULL, -- Zmieniono ID na INT
      [ControlDate] datetime NOT NULL DEFAULT GETDATE(),
      [DocumentType] varchar(32) NULL,
      [ExpiredDate] date NULL, -- Data ważności dokumentu (np. prawa jazdy jako fizycznego dokumentu)
      [DocumentState] varchar(64) NULL, -- Stan dokumentu (np. "Ważny", "Zatrzymany")
      [Message] varchar(256) NULL, -- Dodano explicitnie NULL, aby jasno określić, że pole może być puste
      [LicenceNumber] varchar(32) NULL, -- Numer blankietu PJ, który był przedmiotem kontroli (nawet w przypadku błędów)
      [LicenceExpiredDate] date NULL, -- Data ważności uprawnień ogólnych (jeśli różni się od ExpiredDate dokumentu)
      [DocumentIssuer] varchar(32) NULL, -- Organ wydający dokument
      [CreateDate] datetime NOT NULL DEFAULT GETDATE(),
      [UserCreated] INT NULL, -- Sugeruję NULL, jeśli użytkownik nie zawsze jest dostępny, lub NOT NULL z domyślną wartością
      [LastModificationDate] datetime NOT NULL DEFAULT GETDATE(),
      [UserModificated] INT NULL, -- Sugeruję NULL
      [Status] BIT NOT NULL DEFAULT (1)
    );
    -- Dodanie klucza obcego po utworzeniu tabeli
	GO
    ALTER TABLE [DriverControlLicences] ADD FOREIGN KEY ([DriverID]) REFERENCES [Driver] ([DriverID]);

    PRINT 'Table DriverControlLicences created.';
END
ELSE
BEGIN
    PRINT 'Table DriverControlLicences already exists.'; -- Poprawiono komunikat
END;

-- Tabela DriverControlCategories
IF OBJECT_ID('DriverControlCategories', 'U') IS NULL
BEGIN
    -- DROP TABLE [DriverControlCategories] -- Zakomentowane
    CREATE TABLE [DriverControlCategories] (
      [DriverControlCategoriesID] INT PRIMARY KEY NOT NULL IDENTITY(1, 1), -- Zmieniono ID na INT
      [DriverControlId] INT NOT NULL, -- Zmieniono ID na INT
      [DriverLicenceTypeID] INT NOT NULL, -- Zmieniono ID na INT
      [Categorie] varchar(32) NOT NULL, -- Kategoria uprawnienia (np. "A", "B", "C")
      [ExpiredDate] date NULL, -- Data ważności konkretnej kategorii uprawnienia
      [Status] BIT NOT NULL DEFAULT (1)
    );
    -- Dodanie kluczy obcych po utworzeniu tabeli
	GO
    ALTER TABLE [DriverControlCategories] ADD FOREIGN KEY ([DriverControlId]) REFERENCES [DriverControlLicences] ([DriverControlLicencesID]);
    ALTER TABLE [DriverControlCategories] ADD FOREIGN KEY ([DriverLicenceTypeID]) REFERENCES [DriverLicenceType] ([DriverLicenceTypeID]);

    PRINT 'Table DriverControlCategories created.';
END
ELSE
BEGIN
    PRINT 'Table DriverControlCategories already exists.'; -- Poprawiono komunikat
END;

