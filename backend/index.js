import express from "express";
import dotenv from "dotenv";
import { connect } from "./database/connect.js";
dotenv.config();
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to OnlyBumFans!');
});
app.listen(port,() => {
    connect();
    console.log(`listening on port ${port}`);
});