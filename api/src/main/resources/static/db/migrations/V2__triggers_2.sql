# Create TRIGGERS
CREATE TRIGGER customerCreated
BEFORE INSERT ON customer
FOR EACH ROW
    BEGIN
        SET NEW.created = NOW();
    END;

CREATE TRIGGER customerUpdated
BEFORE UPDATE ON customer
FOR EACH ROW
    BEGIN
        SET NEW.updated = NOW();
    END;

CREATE TRIGGER userCreated
BEFORE INSERT ON user
FOR EACH ROW
    BEGIN
        SET NEW.created = NOW();
    END;

CREATE TRIGGER userUpdated
BEFORE UPDATE ON user
FOR EACH ROW
    BEGIN
        SET NEW.updated = NOW();
    END;

CREATE TRIGGER roleCreated
BEFORE INSERT ON role
FOR EACH ROW
    BEGIN
        SET NEW.created = NOW();
    END;

CREATE TRIGGER roleUpdated
BEFORE UPDATE ON role
FOR EACH ROW
    BEGIN
        SET NEW.updated = NOW();
    END;

CREATE TRIGGER user_rolesCreated
BEFORE INSERT ON user_roles
FOR EACH ROW
    BEGIN
        SET NEW.created = NOW();
    END;

CREATE TRIGGER user_rolesUpdated
BEFORE UPDATE ON user_roles
FOR EACH ROW
    BEGIN
        SET NEW.updated = NOW();
    END;