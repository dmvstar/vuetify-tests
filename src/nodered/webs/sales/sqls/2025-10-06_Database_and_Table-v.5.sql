/*
DROP TABLE IF EXISTS public.semaphores;
CREATE TABLE IF NOT EXISTS public.semaphores
(
    id bigserial NOT NULL,
    dateCreated timestamp with time zone NOT NULL DEFAULT now(),
    dateModified timestamp with time zone NOT NULL DEFAULT now(),
    code character varying(32)  NOT NULL UNIQUE,
    ident character varying(64) NOT NULL DEFAULT '',
    isbusy boolean NOT NULL DEFAULT FALSE,
    CONSTRAINT semaphores_pkey PRIMARY KEY (id)
);
CREATE TRIGGER trg_semaphores_dateModified
BEFORE UPDATE ON semaphores
FOR EACH ROW
EXECUTE FUNCTION set_date_modified();
*/

INSERT INTO public.semaphores(code, ident, isbusy)
	VALUES 
	('CARDCREDO.MAIN', '', false),
	('MKPSEP.DIGITAL', '', false),
	('MKPSEP.SCROOGE', '', false);


SELECT * FROM public.semaphores;

UPDATE public.semaphores
SET isbusy = TRUE,
ident = '7895b1d7-5d03-4e24-ba67-0b698ff8c365'
WHERE 1=1 
AND code = 'MKSEP.DIGITAL'
--AND ident = '7895b1d7-5d03-4e24-ba67-0b698ff8c365'
AND isbusy = FALSE
RETURNING *;

UPDATE public.semaphores
SET isbusy = FALSE,
ident = '7895b1d7-5d03-4e24-ba67-0b698ff8c365'
WHERE 1=1 
AND code = 'MKSEP.DIGITAL'
--AND ident = '7895b1d7-5d03-4e24-ba67-0b698ff8c365'
AND isbusy = TRUE
RETURNING *;



