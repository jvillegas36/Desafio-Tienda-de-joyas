import express, { json } from 'express'
import cors from 'cors'
import 'dotenv/config'

import joyasRouter from "./routers/inventario.router.js"
import {joyasLog} from './middleware/joyas.middleware.js'

const PORT = process.env.PORT || 5000;
const app =express();

app.use(express.json());
app.use(cors());
app.use(joyasLog)

app.use('/joyas', joyasRouter)

app.listen(PORT, console.log(`server on http://localhost:${PORT}`))