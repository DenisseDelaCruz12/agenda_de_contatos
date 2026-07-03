import express from 'express';
import mongoose from 'mongoose';
import contactoRoutes from './routes/contactoRoutes.js';
import cors from "cors";

const app = express();
const port = 3000;

//rutas
// app.get('/',(req, res) => {
//     res.send('Klk')
// })
app.use(cors());
app.use(express.json());

app.use('/contactos', contactoRoutes);

export const conexionDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb://denissedelacruz12:8098856048@mongo.ia3x.com:27017/denissedelacruz12_proyecto_final?authSource=admin");
        console.log(`Base de datos conectada: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error conectando la base de datos: ${error.message}`);
        process.exit(1);
    }
};

conexionDB();

//middleware
app.listen(port, () => {
    console.log(`Esta app esta corriendo en el puerto ${port}`)
})