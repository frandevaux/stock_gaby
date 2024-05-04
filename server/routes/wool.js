const { Router } = require("express");
const pool = require("../db");

const router = Router();
//Create wool

router.post("/wool", async (req, res) => {
  try {
    const {
      wool_type_id,
      wool_color_id,
      wool_thickness_id,
      wool_stock,
      wool_ideal_stock,
      wool_price,
    } = req.body;
    const newWool = await pool.query(
      "INSERT INTO wool (wool_type_id, wool_color_id, wool_thickness_id, wool_stock, wool_ideal_stock, wool_price) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        wool_type_id,
        wool_color_id,
        wool_thickness_id,
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

//Read all wool

router.get("/wool", async (req, res) => {
  try {
    const allWool = await pool.query(
      "SELECT * FROM wool JOIN wool_type ON wool.wool_type_id = wool_type.wool_type_id JOIN wool_color ON wool.wool_color_id = wool_color.wool_color_id JOIN wool_thickness ON wool.wool_thickness_id = wool_thickness.wool_thickness_id ORDER BY wool.wool_type_id ASC"
    );
    res.json(allWool.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Read wool by id (filter first, then join)

router.get("/wool/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const wool = await pool.query(
      "SELECT * FROM wool JOIN wool_type ON wool.wool_type_id = wool_type.wool_type_id JOIN wool_color ON wool.wool_color_id = wool_color.wool_color_id JOIN wool_thickness ON wool.wool_thickness_id = wool_thickness.wool_thickness_id WHERE wool_id = $1",
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

router.put("/wool/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      wool_type_id,
      wool_color_id,
      wool_thickness_id,
      wool_stock,
      wool_ideal_stock,
      wool_price,
    } = req.body;
    const updateWool = await pool.query(
      "UPDATE wool SET wool_type_id = $1, wool_color_id = $2, wool_thickness_id = $3, wool_stock = $4, wool_ideal_stock = $5, wool_price = $6 WHERE wool_id = $7 RETURNING *",
      [
        wool_type_id,
        wool_color_id,
        wool_thickness_id,
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

router.delete("/wool/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteWool = await pool.query(
      "DELETE FROM wool WHERE wool_id = $1 RETURNING *",
      [id]
    );
    if (deleteWool.rows.length === 0) {
      return res.status(404).send("Wool not found");
    }
    res.status(200).json(deleteWool.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Verify if wool exists

router.get("/wool_verify", async (req, res) => {
  try {
    const { wool_type_id, wool_color_id, wool_thickness_id } = req.query;
    const verifyWool = await pool.query(
      "SELECT * FROM wool WHERE wool_type_id = $1 AND wool_color_id = $2 AND wool_thickness_id = $3",
      [wool_type_id, wool_color_id, wool_thickness_id]
    );

    res.json(verifyWool);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
