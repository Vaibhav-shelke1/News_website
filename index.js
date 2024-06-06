import bodyParser from "body-parser";
import express from "express"
import moment from "moment";
import newsRouter from "./routes/news.js"

const app=express();
const port=3000;

app.locals.moment=moment;

app.use(express.static("public"));
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use("/",newsRouter);

app.listen(port,()=>{
    console.log(`Server is running on Port ${port}.`);
});