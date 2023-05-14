require("dotenv/config");
require("express-async-errors");

const express = require("express");
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.SERVER_PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
