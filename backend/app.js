const express = require("express");
const connectDb = require("./db");
const userRouter = require("./routers/user");
const productRouter = require("./routers/product");
const authRouter = require("./routers/auth");
const errorHandleMiddleware = require("./middlewares/errorHandler");

const app = express();

connectDb();

require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.json());

//routers
app.set("base", "/api");
app.use(app.get("base"), authRouter);
app.use(app.get("base") + '/user', userRouter);
app.use(app.get("base") + '/product', productRouter);

app.use(errorHandleMiddleware);

app.use((req, res) => {
    res.status(404).json({message: 'Path not found'});
});

app.listen(port, () => {
  console.log(`Product management app listening at http://localhost:${port}`);
});
