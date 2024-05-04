const { Router } = require("express");
const pool = require("../db");

const router = Router();

// Create wool color

router.post("/wool_color", async (req, res) => {
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

router.get("/wool_color", async (req, res) => {
  try {
    const allWoolColor = await pool.query("SELECT * FROM wool_color");
    res.json(allWoolColor.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Read wool color by id

router.get("/wool_color/:id", async (req, res) => {
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

router.put("/wool_color/:id", async (req, res) => {
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

router.delete("/wool_color/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteWoolColor = await pool.query(
      "DELETE FROM wool_color WHERE wool_color_id = $1 RETURNING *",
      [id]
    );
    if (deleteWoolColor.rows.length === 0) {
      return res.status(404).send("Wool color not found");
    }
    return res.status(200).json(deleteWoolColor.rows[0]);
  } catch (err) {
    return res.status(409).json("Wool color is used in a product");
  }
});

// Verify if the wool color exists

router.get("/wool_color_verify", async (req, res) => {
  try {
    const { wool_color_name } = req.query;
    const verifyWoolColor = await pool.query(
      "SELECT * FROM wool_color WHERE wool_color_name = $1",
      [wool_color_name]
    );
    res.json(verifyWoolColor);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
