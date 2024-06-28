CREATE TRIGGER imagesCreated
BEFORE INSERT ON images
FOR EACH ROW
    BEGIN
        SET NEW.created = NOW();
    END;

CREATE TRIGGER imagesUpdated
BEFORE UPDATE ON images
FOR EACH ROW
    BEGIN
        SET NEW.updated = NOW();
    END;