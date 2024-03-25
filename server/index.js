const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//Middleware
app.use(cors());
app.use(express.json());

//Routes

//Create wool

app.post("/wool", async (req, res) => {
  try {
    const {
      wool_type,
      wool_color,
      wool_thickness,
      wool_stock,
      wool_ideal_stock,
      wool_price,
    } = req.body;
    const newWool = await pool.query(
      "INSERT INTO wool (wool_type, wool_color, wool_thickness, wool_stock, wool_ideal_stock, wool_price) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        wool_type,
        wool_color,
        wool_thickness,
        wool_stock,
        wool_ideal_stock,
        wool_price,
      ]
    );

    res.json(newWool.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Read all wool (join wool_type, wool_color, wool_thickness)

app.get("/wool", async (req, res) => {
  try {
    const allWool = await pool.query(
      "SELECT * FROM wool JOIN wool_type ON wool.wool_type = wool_type.wool_type_id JOIN wool_color ON wool.wool_color = wool_color.wool_color_id JOIN wool_thickness ON wool.wool_thickness = wool_thickness.wool_thickness_id"
    );
    res.json(allWool.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Read wool by id

app.get("/wool/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const wool = await pool.query(
      "SELECT * FROM wool JOIN wool_type ON wool.wool_type = wool_type.wool_type_id JOIN wool_color ON wool.wool_color = wool_color.wool_color_id JOIN wool_thickness ON wool.wool_thickness = wool_thickness.wool_thickness_id WHERE wool_id = $1",
      [id]
    );
    if (wool.rows.length === 0) {
      return res.status(404).send("Wool not found");
    }
    res.json(wool.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Update wool

app.put("/wool/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      wool_type,
      wool_color,
      wool_thickness,
      wool_stock,
      wool_ideal_stock,
      wool_price,
    } = req.body;
    const updateWool = await pool.query(
      "UPDATE wool SET wool_type = $1, wool_color = $2, wool_thickness = $3, wool_stock = $4, wool_ideal_stock = $5, wool_price = $6 WHERE wool_id = $7 RETURNING *",
      [
        wool_type,
        wool_color,
        wool_thickness,
        wool_stock,
        wool_ideal_stock,
        wool_price,
        id,
      ]
    );
    if (updateWool.rows.length === 0) {
      return res.status(404).send("Wool not found");
    }
    res.json(updateWool.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Delete wool

app.delete("/wool/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteWool = await pool.query(
      "DELETE FROM wool WHERE wool_id = $1 RETURNING *",
      [id]
    );
    if (deleteWool.rows.length === 0) {
      return res.status(404).send("Wool not found");
    }
    res.json(deleteWool.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Create wool color

app.post("/wool_color", async (req, res) => {
  try {
    const { wool_color_name } = req.body;
    const newWoolColor = await pool.query(
      "INSERT INTO wool_color (wool_color_name) VALUES($1) RETURNING *",
      [wool_color_name]
    );

    res.json(newWoolColor.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Read all wool colors

app.get("/wool_color", async (req, res) => {
  try {
    const allWoolColor = await pool.query("SELECT * FROM wool_color");
    res.json(allWoolColor.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Read wool color by id

app.get("/wool_color/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const woolColor = await pool.query(
      "SELECT * FROM wool_color WHERE wool_color_id = $1",
      [id]
    );
    if (woolColor.rows.length === 0) {
      return res.status(404).send("Wool color not found");
    }
    res.json(woolColor.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update wool color

app.put("/wool_color/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { wool_color_name } = req.body;
    const updateWoolColor = await pool.query(
      "UPDATE wool_color SET wool_color_name = $1 WHERE wool_color_id = $2 RETURNING *",
      [wool_color_name, id]
    );
    if (updateWoolColor.rows.length === 0) {
      return res.status(404).send("Wool color not found");
    }
    res.json(updateWoolColor.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete wool color

app.delete("/wool_color/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteWoolColor = await pool.query(
      "DELETE FROM wool_color WHERE wool_color_id = $1 RETURNING *",
      [id]
    );
    if (deleteWoolColor.rows.length === 0) {
      return res.status(404).send("Wool color not found");
    }
    res.json(deleteWoolColor.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Create wool type

app.post("/wool_type", async (req, res) => {
  try {
    const { wool_type_name } = req.body;
    const newWoolType = await pool.query(
      "INSERT INTO wool_type (wool_type_name) VALUES($1) RETURNING *",
      [wool_type_name]
    );

    res.json(newWoolType.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Read all wool types

app.get("/wool_type", async (req, res) => {
  try {
    const allWoolType = await pool.query("SELECT * FROM wool_type");
    res.json(allWoolType.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Read wool type by id

app.get("/wool_type/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const woolType = await pool.query(
      "SELECT * FROM wool_type WHERE wool_type_id = $1",
      [id]
    );
    if (woolType.rows.length === 0) {
      return res.status(404).send("Wool type not found");
    }
    res.json(woolType.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update wool type

app.put("/wool_type/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { wool_type_name } = req.body;
    const updateWoolType = await pool.query(
      "UPDATE wool_type SET wool_type_name = $1 WHERE wool_type_id = $2 RETURNING *",
      [wool_type_name, id]
    );
    if (updateWoolType.rows.length === 0) {
      return res.status(404).send("Wool type not found");
    }
    res.json(updateWoolType.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete wool type

app.delete("/wool_type/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteWoolType = await pool.query(
      "DELETE FROM wool_type WHERE wool_type_id = $1 RETURNING *",
      [id]
    );
    if (deleteWoolType.rows.length === 0) {
      return res.status(404).send("Wool type not found");
    }
    res.json(deleteWoolType.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Create wool thickness

app.post("/wool_thickness", async (req, res) => {
  try {
    const { wool_thickness_name } = req.body;
    const newWoolThickness = await pool.query(
      "INSERT INTO wool_thickness (wool_thickness_name) VALUES($1) RETURNING *",
      [wool_thickness_name]
    );
    res.json(newWoolThickness.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Read all wool thickness

app.get("/wool_thickness", async (req, res) => {
  try {
    const allWoolThickness = await pool.query("SELECT * FROM wool_thickness");
    res.json(allWoolThickness.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Read wool thickness by id

app.get("/wool_thickness/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const woolThickness = await pool.query(
      "SELECT * FROM wool_thickness WHERE wool_thickness_id = $1",
      [id]
    );
    if (woolThickness.rows.length === 0) {
      return res.status(404).send("Wool thickness not found");
    }
    res.json(woolThickness.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update wool thickness

app.put("/wool_thickness/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { wool_thickness_name } = req.body;
    const updateWoolThickness = await pool.query(
      "UPDATE wool_thickness SET wool_thickness_name = $1 WHERE wool_thickness_id = $2 RETURNING *",
      [wool_thickness_name, id]
    );
    if (updateWoolThickness.rows.length === 0) {
      return res.status(404).send("Wool thickness not found");
    }
    res.json(updateWoolThickness.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete wool thickness

app.delete("/wool_thickness/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteWoolThickness = await pool.query(
      "DELETE FROM wool_thickness WHERE wool_thickness_id = $1 RETURNING *",
      [id]
    );
    if (deleteWoolThickness.rowCount === 0) {
      return res.status(404).send("Wool thickness not found");
    }
    return res.json(deleteWoolThickness.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
