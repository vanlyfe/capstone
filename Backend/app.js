const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

//Routes declared here
const authRoutes = require("./routes/auth")
const listingRoutes = require("./routes/listings")
const orderRoutes = require("./routes/orders")
const ratingRoutes = require("./routes/ratings")
const reviewRoutes = require("./routes/reviews")
const indexRoutes = require("./routes/index")


const config = require("./config");
const security = require("./middleware/security");

const { NotFoundError } = require("./utils/errors");
const app = express();

app.use(cors());

app.use(fileUpload());

app.use(express.json());

app.use(morgan("tiny"));

app.use(security.extractUserFromJwt);

app.use("/auth", authRoutes)
app.use("/listing", listingRoutes)
app.use("/rating", ratingRoutes)
app.use("/review", reviewRoutes)
app.use("/order", orderRoutes)
app.use("/index", indexRoutes)


app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  });
});

app.use((req,res,next) =>{
    return next(new NotFoundError())
})

app.use((err,req,res,next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error: {message,status},
    })
})


module.exports = app
