// index.js
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./routes/index");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173", // Adjust to the frontend URL if different
    credentials: true // Allow credentials (cookies) to be included
}));

app.use("/", router);

app.listen("3000", () => {
    console.log(`Server is running on port 3000`);
});
