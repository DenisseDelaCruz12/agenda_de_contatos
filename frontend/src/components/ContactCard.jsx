import { useState } from "react";
import {
    editarContacto,
    eliminarContacto,
    agregarLlamada
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

    return (

        <div className="card mb-3">

            <div className="card-body">

                {

                    !editando ?

                        (

                            <>

                                <h4>
                                    {contacto.nombre} {contacto.apellido}
                                </h4>

                                <p>
                                    <strong>Correo:</strong> {contacto.correo}
                                </p>

                                <p>
                                    <strong>Cédula:</strong> {contacto.cedula}
                                </p>

                                <p>
                                    <strong>Tipo de sangre:</strong> {contacto.tipoSangre}
                                </p>

                                <p>
                                    <strong>Fecha de nacimiento:</strong>{" "}
                                    {new Date(contacto.fechaNacimiento).toLocaleDateString()}
                                </p>

                                <p>
                                    <strong>Llamadas:</strong> {contacto.llamadas.length}
                                </p>

                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() => setEditando(true)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={borrarContacto}
                                >
                                    Eliminar
                                </button>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => setMostrarFormularioLlamada(!mostrarFormularioLlamada)}
                                >
                                    Nueva llamada
                                </button>

                                <button
                                    className="btn btn-info"
                                    onClick={() => setMostrarLlamadas(!mostrarLlamadas)}
                                >
                                    Ver llamadas
                                </button>

                                {mostrarLlamadas && (
                                    <div className="mt-3">

                                        <h6>Llamadas</h6>

                                        {contacto.llamadas.length === 0 ? (
                                            <p>No hay llamadas registradas</p>
                                        ) : (
                                            contacto.llamadas.map((llamada) => (
                                                <div key={llamada._id} className="border p-2 mb-2 rounded">

                                                    <p>
                                                        <strong>Fecha:</strong>{" "}
                                                        {new Date(llamada.fecha).toLocaleDateString()}
                                                    </p>

                                                    <p>
                                                        <strong>Motivo:</strong> {llamada.motivo}
                                                    </p>

                                                    <p>
                                                        <strong>Persona:</strong> {llamada.persona}
                                                    </p>


                                                    <button className="btn btn-warning btn-sm me-2"
                                                        onClick={() => {
                                                            setEditandoLlamada(llamada.id);
                                                            setFormLlamada({
                                                                fecha: llamada.fecha.split("T")[0],
                                                                motivo: llamada.motivo,
                                                                persona: llamada.persona
                                                            });
                                                        }}>
                                                        Editar
                                                    </button>

                                                    <button className="btn btn-danger btn-sm">
                                                        Eliminar
                                                    </button>

                                                    {editandoLlamada === llamada._id && (
                                                        <div className="mt-2 border p-2">

                                                            <input
                                                                type="date"
                                                                name="fecha"
                                                                value={formLlamada.fecha}
                                                                onChange={(e) =>
                                                                    setFormLlamada({
                                                                        ...formLlamada,
                                                                        fecha: e.target.value
                                                                    })
                                                                }
                                                            />

                                                            <input
                                                                name="motivo"
                                                                value={formLlamada.motivo}
                                                                onChange={(e) =>
                                                                    setFormLlamada({
                                                                        ...formLlamada,
                                                                        motivo: e.target.value
                                                                    })
                                                                }
                                                            />

                                                            <input
                                                                name="persona"
                                                                value={formLlamada.persona}
                                                                onChange={(e) =>
                                                                    setFormLlamada({
                                                                        ...formLlamada,
                                                                        persona: e.target.value
                                                                    })
                                                                }
                                                            />

                                                            <button
                                                                className="btn btn-success btn-sm mt-2 me-2"
                                                                onClick={async () => {
                                                                    await editarLlamada(
                                                                        contacto._id,
                                                                        llamada._id,
                                                                        formLlamada
                                                                    );

                                                                    await onActualizar();

                                                                    setEditandoLlamada(null);
                                                                }}
                                                            >
                                                                Guardar
                                                            </button>

                                                            <button
                                                                className="btn btn-secondary btn-sm mt-2"
                                                                onClick={() => setEditandoLlamada(null)}
                                                            >
                                                                Cancelar
                                                            </button>

                                                        </div>
                                                    )}

                                                </div>

                                            ))
                                        )}

                                    </div>
                                )}

                                {
                                    mostrarFormularioLlamada && (

                                        <div className="mt-3 border rounded p-3">

                                            <h5>Nueva llamada</h5>

                                            <div className="mb-2">

                                                <label>Fecha</label>
                                                <input
                                                    className="form-control"
                                                    type="date"
                                                    name="fecha"
                                                    value={llamada.fecha}
                                                    onChange={cambiosLlamada}
                                                />

                                            </div>

                                            <div className="mb-2">

                                                <label>Motivo</label>
                                                <input
                                                    className="form-control"
                                                    name="motivo"
                                                    value={llamada.motivo}
                                                    onChange={cambiosLlamada}
                                                />

                                            </div>

                                            <div className="mb-3">

                                                <label>Persona</label>

                                                <input
                                                    className="form-control"
                                                    name="persona"
                                                    value={llamada.persona}
                                                    onChange={cambiosLlamada}
                                                />

                                            </div>

                                            <button
                                                className="btn btn-success me-2"
                                                onClick={guardarLlamada}
                                            >
                                                Guardar llamada
                                            </button>

                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => setMostrarFormularioLlamada(false)}
                                            >
                                                Cancelar
                                            </button>

                                        </div>

                                    )
                                }

                            </>

                        )

                        :

                        (

                            <>

                                <div className="mb-2">
                                    <input
                                        className="form-control"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={cambios}
                                    />
                                </div>

                                <div className="mb-2">
                                    <input
                                        className="form-control"
                                        name="apellido"
                                        value={formData.apellido}
                                        onChange={cambios}
                                    />
                                </div>

                                <div className="mb-2">
                                    <input
                                        className="form-control"
                                        name="correo"
                                        type="email"
                                        value={formData.correo}
                                        onChange={cambios}
                                    />
                                </div>

                                <div className="mb-2">
                                    <input
                                        className="form-control"
                                        name="tipoSangre"
                                        value={formData.tipoSangre}
                                        onChange={cambios}
                                    />
                                </div>

                                <div className="mb-2">
                                    <input
                                        className="form-control"
                                        name="cedula"
                                        value={formData.cedula}
                                        onChange={cambios}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        className="form-control"
                                        type="date"
                                        name="fechaNacimiento"
                                        value={formData.fechaNacimiento}
                                        onChange={cambios}
                                    />
                                </div>

                                <button
                                    className="btn btn-success me-2"
                                    onClick={guardarCambios}
                                >
                                    Guardar cambios
                                </button>

                                <button
                                    className="btn btn-secondary"
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

                            </>

                        )

                }

            </div>

        </div>

    );

}