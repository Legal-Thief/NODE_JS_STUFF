import express from "express";
import path from "path";

const app = express();

const staticPath = path.join(import.meta.dirname, "public");

app.use(express.static(staticPath));

app.use(express.urlencoded({ extended: true }));

app.get("/contact",(req,res)=>{
    console.log(req.query);
    res.redirect("/")
})

app.post("/contact",(req,res)=>{
    console.log(req.body)
    res.redirect("/")
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});