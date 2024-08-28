import express from "express";
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/message.js'
import dotenv from 'dotenv';
import coookieParser from 'cookie-parser';
import { app, server } from "./socket/socket.js";
import cors from 'cors';




dotenv.config();

const PORT = process.env.PORT || 3000;


app.use(coookieParser())

app.use(express.json())

app.use(cors({origin: '*', credentials: true}))


app.get('/', (req, res)=>{
    res.send('Backend works')
});

app.use('/api/auth', authRoutes);

app.use('/api/messages', messageRoutes);

server.listen(PORT, ()=>{
    console.log('Server running');
});