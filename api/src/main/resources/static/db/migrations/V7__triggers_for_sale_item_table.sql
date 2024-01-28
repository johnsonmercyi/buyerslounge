CREATE TRIGGER saleItemCreated
BEFORE INSERT ON sale_item
FOR EACH ROW
    BEGIN
        SET NEW.created = NOW();
    END;

CREATE TRIGGER saleItemUpdated
BEFORE UPDATE ON sale_item
FOR EACH ROW
    BEGIN
        SET NEW.updated = NOW();
    END;