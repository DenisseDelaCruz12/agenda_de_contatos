
import { useState } from "react";
import { crearContacto, obtenerContactos } from "../services/contactoService";

export default function ContactForm({onContactoCreado }) {

    const [formInfo, setFormInfo] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        tipoSangre: "",
        cedula: "",
        fechaNacimiento: ""
    });

    const cambios = (e) => {
        const {name, value} = e.target;

        setFormInfo({
            ...formInfo,
            [name]: value
        });
    };

    async function handleForm(e){

        console.log(onContactoCreado);
        e.preventDefault();
        console.log("Formulario enviado correctamente!")
        try {
            await crearContacto(formInfo);
            await onContactoCreado();
            
            setFormInfo({nombre: "",
            apellido: "",
            correo: "",
            tipoSangre: "",
            cedula: "",
            fechaNacimiento: ""});
           
        } catch (error) {
            console.error(error);
        }
        
    }

    async function guardarCambios(){

        try{
            await editarContacto(contacto._id,formData);
            await onActualizar();
            setEditando(false);
        }

        catch(error){
            console.error(error);
        }

    }

    return(
        <>
        <h2>Formulario</h2>
        <form onSubmit={handleForm}>

            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre:</label>
                <input 
                name="nombre" 
                id="nombre" 
                type="text"
                value={formInfo.nombre}
                onChange={cambios}/>
            </div>

            <div className="mb-3">
                <label htmlFor="apellido" >Apellido:</label>
                <input 
                name="apellido" 
                id="apellido" 
                type="text"
                value={formInfo.apellido}
                onChange={cambios}/>
            </div>

            <div className="mb-3">
                <label htmlFor="correo">Correo:</label>
                <input 
                name="correo" 
                id="correo" 
                type="email"
                value={formInfo.correo}
                onChange={cambios}/>
            </div>

            <div className="mb-3">
                <label htmlFor="tipoSangre">Tipo de sangre:</label>
                <input 
                name="tipoSangre" 
                id="tipoSangre" 
                type="text"
                value={formInfo.tipoSangre}
                onChange={cambios}/>
                
            </div>

            <div className="mb-3">
                <label htmlFor="cedula">Cedula:</label>
                <input 
                name="cedula" 
                id="cedula" 
                type="text"
                value={formInfo.cedula}
                onChange={cambios}/>
            </div>
                
            <div className="mb-3">
                <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
                <input 
                name="fechaNacimiento"
                id="fechaNacimiento"
                type="date"
                value={formInfo.fechaNacimiento}
                onChange={cambios}/>
            </div>


            <button 
            type="submit" 
            className="btn btn-primary"
            >Guardar</button>
        </form>
        
        </>
    )
}