CREATE TRIGGER productInventoryCreated
BEFORE INSERT ON product_inventory
FOR EACH ROW
    BEGIN
        SET NEW.created = NOW();
    END;

CREATE TRIGGER productInventoryUpdated
BEFORE UPDATE ON product_inventory
FOR EACH ROW
    BEGIN
        SET NEW.updated = NOW();
    END;