const express = require("express");

//cors is cross origin resource sharing which allow us to communicate with other servers
const cors = require("cors");

//importing mongoose for database
const mongoose = require("mongoose");

//imported functions created for this application
const { signup, login } = require("./controllers/authControllers");
const { transfer } = require("./controllers/transferControllers");
const {
  balance,
  deposit,
  withdraw,
} = require("./controllers/servicesControllers");
const { profile } = require("./controllers/profileControllers");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//connection to database
// mongoose.connect("mongodb://localhost:27017/bankdb");
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB Atlas");
    })
    .catch(err => {
        console.error(err);
    });


app.post("/api/signup", signup);
app.post("/api/login", login);
app.post("/api/transfer", transfer);
app.post("/api/deposit", deposit);
app.post("/api/withdraw", withdraw);
app.post("/api/balance", balance);
app.post("/api/profile", profile);

app.listen(process.env.PORT, () => {
  console.log(`Server started successfully on port ${process.env.PORT}`);
});
