import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js"
import blogRouter from "./routes/blog.routes.js"
import likeRouter from "./routes/like.routes.js"
import bookmarkRouter from "./routes/bookmark.routes.js"
import commentRouter from "./routes/comment.routes.js"

const app = express();

// CONFIGURATION FOR BACK-END and FRONT-END CONNECTION
app.use(cors({origin : process.env.CORS_ORIGIN , credentials : true}));

// INSTEAD OF USING BODY_PARSER  
app.use(express.json({limit : "16kb"}));

// FOR URL ENCODING
app.use(express.urlencoded({extended : true , limit : "16kb"}));

// FOR STATIC FILES (ex: PDF's , images , favicon etc.)
app.use(express.static("public"));

// FOR APPLING C.U.R.D OPERATIONS IN BROWSER's COOKIE
app.use(cookieParser());


app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/bookmark", bookmarkRouter);
app.use("/api/v1/comment", commentRouter);


export {app}