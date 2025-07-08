import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { middleware } from "@xzihnago/express-utils";
import "@/global";
import router from "@/router";
import routerView from "@/router/view";

const app = express();
app.set("trust proxy", 2);
app.set("view engine", "ejs");

app.use(cookieParser(env.JWT_SECRET));
app.use(express.json());
app.use(
  fileUpload({
    defParamCharset: "utf8",
  })
);

app.use(middleware.routeLogger);
app.use(middleware.responseHandler);
app.use("/api", router);
app.use("/", routerView);

app.listen(env.PORT);
