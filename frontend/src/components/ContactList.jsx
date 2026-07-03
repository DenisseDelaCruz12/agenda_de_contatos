import ContactCard from "./ContactCard";

export default function ContactList({ contactos, onActualizar }) {
    console.log("Se renderizó ContactList");
    return (
        <div className="w-100">
            {contactos.length === 0 ? (
                <div className="text-center py-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted mb-3"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <h5 className="text-muted">No hay contactos registrados</h5>
                    <p className="text-secondary small">Crea un contacto para comenzar a registrar llamadas.</p>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                    {contactos.map((contacto) => (
                        <div key={contacto._id} className="col d-flex align-items-stretch">
                            <ContactCard
                                contacto={contacto}
                                onActualizar={onActualizar}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}