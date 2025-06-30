
/*
select * 
l.payload.*
from aswplogger l
where 1=1 
and l.date > '2025-06-27'
and l.date < '2025-06-28'
and l.source LIKE '%order set IN%'
*/

/*
SELECT  
	a.date
	, a.payload -> 'order' -> 'externalId' AS externalId
FROM aswplogger a 
WHERE 1=1
AND a.date > '2025-06-27' 
AND a.SOURCE LIKE '%order set IN%'
ORDER BY ID DESC
LIMIT 30
*/

SELECT  
	a.date
	, a.SOURCE
	, a.payload -> 'order' -> 'externalId' AS externalId
	, a.payload -> 'order' -> 'clientId' AS clientId
	, a.payload -> 'order' -> 'accountId' AS accountId
FROM aswplogger a 
WHERE 1=1
AND a.date > '2025-06-27' 
AND a.SOURCE LIKE '%order set IN%'
ORDER BY ID DESC
LIMIT 3000


SELECT  
	a.date
	, a.SOURCE
	, a.payload 
FROM aswplogger a 
WHERE 1=1
AND a.date > '2025-06-27' 
AND a.date < '2025-06-28'
AND a.SOURCE LIKE '%order set OUT%'
--ORDER BY ID DESC
LIMIT 300

