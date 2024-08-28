import express from "express";
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/message.js'
import dotenv from 'dotenv';
import coookieParser from 'cookie-parser';
import { app, server } from "./socket/socket.js";
import cors from 'cors';
import path from 'path';




dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();


app.use(coookieParser())

app.use(express.json())

app.use(cors({origin: '*', credentials: true}))


app.get('/', (req, res)=>{
    res.send('Backend works')
});

app.use('/api/auth', authRoutes);

app.use('/api/messages', messageRoutes);

if (process.env.NODE_ENV !== "development") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    })
}

server.listen(PORT, ()=>{
    console.log('Server running');
});