import { useState } from "react";
import ReactDOM from "react-dom";
import {
    editarContacto,
    eliminarContacto,
    agregarLlamada,
    editarLlamada,
    eliminarLlamada
} from "../services/contactoService";


export default function ContactCard({ contacto, onActualizar }) {

    const [editando, setEditando] = useState(false);

    const [formData, setFormData] = useState({
        nombre: contacto.nombre,
        apellido: contacto.apellido,
        correo: contacto.correo,
        tipoSangre: contacto.tipoSangre,
        cedula: contacto.cedula,
        fechaNacimiento: contacto.fechaNacimiento.split("T")[0]
    });

    //states de las llamadas
    const [mostrarFormularioLlamada, setMostrarFormularioLlamada] = useState(false);

    const [mostrarLlamadas, setMostrarLlamadas] = useState(false);

    const [llamada, setLlamada] = useState({
        fecha: "",
        motivo: "",
        persona: ""
    });

    const [editandoLlamada, setEditandoLlamada] = useState(null);

    const [formLlamada, setFormLlamada] = useState({
        fecha: "",
        motivo: "",
        persona: ""
    });

    function cambios(e) {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    }

    async function guardarCambios() {

        try {

            await editarContacto(contacto._id, formData);

            await onActualizar();

            setEditando(false);

        } catch (error) {

            console.error(error);

        }

    }

    async function borrarContacto() {

        try {
            await eliminarContacto(contacto._id);
            await onActualizar();

        } catch (error) {
            console.error(error);
        }

    }

    function cambiosLlamada(e) {

        const { name, value } = e.target;

        setLlamada({
            ...llamada,
            [name]: value
        });

    }

    async function guardarLlamada() {

        try {

            await agregarLlamada(contacto._id, llamada);
            await onActualizar();

            setLlamada({
                fecha: "",
                motivo: "",
                persona: ""
            });

            setMostrarFormularioLlamada(false);

        } catch (error) {
            console.error(error);
        }

    }

    async function borrarLlamada(llamadaId) {
        try {
            await eliminarLlamada(contacto._id, llamadaId);
            await onActualizar();
        } catch (error) {
            console.error("Error al borrar llamada:", error);
        }
    }

    return (

        <div className="contact-card">

            {
                !editando ?
                    (
                        <>
                            {/* Esquina superior derecha: editar y eliminar (solo iconos) */}
                            <div className="card-actions-corner">
                                <button
                                    className="btn-icon-only btn-edit"
                                    onClick={() => setEditando(true)}
                                    title="Editar contacto"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                </button>
                                <button
                                    className="btn-icon-only btn-delete"
                                    onClick={borrarContacto}
                                    title="Eliminar contacto"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                </button>
                            </div>

                            <h3 className="contact-card-title">
                                {contacto.nombre} {contacto.apellido}
                            </h3>

                            <div className="contact-card-meta">
                                <div className="meta-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                    <span><strong>Correo:</strong> {contacto.correo}</span>
                                </div>

                                <div className="meta-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect><line x1="7" y1="8" x2="17" y2="8"></line><line x1="7" y1="12" x2="17" y2="12"></line><line x1="7" y1="16" x2="13" y2="16"></line></svg>
                                    <span><strong>Cédula:</strong> {contacto.cedula}</span>
                                </div>

                                <div className="meta-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                    <span><strong>Tipo de sangre:</strong> <span className="badge-blood">{contacto.tipoSangre}</span></span>
                                </div>

                                <div className="meta-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    <span><strong>Nacimiento:</strong> {new Date(contacto.fechaNacimiento).toLocaleDateString()}</span>
                                </div>

                                <div className="meta-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                    <span><strong>Llamadas:</strong> <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-2">{contacto.llamadas.length}</span></span>
                                </div>
                            </div>

                            {/* Botones inferiores bien separados */}
                            <div className="contact-card-footer">
                                <button
                                    className="btn-pastel-secondary flex-fill"
                                    onClick={() => setMostrarLlamadas(true)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                                    Ver llamadas
                                </button>
                                <button
                                    className="btn-pastel-primary flex-fill"
                                    onClick={() => setMostrarFormularioLlamada(true)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path><line x1="12" y1="7" x2="12" y2="13"></line><line x1="9" y1="10" x2="15" y2="10"></line></svg>
                                    Llamar
                                </button>
                            </div>
                        </>
                    )
                    :
                    (
                        /* Edición del contacto (Formulario inline limpio) */
                        <div className="d-flex flex-column h-100 justify-content-between">
                            <h4 className="mb-3 font-semibold">Editar Contacto</h4>
                            <div className="d-flex flex-column gap-2 mb-3">
                                <div className="row g-2">
                                    <div className="col">
                                        <input
                                            className="form-control form-control-sm"
                                            name="nombre"
                                            placeholder="Nombre"
                                            value={formData.nombre}
                                            onChange={cambios}
                                            required
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            className="form-control form-control-sm"
                                            name="apellido"
                                            placeholder="Apellido"
                                            value={formData.apellido}
                                            onChange={cambios}
                                            required
                                        />
                                    </div>
                                </div>
                                <input
                                    className="form-control form-control-sm"
                                    name="correo"
                                    type="email"
                                    placeholder="Correo"
                                    value={formData.correo}
                                    onChange={cambios}
                                    required
                                />
                                <div className="row g-2">
                                    <div className="col">
                                        <select
                                            className="form-select form-select-sm"
                                            name="tipoSangre"
                                            value={formData.tipoSangre}
                                            onChange={cambios}
                                            required
                                        >
                                            <option value="">Sangre</option>
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
                                    <div className="col">
                                        <input
                                            className="form-control form-control-sm"
                                            name="cedula"
                                            placeholder="Cédula"
                                            value={formData.cedula}
                                            onChange={cambios}
                                            required
                                        />
                                    </div>
                                </div>
                                <input
                                    className="form-control form-control-sm"
                                    type="date"
                                    name="fechaNacimiento"
                                    value={formData.fechaNacimiento}
                                    onChange={cambios}
                                    required
                                />
                            </div>

                            <div className="d-flex gap-2 justify-content-end mt-auto">
                                <button
                                    className="btn btn-pastel-gray btn-sm flex-fill"
                                    onClick={() => {
                                        setFormData({
                                            nombre: contacto.nombre,
                                            apellido: contacto.apellido,
                                            correo: contacto.correo,
                                            tipoSangre: contacto.tipoSangre,
                                            cedula: contacto.cedula,
                                            fechaNacimiento: contacto.fechaNacimiento.split("T")[0]
                                        });
                                        setEditando(false);
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn btn-pastel-success btn-sm flex-fill"
                                    onClick={guardarCambios}
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    )
            }

            {/* MODAL: Nueva llamada — renderizado via Portal en document.body */}
            {mostrarFormularioLlamada && ReactDOM.createPortal(
                <div 
                    className="modal fade show" 
                    style={{ display: 'block', backgroundColor: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', zIndex: 1055, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
                    onClick={() => setMostrarFormularioLlamada(false)}
                >
                    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content border-0 p-3 shadow-lg">
                            <div className="modal-header border-0 pb-0 justify-content-between align-items-center">
                                <h5 className="modal-title d-flex align-items-center gap-2 fw-bold">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                    Registrar Llamada
                                </h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setMostrarFormularioLlamada(false)}
                                    aria-label="Cerrar"
                                ></button>
                            </div>
                            <div className="modal-body py-3">
                                <p className="text-secondary small mb-3">Registra una nueva llamada realizada a {contacto.nombre}.</p>
                                
                                <div className="mb-3">
                                    <label className="form-label">Fecha de llamada</label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        name="fecha"
                                        value={llamada.fecha}
                                        onChange={cambiosLlamada}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Persona que realizó la llamada</label>
                                    <input
                                        className="form-control"
                                        name="persona"
                                        placeholder="Nombre del operador"
                                        value={llamada.persona}
                                        onChange={cambiosLlamada}
                                        required
                                    />
                                </div>

                                <div className="mb-0">
                                    <label className="form-label">Motivo de llamada</label>
                                    <textarea
                                        className="form-control"
                                        name="motivo"
                                        rows="3"
                                        placeholder="Detalles sobre la conversación..."
                                        value={llamada.motivo}
                                        onChange={cambiosLlamada}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer border-0 pt-0">
                                <button
                                    type="button"
                                    className="btn btn-pastel-gray px-4"
                                    onClick={() => setMostrarFormularioLlamada(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-pastel-success px-4"
                                    onClick={guardarLlamada}
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* MODAL: Ver llamadas — renderizado via Portal en document.body */}
            {mostrarLlamadas && ReactDOM.createPortal(
                <div 
                    className="modal fade show" 
                    style={{ display: 'block', backgroundColor: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', zIndex: 1055, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
                    onClick={() => setMostrarLlamadas(false)}
                >
                    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content border-0 p-3 shadow-lg">
                            <div className="modal-header border-0 pb-0 justify-content-between align-items-center">
                                <h5 className="modal-title d-flex align-items-center gap-2 fw-bold text-slate-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                                    Historial de Llamadas
                                </h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setMostrarLlamadas(false)}
                                    aria-label="Cerrar"
                                ></button>
                            </div>
                            <div className="modal-body py-3">
                                <p className="text-secondary small mb-3">Registro de comunicaciones con {contacto.nombre} {contacto.apellido}.</p>

                                <div className="modal-body-scroll" style={{maxHeight: '300px', overflowY: 'auto', paddingRight: '4px'}}>
                                    {contacto.llamadas.length === 0 ? (
                                        <div className="text-center py-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted mb-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                            <p className="text-muted mb-0">No hay llamadas registradas</p>
                                        </div>
                                    ) : (
                                        contacto.llamadas.map((item) => (
                                            <div key={item._id} className="call-list-item text-start">
                                                {editandoLlamada === item._id ? (
                                                    <div className="d-flex flex-column gap-2">
                                                        <input
                                                            type="date"
                                                            name="fecha"
                                                            className="form-control form-control-sm"
                                                            value={formLlamada.fecha}
                                                            onChange={(e) =>
                                                                setFormLlamada({
                                                                    ...formLlamada,
                                                                    fecha: e.target.value
                                                                })
                                                            }
                                                            required
                                                        />

                                                        <input
                                                            name="persona"
                                                            className="form-control form-control-sm"
                                                            placeholder="Persona"
                                                            value={formLlamada.persona}
                                                            onChange={(e) =>
                                                                setFormLlamada({
                                                                    ...formLlamada,
                                                                    persona: e.target.value
                                                                })
                                                            }
                                                            required
                                                        />

                                                        <textarea
                                                            name="motivo"
                                                            className="form-control form-control-sm"
                                                            rows="2"
                                                            placeholder="Motivo"
                                                            value={formLlamada.motivo}
                                                            onChange={(e) =>
                                                                setFormLlamada({
                                                                    ...formLlamada,
                                                                    motivo: e.target.value
                                                                })
                                                            }
                                                            required
                                                        ></textarea>

                                                        <div className="d-flex justify-content-end gap-2 mt-1">
                                                            <button
                                                                className="btn btn-pastel-gray btn-sm px-3"
                                                                onClick={() => setEditandoLlamada(null)}
                                                            >
                                                                Cancelar
                                                            </button>
                                                            <button
                                                                className="btn btn-pastel-success btn-sm px-3"
                                                                onClick={async () => {
                                                                    await editarLlamada(
                                                                        contacto._id,
                                                                        item._id,
                                                                        formLlamada
                                                                    );
                                                                    await onActualizar();
                                                                    setEditandoLlamada(null);
                                                                }}
                                                            >
                                                                Guardar
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="call-meta-info">
                                                            <span>
                                                                <strong>Fecha:</strong> {new Date(item.fecha).toLocaleDateString()}
                                                            </span>
                                                            <span>
                                                                <strong>Operador:</strong> {item.persona}
                                                            </span>
                                                        </div>
                                                        <div className="call-reason">
                                                            {item.motivo}
                                                        </div>
                                                        <div className="call-actions">
                                                            <button
                                                                className="btn btn-link text-decoration-none text-warning btn-sm p-0 me-2"
                                                                onClick={() => {
                                                                    setEditandoLlamada(item._id);
                                                                    setFormLlamada({
                                                                        fecha: item.fecha.split("T")[0],
                                                                        motivo: item.motivo,
                                                                        persona: item.persona
                                                                    });
                                                                }}
                                                            >
                                                                Editar
                                                            </button>
                                                            <button
                                                                className="btn btn-link text-decoration-none text-danger btn-sm p-0"
                                                                onClick={() => borrarLlamada(item._id)}
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer border-0 pt-0">
                                <button
                                    className="btn btn-pastel-gray px-4"
                                    onClick={() => setMostrarLlamadas(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}

        </div>

    );

}