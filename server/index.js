const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//Middleware

app.use(cors());
app.use(express.json());

//Routes

app.use("/", require("./routes/wool_type"));
app.use("/", require("./routes/wool_color"));
app.use("/", require("./routes/wool_thickness"));
app.use("/", require("./routes/wool"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
