-- DROP FUNCTION [dbo].[f_LevenshteinDistance]
CREATE  FUNCTION [dbo].[f_LevenshteinDistance](@s1 nvarchar(3999), @s2 nvarchar(3999))
    RETURNS int
    AS
    BEGIN
       DECLARE @s1_len  int;
       DECLARE @s2_len  int;
       DECLARE @i       int;
       DECLARE @j       int;
       DECLARE @s1_char nchar;
       DECLARE @c       int;
       DECLARE @c_temp  int;
       DECLARE @cv0     varbinary(8000);
       DECLARE @cv1     varbinary(8000);

       SELECT
          @s1_len = LEN(@s1),
          @s2_len = LEN(@s2),
          @cv1    = 0x0000  ,
          @j      = 1       , 
          @i      = 1       , 
          @c      = 0

       WHILE @j <= @s2_len
          SELECT @cv1 = @cv1 + CAST(@j AS binary(2)), @j = @j + 1;

          WHILE @i <= @s1_len
             BEGIN
                SELECT
                   @s1_char = SUBSTRING(@s1, @i, 1),
                   @c       = @i                   ,
                   @cv0     = CAST(@i AS binary(2)),
                   @j       = 1;

                SET @i = @i + 1;

                WHILE @j <= @s2_len
                   BEGIN
                      SET @c = @c + 1;

                      IF @j <= @i 
                         BEGIN
                            SET @c_temp = CAST(SUBSTRING(@cv1, @j + @j - 1, 2) AS int) + CASE WHEN @s1_char = SUBSTRING(@s2, @j, 1) THEN 0 ELSE 1 END;
                            IF @c > @c_temp SET @c = @c_temp
                            SET @c_temp = CAST(SUBSTRING(@cv1, @j + @j + 1, 2) AS int) + 1;
                            IF @c > @c_temp SET @c = @c_temp;
                         END;
                      SELECT @cv0 = @cv0 + CAST(@c AS binary(2)), @j = @j + 1;
                   END;
                SET @cv1 = @cv0;
          END;
       RETURN @c;
END;

SELECT
 dbo.f_LevenshteinDistance('Fuzzy String Match','fuzzy string match'),
 dbo.f_LevenshteinDistance('fuzzy','fuzy'),
 dbo.f_LevenshteinDistance('Fuzzy String Match','fuzy string match'),
 dbo.f_LevenshteinDistance('levenshtein distance sql','levenshtein sql server'),
 dbo.f_LevenshteinDistance('distance','server');
 
 
 
 