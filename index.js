const express = require("express");
const cors = require("cors");
const db = require("./app/models");

const app = express();

const corsOption = {
  origin: "*",
};

//register cors middleware
app.use(cors(corsOption));
app.use(express.json());

//connection to db
// const mongooseConfig = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

db.mongoose
  //   .connect(db.url, mongooseConfig)
  .connect(db.url)
  .then(() => {
    console.log("Database Conection Success");
  })
  .catch((err) => {
    console.log(`Failed conection, ${err.message}`);
    process.exit();
  });

//call routes
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server Started in Port ${PORT}`));
