const { Router } = require("express");
const pool = require("../db");

const router = Router();

// Create wool thickness

router.post("/wool_thickness", async (req, res) => {
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

router.get("/wool_thickness", async (req, res) => {
  try {
    const allWoolThickness = await pool.query("SELECT * FROM wool_thickness");
    res.json(allWoolThickness.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Read wool thickness by id

router.get("/wool_thickness/:id", async (req, res) => {
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

router.put("/wool_thickness/:id", async (req, res) => {
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

router.delete("/wool_thickness/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteWoolThickness = await pool.query(
      "DELETE FROM wool_thickness WHERE wool_thickness_id = $1 RETURNING *",
      [id]
    );
    if (deleteWoolThickness.rowCount === 0) {
      return res.status(404).send("Wool thickness not found");
    }
    return res.status(200).json(deleteWoolThickness.rows[0]);
  } catch (err) {
    return res.status(409).json("Wool thickness is used in a product");
  }
});

// Verify if the wool thickness exists

router.get("/wool_thickness_verify", async (req, res) => {
  try {
    const { wool_thickness_name } = req.query;
    const verifyWoolThickness = await pool.query(
      "SELECT * FROM wool_thickness WHERE wool_thickness_name = $1",
      [wool_thickness_name]
    );

    res.json(verifyWoolThickness);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
