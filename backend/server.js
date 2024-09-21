import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import path from "path";

import productrouter from './routes/product.route.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products", productrouter);

if(process.env.NODE_ENV !== 'production'){
    app.use(express.static(path.join(__dirname , "/frontend/dist")));
    app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}


app.listen(PORT, () => {
    connectDB();
    console.log("server start at port 5000");
    
})
