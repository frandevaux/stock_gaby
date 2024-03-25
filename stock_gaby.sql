CREATE TABLE wool_type(
    wool_type_id SERIAL PRIMARY KEY NOT NULL ,
    wool_type_name VARCHAR(255) NOT NULL
);

CREATE TABLE wool_color(
    wool_color_id SERIAL PRIMARY KEY NOT NULL ,
    wool_color_name VARCHAR(255) NOT NULL
);

CREATE TABLE wool_thickness(
    wool_thickness_id SERIAL PRIMARY KEY NOT NULL ,
    wool_thickness_name VARCHAR(255) NOT NULL
);

CREATE TABLE wool(
    wool_id SERIAL PRIMARY KEY NOT NULL ,
    wool_type_id INT NOT NULL ,
    wool_color_id INT NOT NULL ,
    wool_thickness_id INT NOT NULL ,
    wool_price FLOAT NOT NULL ,
    wool_stock INT NOT NULL ,
    wool_ideal_stock INT NOT NULL ,

    CONSTRAINT fk_wool_type
      FOREIGN KEY(wool_type_id)
        REFERENCES wool_type(wool_type_id),

    CONSTRAINT fk_wool_color
      FOREIGN KEY(wool_color_id)
        REFERENCES wool_color(wool_color_id),

    CONSTRAINT fk_wool_thickness
      FOREIGN KEY(wool_thickness_id)
        REFERENCES wool_thickness(wool_thickness_id)
);

CREATE TABLE sale(
    sale_id SERIAL PRIMARY KEY NOT NULL,
    sale_date DATE NOT NULL
);

CREATE TABLE sale_wool(
    sale_wool_id SERIAL PRIMARY KEY NOT NULL ,
    wool_id INT NOT NULL ,
    sale_id INT NOT NULL ,
    wool_amount INT NOT NULL ,

    CONSTRAINT fk_wool_id
        FOREIGN KEY(wool_id)
            REFERENCES wool(wool_id),

    CONSTRAINT fk_sale_id
        FOREIGN KEY(sale_id)
            REFERENCES sale(sale_id)
);