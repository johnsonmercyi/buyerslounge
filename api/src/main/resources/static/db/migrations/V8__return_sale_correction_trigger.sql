CREATE TRIGGER returnSaleCreated
BEFORE INSERT ON return_sale
FOR EACH ROW
    BEGIN
        SET NEW.created = NOW();
    END;

CREATE TRIGGER returnSaleUpdated
BEFORE UPDATE ON return_sale
FOR EACH ROW
    BEGIN
        SET NEW.updated = NOW();
    END;