const express = require('express')
const restaurantRoutes = require('./routes/restaurant')
const locationRoutes = require('./routes/location')
const mealtypeRoutes = require('./routes/mealtype')
const paymentRoutes = require('./routes/payment')
const userRoutes = require('./routes/userDetails')
const menuRouter = require('./routes/menu')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = process.env.PORT || 9100;
const DBSTRING = "mongodb+srv://root:root@zomatoclone.yx2cl.mongodb.net/zomato";

mongoose.connect(DBSTRING, () => {
    console.log("mongoDB connected")
}, e =>
    console.log("error occurred while connecting to DB:", e));

let app = express();

// middleWares
app.use(cors());
app.use(bodyParser.json());
app.use('/restaurants', restaurantRoutes);
app.use('/location', locationRoutes);
app.use('/mealtype', mealtypeRoutes);
app.use('/menu', menuRouter);
app.use('/payment', paymentRoutes)
app.use('/userData',userRoutes)


//heroku configurations:
if (process.env.NODE_ENV = "production") {
    app.use(express.static("Frontend/build"));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"));
    })
}

app.listen(PORT, () => {
    console.log(`the server is running on port : ${PORT}`)
})