SELECT 
    CONTENT_BODY::JSONB -> 'data' -> 'data'-> 'reidentInformation' -> 'reidentRejectCount' AS reidentRejectCount
    , CONTENT_BODY::JSONB -> 'data' -> 'data'-> 'reidentInformation' -> 'reidentRejectBlock' AS reidentRejectBlock
    , id, CREATED , uuid
FROM public.sys_api_logs
WHERE 1=1 
    AND PROCESS_NAME = 'REIDENT_BLOCK' 
    AND API_METHOD = 'PATCH'
    AND PROCESS_STEP = 'END'
    AND CONTENT_BODY::JSONB -> 'data' -> 'data'-> 'reidentInformation' -> 'reidentRejectCount' is not NULL   
--    AND CONTENT_BODY::text LIKE '%3721340%'
ORDER BY 1 DESC

--LIMIT 20;