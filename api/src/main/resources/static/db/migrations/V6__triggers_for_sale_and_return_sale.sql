CREATE TRIGGER saleCreated
BEFORE INSERT ON sale
FOR EACH ROW
    BEGIN
        SET NEW.created = NOW();
    END;

CREATE TRIGGER saleUpdated
BEFORE UPDATE ON sale
FOR EACH ROW
    BEGIN
        SET NEW.updated = NOW();
    END;

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