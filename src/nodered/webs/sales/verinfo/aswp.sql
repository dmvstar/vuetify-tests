SELECT *FROM decsaccepts d 
ORDER BY id DESC
LIMIT 10;

alter table aswpvarvalues alter column value type character varying(2048);


SELECT * FROM aswplogger a 
WHERE 1=1
AND a.reqid = '76572710'
ORDER BY date 

SELECT * FROM aswplogger a 
WHERE 1=1
ORDER BY id DESC
LIMIT 10;


UPDATE decsaccepts 
SET status = 3, debtstate = 92
WHERE id IN (3460,3459)

ALTER TABLE public.aswplogger ADD sessionid int8 NULL;
ALTER TABLE public.aswplogger ADD acceptid int8 NULL;




SELECT *FROM decsaccepts d
WHERE d.sessionid = 690
ORDER BY id DESC
LIMIT 10;



 
SELECT * FROM aswplogger a 
WHERE 1=1
AND date > '2023-10-27 08:00:00'
AND a.source LIKE '%limit%'
--AND a.payload::text LIKE '%23459837798%'
--AND a.reqid = '76572710'
ORDER BY date 



-- public.decsattachments definition
-- Drop table
-- DROP TABLE public.decsattachments;
CREATE TABLE public.decsattachments (
	id bigserial NOT NULL,
	date timestamp NOT NULL DEFAULT now(),
	decs_id int8 NOT NULL,
	request_id int8 NOT NULL,
	kind varchar(64) NOT NULL,
	content text NOT NULL
);
-- public.decsattachments foreign keys
/*
ALTER TABLE public.decsattachments ADD CONSTRAINT fk_da_acceptid FOREIGN KEY (decs_id) REFERENCES public.decsaccepts(id);
ALTER TABLE public.aswprequests ADD reqid varchar(32) NULL;
*/

-- RET /api/aswp/db/decs/accept/result
UPDATE decsAccepts
SET 
      result = 3
    
    , resmess = 'АВТО Сообщение о выполнении'
    , resdate = '2024-02-22'
    
WHERE id IN (3971)
RETURNING id;

SELECT RESULT,* FROM decsaccepts a
WHERE 1=1
--AND id = 3970
AND a.sessionid = 732



SELECT * FROM decsattachments d 
ORDER BY id DESC 
LIMIT 50;


SELECT * FROM decsattachments 
WHERE 1=1 
AND decs_id = '4050'
AND kind = 'decContentPdf'
LIMIT 200;


SELECT * FROM decsattachments 
WHERE 1=1 
AND decs_id = '4052'
AND kind = 'decContentPdf'
LIMIT 200;

SELECT 
    content decscontent
FROM decsattachments 
WHERE 1=1 
AND decs_id = '4052'
AND kind = 'decContentPdf'
LIMIT 200;

--------------------------------------------------
SELECT 
	DISTINCT(sessionid) AS sessionid
    , (SELECT count(sessionid) FROM decsAccepts WHERE sessionid = d.sessionid) AS count
    , to_char(
      (SELECT MAX(date) FROM decsAccepts WHERE sessionid = d.sessionid)
      ,'DD.MM.YYYY HH24:MM:SS')  AS date
FROM decsAccepts d
WHERE 1=1
AND sessionid IS NOT NULL
AND archived = 0
ORDER BY sessionid DESC;
--------------------------------------------------
SELECT * FROM aswppackets a 
ORDER BY id DESC;
--------------------------------------------------

ALTER TABLE public.aswppackets ADD archived int DEFAULT 0 NOT NULL;



--drop table decscliinfo; 
CREATE TABLE decscliinfo (
	id bigserial NOT NULL,
	date timestamp DEFAULT NOW() NOT NULL,
	decs_id bigint NOT NULL,
	scrooge_id bigint NULL,
	webbank_id bigint NULL,
	CONSTRAINT decscliinfo_decsaccepts_fk FOREIGN KEY (decs_id) REFERENCES public.decsaccepts(id)
	, CONSTRAINT decs_id UNIQUE (decs_id, scrooge_id, webbank_id)
);
COMMENT ON TABLE public.decscliinfo IS 'Scrooge Cli info for decs';




SELECT * FROM decscliinfo;
DELETE FROM decscliinfo WHERE id = 6;

SELECT * 
FROM decscliinfo 
WHERE decs_id = 4118;




SELECT * 
FROM decsAccepts d
WHERE 1=1
ORDER BY id DESC
LIMIT 20;

SELECT * 
FROM decsaccounts d 
WHERE 1=1
ORDER BY id DESC
LIMIT 20;

SELECT * FROM aswplogger a 
WHERE 1=1
AND a.date > '2024-10-23' 
AND a.payload :: TEXT LIKE  '%26791560366%'
--AND a.SOURCE LIKE '%order set OUT%'
ORDER BY ID DESC
LIMIT 30

--AND a.message LIKE '%orderN%'
--AND a.payload::text LIKE '%25364080200%'

NR_25364080200

AND a.payload::text LIKE '%25560311169%'
 


SELECT date,payload FROM aswplogger a 
WHERE 1=1
--AND LEVEL = 'ERROR'
AND SOURCE LIKE '(DEV) ASWP order set OUT'
ORDER BY id DESC
LIMIT 100;





SELECT * 
FROM decsAccepts d
WHERE 1=1
AND id = 5619 
ORDER BY id DESC
LIMIT 20;



INSERT INTO public.aswproles
(code, "name", comm, status)
VALUES( 'S', 'Обработка счетов', 'Оператор, обработка счетов', 1);



SELECT * FROM aswplogger a 
WHERE 1=1
AND a.date > '2025-06-27' 
--AND a.payload :: TEXT LIKE  '%26791560366%'
AND a.SOURCE LIKE '%order set IN%'
ORDER BY ID DESC
LIMIT 30




{"order": {"info": null, "kind": 2, "params": [{"code": "ExecName", "value": "Самбірський відділ державної виконавчої служби у Самбірському районі Львівської області Західного міжрегіонального управління Міністерства юстиції Звір Ірина Михайлівна"}, {"code": "ExecCode", "value": "68699849"}, {"code": "ExecNum", "value": "21186"}, {"code": "ExecDate", "kind": "date", "value": "2025-06-27T12:12:45Z"}, {"code": "ExecArrest", "kind": "flag", "value": 1}], "account": null, "clientId": "4354193", "execInfo": "АА Пост-а Самбірський ВДВС у Самбірському районі Львівської області Західного міжрегіонального управління Міністерства юстиції Звір Ірина Михайлівна про арешт коштів боржника від 27.06.2025 (ВП № 68699849).", "reserved": 16606.63, "userCode": null, "accountId": null, "externalId": "NR_29154759362", "properties": ["Use9", "AddNew"], "codeClosing": null, "currencyTag": "", "accountPoint": [{"account": "26201111793999.100101.980", "accountId": 71823427, "currencyTag": ""}], "confirmState": "Active", "decisionCode": "68699849", "decisionDate": "2025-06-27T12:15:09.597Z", "externalSystemId": 8001, "externalSystemCode": "NR_ASWP"}, "morderMode": "CLI"}



