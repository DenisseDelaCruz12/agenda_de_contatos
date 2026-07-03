import Contacto from '../models/Contacto.js'

export const crearContacto = async (req, res) => {
    const {nombre, 
        apellido, 
        correo, 
        tipoSangre, 
        cedula, 
        fechaNacimiento} = req.body;

    if(!nombre || !apellido || !correo || !tipoSangre || !cedula || !fechaNacimiento){
        return res.status(400).json({message: 'Por favor, llenar todos los campos'})
    }

    try {
        const contactoYaExiste = await Contacto.findOne({ $or: [{cedula}, {correo}] });

        if(contactoYaExiste){
            return res.status(400).json({message: 'Ya existe un usuario con esta cedula o correo.'})
        }

        const nuevoContacto = new Contacto({
            nombre,
            apellido,
            correo, 
            tipoSangre,
            cedula,
            fechaNacimiento
        });

        await nuevoContacto.save();

        return res.status(201).json({
            message: 'Contacto creado con exito!'
        });
 

    } catch (error) {
        console.error('Error creando nuevo contacto:', error);
        return res.status(500).json({message: 'Error intentado crear un nuevo contacto.'})
    }

}

export const mostrarContactos = async (req, res) =>{

    try {
    
        const todosLosContactos = await Contacto.find({})

        if(!todosLosContactos || todosLosContactos === 0){
            console.log('No hay contactos');
            return res.status(200).json({
                message: "No hay contactos registrados", 
                todosLosContactos: []});
        }

        return res.status(200).json({
            message: 'Todos los contactos obtenidos con exito',
            count: todosLosContactos.length,
            todosLosContactos
        });

    } catch (error) {
        console.error('Error mostrando todos los contactos', error)
        return res.status(500).json({message: 'Ha ocurrido un error mostrando todos los contactos.'})
        
    }

}

export const editarContacto = async (req, res) => {
    const {id} = req.params;
    const {nombre,
        apellido,
        correo,
        tipoSangre,
        cedula,
        fechaNacimiento
    } = req.body;

    try {
        const contactoActualizado = await Contacto.findByIdAndUpdate(
            id,
            {nombre, apellido, correo, tipoSangre, cedula, fechaNacimiento},
            {new: true, runValidators: true}
        );

        if(!contactoActualizado) {
            console.log('Contacto no encontrado.')
            return res.status(404).json({
                message: 'Contacto no encontrado.'
            });
        }

        return res.status(200).json({
            message: 'Contacto actualizado con exito!',
            contacto: contactoActualizado
        })
    } catch (error) {
        console.log('Error actualizando el contacto...', error)
        return res.status(500).json({
            message: 'Error actualizando el contacto.'
        });
    }
};

export const eliminarContacto = async (req, res) => {

    const { id } = req.params;

    try {

        const contactoEliminado = await Contacto.findByIdAndDelete(id);

        if (!contactoEliminado) {
            return res.status(404).json({
                message: "Contacto no encontrado."
            });
        }

        return res.status(200).json({
            message: "Contacto eliminado correctamente."
        });

    } catch (error) {

        console.error("Error eliminando contacto:", error);

        return res.status(500).json({
            message: "Error eliminando el contacto."
        });

    }

};

//CRUD de las llamadas

export const agregarLlamada = async (req, res) => {
    const { id } = req.params;

    const { fecha, motivo, persona } = req.body;

    if (!fecha || !motivo || !persona) {
        return res.status(400).json({
            message: "Todos los campos son obligatorios."
        });
    }

    try {

        const contacto = await Contacto.findById(id);

        if (!contacto) {
            return res.status(404).json({
                message: "Contacto no encontrado."
            });
        }

        contacto.llamadas.push({
            fecha,
            motivo,
            persona
        });

        await contacto.save();

        return res.status(201).json({
            message: "Llamada agregada correctamente.",
            contacto
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Error agregando la llamada."
        });

    }
}

export const editarLlamada = async (req, res) => {

    const { id, llamadaId } = req.params;

    const { fecha, motivo, persona } = req.body;

    try {

        const contacto = await Contacto.findById(id);

        if (!contacto) {
            return res.status(404).json({
                message: "Contacto no encontrado"
            });
        }

        const llamada = contacto.llamadas.id(llamadaId);

        if (!llamada) {
            return res.status(404).json({
                message: "Llamada no encontrada"
            });
        }

        llamada.fecha = fecha;
        llamada.motivo = motivo;
        llamada.persona = persona;

        await contacto.save();

        return res.status(200).json({
            message: "Llamada actualizada correctamente",
            contacto
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Error editando llamada"
        });

    }
};

export const eliminarLlamada = async (req, res) => {
    const { id, llamadaId } = req.params;

    try {
        const contacto = await Contacto.findById(id);

        if (!contacto) {
            return res.status(404).json({
                message: "Contacto no encontrado"
            });
        }

        // Remove the subdocument from the array
        contacto.llamadas.pull(llamadaId);
        await contacto.save();

        return res.status(200).json({
            message: "Llamada eliminada correctamente",
            contacto
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error eliminando llamada"
        });
    }
};



