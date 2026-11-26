import app from "./app.ts";
import dotenv from "dotenv";

dotenv.config();

app.listen(process.env.PORT,()=>{
    console.log("A szerver fut")
})