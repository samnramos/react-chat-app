import express from "express";
const app = express(); 

app.get("/", (req, res) => {
    res.send("Pokemon Trivia"); 
});

app.get("/new", (req, res) => {
    
});