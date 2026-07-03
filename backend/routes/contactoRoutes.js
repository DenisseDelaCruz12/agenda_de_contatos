import express from 'express';
import { 
    crearContacto, 
    mostrarContactos, 
    editarContacto, 
    eliminarContacto,
    agregarLlamada,
    editarLlamada 
} from '../controllers/contactoController.js'


const router = express.Router();



router.get('/', mostrarContactos);

router.post('/', crearContacto);

router.put('/:id', editarContacto);

router.delete('/:id', eliminarContacto);

// Rutas de llamadas

router.post("/:id/llamadas", agregarLlamada);

router.put("/:id/llamadas/:llamadaId", editarLlamada);






export default router;