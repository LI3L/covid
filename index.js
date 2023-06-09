import express from "express";
import action from "./action.js";

const app = express();


app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use("/api",action);

const port=3003;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});