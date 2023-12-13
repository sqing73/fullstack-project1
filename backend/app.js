const express = require("express");
const connectDb = require("./db");
const userRouter = require("./routers/user");
const productRouter = require("./routers/product");
const authRouter = require("./routers/auth");

const app = express();

const errorHandleMiddleware = require("./middlewares/errorHandler");

connectDb();

require("dotenv").config();
const port = process.env.PORT;

app.use(express.json());

//routers
app.set("base", "/api");
app.use(app.get("base") + '/auth', authRouter);
app.use(app.get("base") + '/user', userRouter);
app.use(app.get("base") + '/product', productRouter);

app.use(errorHandleMiddleware);

app.listen(port, () => {
  console.log(`Product management app listening at http://localhost:${port}`);
});
