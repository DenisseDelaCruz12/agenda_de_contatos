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

        const [contactoEditando, setContactoEditando] = useState(null);
    
        useEffect(() => {
            console.log(contactoEditando);
        }, [contactoEditando]);

    return (
        <>

        <ContactForm 
            onContactoCreado = {cargarContactos}
            
        />
        
        <ContactList 
            contactos = {contactos}
            onActualizar={cargarContactos}
        />

        </>
    )
}