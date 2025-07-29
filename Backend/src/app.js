const cookieParser = require('cookie-parser');
const express = require('express')
const cors = require("cors");
const authRoutes = require('./routes/auth.routes.js')
const postRoutes = require('./routes/post.routes')

const app = express();

app.use(express.json())
app.use(cookieParser())

app.use(
    cors({
      origin: "http://localhost:5173", // frontend origin
      credentials: true, // allow cookies
    })
);

app.use("/auth",authRoutes)
app.use("/post",postRoutes)

module.exports = app;