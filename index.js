import express from 'express'
const app = express()
import dotenv from 'dotenv'
import connection from './config/db.ts'
import blogRoutes from "./routes/blogRoutes.ts"; 
import userRoutes from './routes/userRoutes.ts'

dotenv.config()
connection()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT

app.use('/blog',blogRoutes)
app.use('/user',userRoutes)


app.listen(port,()=>{
    console.log(`server running on the port: ${port}`);
    
})

