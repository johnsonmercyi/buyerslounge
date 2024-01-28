CREATE TRIGGER sellerCreated
BEFORE INSERT ON seller
FOR EACH ROW
    BEGIN
        SET NEW.created = NOW();
    END;

CREATE TRIGGER sellerUpdated
BEFORE UPDATE ON seller
FOR EACH ROW
    BEGIN
        SET NEW.updated = NOW();
    END;