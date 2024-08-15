import express from "express";
import dotenv from "dotenv";
import { connect } from "./database/connect.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.listen(port,() => {
    connect();
    console.log(`listening on port ${port}`);
});