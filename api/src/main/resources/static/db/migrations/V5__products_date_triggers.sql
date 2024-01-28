CREATE TRIGGER productCreated
BEFORE INSERT ON product
FOR EACH ROW
    BEGIN
        SET NEW.created = NOW();
    END;

CREATE TRIGGER productUpdated
BEFORE UPDATE ON product
FOR EACH ROW
    BEGIN
        SET NEW.updated = NOW();
    END;