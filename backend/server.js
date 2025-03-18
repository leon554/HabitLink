const express = require("express")
const mongoose = require('mongoose')
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")
const cors = require("cors");

const app = express()
app.use(cors({
  origin: "*"
}));
app.use(express.json())
mongoose.connect(process.env.MONGO_URI)
app.use("/auth", authRoutes)
app.use("/api", userRoutes)
//app.post()


app.listen(process.env.PORT, () =>  {
  console.log("Server is running on " + process.env.PORT)
})