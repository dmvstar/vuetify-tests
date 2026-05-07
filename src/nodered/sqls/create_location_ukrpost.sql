-- DROP TABLE location_ukrpost
CREATE TABLE location_ukrpost (
    id BIGSERIAL PRIMARY KEY,
    region_name_ua VARCHAR(100),
    old_administrative_district VARCHAR(100),
    new_administrative_district VARCHAR(100),
    community_name_ref VARCHAR(150),
    settlement_name_pref VARCHAR(150),
    settlement_name_clear VARCHAR(150),
    street_name VARCHAR(150)
);

-- Index for filtering by Region
CREATE INDEX idx_ukrpost_region ON location_ukrpost (region_name_ua);

-- Index for filtering by New Administrative District
CREATE INDEX idx_ukrpost_new_district ON location_ukrpost (new_administrative_district);

-- Index for filtering by the Settlement name (clear version)
CREATE INDEX idx_ukrpost_settlement_clear ON location_ukrpost (settlement_name_clear);

GRANT ALL PRIVILEGES ON DATABASE dijaworks TO dbmanager;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dbmanager;
GRANT ALL PRIVILEGES ON SEQUENCE location_ukrpost_id_seq TO dbmanager;
--GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO dbmanager;

GRANT ALL PRIVILEGES ON DATABASE dijaworks TO nrlogger;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nrlogger;
GRANT ALL PRIVILEGES ON SEQUENCE location_ukrpost_id_seq TO nrlogger;
--GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO nrlogger;

-- 
SELECT * FROM  location_ukrpost
limit 100;

SELECT 	*
FROM 	location_ukrpost lu
WHERE 	1 = 1
AND lu.settlement_name_clear LIKE '%чівськ%'



