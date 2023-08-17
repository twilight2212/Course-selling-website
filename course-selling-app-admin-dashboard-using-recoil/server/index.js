const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRoute = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/users", userRoute);

//connect to mongodb
//PLEASE DON'T MISUSE & REPLACE IT WITH YOUR OWN URL
mongoose.connect('mongodb://localhost:27017/courses', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });
app.listen(3000, () => {console.log('listening to port 3000')})
