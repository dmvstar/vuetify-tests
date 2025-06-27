select * 
l.payload.*
from aswplogger l
where 1=1 
and l.date > '2025-06-27'
and l.date < '2025-06-28'
and l.source LIKE '%order set IN%'
