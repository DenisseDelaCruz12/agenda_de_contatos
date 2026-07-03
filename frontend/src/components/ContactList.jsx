import ContactCard from "./ContactCard";

export default function ContactList({ contactos, onActualizar }) {
    console.log("Se renderizó ContactList");
    return (
        <>
            <h2>Lista de contactos</h2>

            {
                contactos.length === 0 ? (
                    <p>No hay contactos registrados.</p>
                ) : (
                    contactos.map((contacto) => (
                        <ContactCard
                            key={contacto._id}
                            contacto={contacto}
                            onActualizar={onActualizar}
                        />
                    ))
                )
            }
        </>
    );
}