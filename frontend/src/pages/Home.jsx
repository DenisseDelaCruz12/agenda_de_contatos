import React from "react";
import { useEffect, useState } from "react";
import { obtenerContactos } from "../services/contactoService";
import  ContactForm  from '../components/ContactForm'
import ContactList from "../components/ContactList";

export default function Home() {

    const [contactos, setContactos] = useState([]);
    
        useEffect(() => {
            cargarContactos();
        }, []);
        async function cargarContactos() {
            
            try {
                
                const respuesta = await obtenerContactos();
                console.log(respuesta);
    
                setContactos(respuesta.todosLosContactos);
    
            } catch (error) {
    
                console.error(error);
    
            }
    
        }

    const [mostrarFormCrear, setMostrarFormCrear] = useState(false);

    return (
        <div className="app-container">
            <header className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">Agenda de Contactos</h1>
                    <p className="text-muted mb-0">Gestiona tus contactos y llamadas en un solo lugar</p>
                </div>
                <button 
                    className="btn btn-pastel-primary px-4 py-2"
                    onClick={() => setMostrarFormCrear(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="me-1"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Nuevo Contacto
                </button>
            </header>

            {mostrarFormCrear && (
                <div 
                    className="modal fade show" 
                    style={{ display: 'block', backgroundColor: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(8px)', zIndex: 1050 }}
                    onClick={() => setMostrarFormCrear(false)}
                >
                    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content border-0 p-4 shadow-lg">
                            <ContactForm 
                                onContactoCreado={() => {
                                    cargarContactos();
                                    setMostrarFormCrear(false);
                                }}
                                onClose={() => setMostrarFormCrear(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
            
            <main className="w-100 d-flex flex-column align-items-center justify-content-center">
                <ContactList 
                    contactos={contactos}
                    onActualizar={cargarContactos}
                />
            </main>
        </div>
    )
}