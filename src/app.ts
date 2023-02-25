import createError, { HttpError } from "http-errors";
import debugLogger from "debug";
import express, { Application, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import stylus from "stylus";
import indexRouter from "@routes/index";
import usersRouter from "@routes/users";


const debug = debugLogger("express-typescript-starter-template:[app.ts");

const app: Application = express();

// set app environment
app.set('env', 'development');

// view engine setup
app.set("views", path.join(__dirname, "./app/views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request | any, res: Response | any, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
