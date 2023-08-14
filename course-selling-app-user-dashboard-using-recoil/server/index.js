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
mongoose.connect('mongodb+srv://snehaljaiswal2212:rwnAWKhrSYweu59q@cluster0.da8qxz7.mongodb.net/courses', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

app.listen(3000, () => {console.log('listening to port 3000')})