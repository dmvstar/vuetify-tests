
----------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION add_sysapilog_entry(
    p_requestid VARCHAR(256),
    p_clientip INET,
    p_method e_method,
    p_direction e_direct,
    p_statuscode VARCHAR(32),
    p_process varchar(64),
    p_host VARCHAR(256),
    p_path VARCHAR(256),
    p_result VARCHAR(32),
    p_contenttext TEXT,
    p_contentbody JSONB,
    p_headers JSONB,
    p_exception TEXT,
    p_duration INTEGER
)
RETURNS BIGINT AS $$
DECLARE
    new_id BIGINT;
BEGIN
    INSERT INTO sysapilog (
        requestid,
        clientip,
        method,
        direction,
        statuscode,
        process,
        host,
        path,
        result,
        contenttext,
        contentbody,
        headers,
        exception,
        duration
    )
    VALUES (
        p_requestid,
        p_clientip,
        p_method,
        p_direction,
        p_statuscode,
        p_process,
        p_host,
        p_path,
        p_result,
        p_contenttext,
        p_contentbody,
        p_headers,
        p_exception,
        p_duration
    )
    RETURNING id INTO new_id;

    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

SELECT  add_sysapilog_entry(
    '87943d6c-6a7f-4f1a-b03a-6f7d2f9d8888',
    '192.168.1.100'::INET,
    'POST'::e_method,
    'REQUEST'::e_direct,
    '200',
    'api.example.com',
    '/v1/users',
    'ok',
    '{"message": "User successfully created."}',
    '{"name": "Jane Doe", "email": "jane.doe@example.com"}',
    '{"content-type": "application/json", "accept": "application/json"}',
    NULL,
    760
);

----------------------------------------------------------------------------------

CREATE OR REPLACE PROCEDURE add_sysapilog_entry_proc(
    IN p_requestid VARCHAR(256),
    IN p_clientip INET,
    IN p_method e_method,
    IN p_direction e_direct,
    IN p_statuscode VARCHAR(32),
    IN p_process varchar(64),
    IN p_host VARCHAR(256),
    IN p_path VARCHAR(256),
    IN p_result VARCHAR(32),
    IN p_contenttext TEXT,
    IN p_contentbody JSONB,
    IN p_headers JSONB,
    IN p_exception TEXT,
    IN p_duration INTEGER,
    OUT p_new_id BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Ustawiamy domyślną wartość na NULL w przypadku błędu
    p_new_id := NULL;

    -- Rozpoczynamy blok obsługi wyjątków
    BEGIN
        INSERT INTO sysapilog (
            requestid,
            clientip,
            method,
            direction,
            statuscode,
            process,
            host,
            path,
            result,
            contenttext,
            contentbody,
            headers,
            exception,
            duration
        )
        VALUES (
            p_requestid,
            p_clientip,
            p_method,
            p_direction,
            p_statuscode,
            p_process,
            p_host,
            p_path,
            p_result,
            p_contenttext,
            p_contentbody,
            p_headers,
            p_exception,
            p_duration
        )
        RETURNING id INTO p_new_id; -- Zapisujemy ID do parametru wyjściowego
    
    EXCEPTION
        WHEN others THEN
            -- Obsłuż błąd: p_new_id pozostaje NULL, możesz dodać logowanie błędu
            RAISE NOTICE 'Wystąpił błąd podczas wstawiania rekordu: %', SQLERRM;
    END;
END;
$$;

----------------------------------------------------------------------------------

DO $$
DECLARE
    created_log_id BIGINT;
BEGIN
    CALL add_sysapilog_entry_proc(
        'a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890',
        '203.0.113.12'::INET,
        'GET'::e_method,
        'OUTBOUND'::e_direct,
        '200 OK',
        'Maps',
        'maps.googleapis.com',
        '/maps/api/geocode/json',
        'SUCCESS',
        NULL,
        NULL,
        '{"Authorization": "Bearer some_token"}',
        NULL,
        85,
        NULL -- Zmienna wyjściowa, która przechwyci ID
    );

    RAISE NOTICE 'Nowo utworzony ID: %', created_log_id;
END $$;

