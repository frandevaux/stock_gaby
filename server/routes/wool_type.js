const { Router } = require("express");
const pool = require("../db");

const router = Router();

// Create wool type

router.post("/wool_type", async (req, res) => {
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

router.get("/wool_type", async (req, res) => {
  try {
    const allWoolType = await pool.query("SELECT * FROM wool_type");
    res.json(allWoolType.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Read wool type by id

router.get("/wool_type/:id", async (req, res) => {
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

router.put("/wool_type/:id", async (req, res) => {
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

router.delete("/wool_type/:id", async (req, res) => {
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
    return res.status(409).send("Wool type is used in a product");
  }
});

// Verify if wool type exists

router.get("/wool_type_verify", async (req, res) => {
  try {
    const { wool_type_name } = req.query;
    const verifyWoolType = await pool.query(
      "SELECT * FROM wool_type WHERE wool_type_name = $1",
      [wool_type_name]
    );
    res.json(verifyWoolType);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
