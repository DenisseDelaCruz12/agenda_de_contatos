
import { useState } from "react";
import { crearContacto } from "../services/contactoService";

export default function ContactForm({ onContactoCreado, onClose }) {

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



    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="custom-modal-title mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary me-2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                    Nuevo Contacto
                </h3>
                <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar"></button>
            </div>
            <form onSubmit={handleForm} className="mt-3">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input 
                            name="nombre" 
                            id="nombre" 
                            type="text"
                            className="form-control"
                            placeholder="Ej. Juan"
                            value={formInfo.nombre}
                            onChange={cambios}
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input 
                            name="apellido" 
                            id="apellido" 
                            type="text"
                            className="form-control"
                            placeholder="Ej. Pérez"
                            value={formInfo.apellido}
                            onChange={cambios}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo electrónico</label>
                    <input 
                        name="correo" 
                        id="correo" 
                        type="email"
                        className="form-control"
                        placeholder="ejemplo@correo.com"
                        value={formInfo.correo}
                        onChange={cambios}
                        required
                    />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="tipoSangre" className="form-label">Tipo de sangre</label>
                        <select 
                            name="tipoSangre" 
                            id="tipoSangre" 
                            className="form-select"
                            value={formInfo.tipoSangre}
                            onChange={cambios}
                            required
                        >
                            <option value="">Seleccionar...</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="cedula" className="form-label">Cédula</label>
                        <input 
                            name="cedula" 
                            id="cedula" 
                            type="text"
                            className="form-control"
                            placeholder="001-0000000-0"
                            value={formInfo.cedula}
                            onChange={cambios}
                            required
                        />
                    </div>
                </div>
                    
                <div className="mb-4">
                    <label htmlFor="fechaNacimiento" className="form-label">Fecha de nacimiento</label>
                    <input 
                        name="fechaNacimiento"
                        id="fechaNacimiento"
                        type="date"
                        className="form-control"
                        value={formInfo.fechaNacimiento}
                        onChange={cambios}
                        required
                    />
                </div>

                <div className="d-flex justify-content-end gap-2">
                    <button 
                        type="button" 
                        className="btn btn-pastel-gray px-4 py-2"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        className="btn btn-pastel-success px-4 py-2"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </>
    )
}