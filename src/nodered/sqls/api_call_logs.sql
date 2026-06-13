-- 1. Create the logging table
-- DROP table sys_api_stat;
CREATE TABLE IF NOT EXISTS sys_api_stat (
    id BIGSERIAL PRIMARY KEY,
    call_uuid UUID DEFAULT gen_random_uuid(),
    
    hostname TEXT NOT NULL,
    request_path TEXT NOT NULL,
    http_method VARCHAR(10) NOT NULL,
    
    response_status INT NOT NULL,
    ip_address VARCHAR(45), -- Supports both IPv4 and IPv6 strings
    call_count INT DEFAULT 1 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_call_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Crucial: This constraint allows the ON CONFLICT upsert to work
    CONSTRAINT unique_path_method UNIQUE (hostname, request_path, http_method)
);

-- 2. Performance indexes for quick dashboard lookups
CREATE INDEX IF NOT EXISTS idx_service_logs_hostname ON sys_api_stat(hostname);
CREATE INDEX IF NOT EXISTS idx_service_logs_path ON sys_api_stat(request_path);
CREATE INDEX IF NOT EXISTS idx_service_logs_last_call ON sys_api_stat(last_call_at);

--GRANT ALL PRIVILEGES ON DATABASE dijaworks TO dbmanager;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dbmanager;
GRANT ALL PRIVILEGES ON SEQUENCE sys_api_stat_id_seq TO dbmanager;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO dbmanager;

--GRANT ALL PRIVILEGES ON DATABASE dijaworks TO nrlogger;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nrlogger;
GRANT ALL PRIVILEGES ON SEQUENCE sys_api_stat_id_seq TO nrlogger;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO nrlogger;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO user_card_credo;
--GRANT ALL PRIVILEGES ON SEQUENCE sys_api_stat_id_seq TO user_card_credo;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO user_card_credo;


-- 3 Insert 
INSERT INTO sys_api_stat (
    hostname, 
    request_path, 
    http_method, 
    response_status, 
    ip_address, 
    call_count, 
    last_call_at
)
VALUES (${hostname}, ${path}, ${method}, ${statusCode}, ${ip}, 1, NOW())
ON CONFLICT (hostname, request_path, http_method) 
DO UPDATE SET 
    call_count = sys_api_stat.call_count + 1,
    last_call_at = NOW(),
    response_status = EXCLUDED.response_status,
    ip_address = EXCLUDED.ip_address;


-- 3 Insert 
INSERT INTO sys_api_stat (
    hostname, 
    request_path, 
    http_method, 
    response_status, 
    ip_address, 
    call_count, 
    last_call_at
)
VALUES (
    '{{{payload.hostname}}}'
    , '{{{payload.path}}}'
    , '{{{payload.method}}}'
    , '{{{payload.statusCode}}}'
    , '{{{payload.ip}}}'
    , 1, NOW()
)
ON CONFLICT (hostname, request_path, http_method) 
DO UPDATE SET 
    call_count = sys_api_stat.call_count + 1,
    last_call_at = NOW(),
    response_status = EXCLUDED.response_status,
    ip_address = EXCLUDED.ip_address
RETURNING * ;


[HTTP In] ───┬───────────────────────────────> [Your API Logic] ───> [HTTP Response]
             │
             └─> [Function: Prep Log] ───> [SQL: Upsert Log]


// 1. Safely extract network data from Node-RED HTTP objects
const hostname = os.hostname();
const path = msg.req ? msg.req.path : (msg.topic || 'unknown-path');
const method = msg.req ? msg.req.method : 'UNKNOWN';
const ip = msg.req ? (msg.req.ip || msg.req.headers['x-forwarded-for']) : '127.0.0.1';
const statusCode = msg.res && msg.res.statusCode ? msg.res.statusCode : 200;

// 2. Format payload as an array for parameterized SQL queries (protects against SQL injection)
msg.payload = {
    "hostname": hostname,    
    "path": path,
    "method": method,
    "statusCode": statusCode,
    "ip": ip
};

return msg;
