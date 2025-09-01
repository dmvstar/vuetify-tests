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
('TEST_API_1', 'api_test', 1, TRUE, 'Test API A', 'http://test.site/api/v1/a', 'mdi-test-a'),
('TEST_API_2', 'api_test', 2, FALSE, 'Test API B', 'http://test.site/api/v1/b', 'mdi-test-b'),
('TEST_API_3', 'api_test', 3, TRUE, 'Test API C', 'http://test.site/api/v1/c', 'mdi-test-b');
