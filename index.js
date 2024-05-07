const express = require("express");
const cors = require("cors");

const app = express();

const corsOption = {
  origin: "*",
};

//register cors middleware
app.use(cors(corsOption));
app.use(express.json());

//create routes
app.get("/", (req, res) => {
  res.json({ message: "Hallo" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server Started in Port ${PORT}`));
