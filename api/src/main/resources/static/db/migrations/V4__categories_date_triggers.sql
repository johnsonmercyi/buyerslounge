CREATE TRIGGER categoryCreated
BEFORE INSERT ON category
FOR EACH ROW
    BEGIN
        SET NEW.created = NOW();
    END;

CREATE TRIGGER categoryUpdated
BEFORE UPDATE ON category
FOR EACH ROW
    BEGIN
        SET NEW.updated = NOW();
    END;