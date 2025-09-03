CREATE TABLE
    api_items (
        id      SERIAL PRIMARY KEY
      , code    VARCHAR(64) UNIQUE NOT NULL
      , ident   VARCHAR(64) NOT NULL
      , kind    INTEGER NOT NULL
      , value   BOOLEAN NOT NULL
      , name    VARCHAR(128) NOT NULL
      , info    TEXT
      , icon    VARCHAR(64)
    );

INSERT INTO api_items (code, ident, kind, value, name, info, icon) VALUES
('STATUS_API_2', 'CC_API', 3, TRUE,  'API 2. Отримання даних заявок з рішеннями з статусом [MB Documents Signed]', 'https://ccs.dev.ukrgasaws.com/api/ccs/report/expired', 'mdi-clock'),
('STATUS_API_7', 'CC_API', 3, FALSE, 'API 7. Відправка пуша по погодженому ліміту', 'https://nr-messages.dev.ukrgasaws.com', 'mdi-clock'),
('STATUS_API_9', 'CC_API', 3, FALSE, 'API 9. Активація картки', 'https://mobservice-main.ukrgas.bank.local:1990', 'mdi-clock'),
('STATUS_API_10', 'CC_API', 3, TRUE,  'API 10. Отримання даних про ліміт', 'https://credit.ukrgasbank.com/api/ccs/application/limit', 'mdi-clock');
