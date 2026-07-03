
const url = 'http://localhost:3000/contactos';

export async function crearContacto(contacto) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contacto)
        })

        const result = await response.json();

        if (!response.ok) {
        console.log(result);
        throw new Error(result.message);
}

return result;

        // if(!response.ok){
        //     throw new Error(`Response status: ${response.status}`);
        // }

        // const result = await response.json()

        // return result;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
} 

export async function obtenerContactos() {
    try {
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json()

        return result;

    } catch (error) {
        console.error(error.message);
    }
}

export async function editarContacto(id, contacto) {
   try {
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contacto)
        })

        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json()

        return result;

    } catch (error) {
        console.error(error.message);
        throw error;
    } 
}

export async function eliminarContacto(id) {

    try {

        const response = await fetch(`${url}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {

        console.error(error);
        throw error;

    }

}

//Servicios de las llamadas

export async function agregarLlamada(id, llamada) {

    try {

        const response = await fetch(`${url}/${id}/llamadas`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(llamada)

        });

        if (!response.ok) {

            throw new Error(`Response status: ${response.status}`);

        }

        return await response.json();

    }

    catch (error) {

        console.error(error);

        throw error;

    }

}

export async function editarLlamada(id, llamadaId, data) {

    const response = await fetch(`${url}/${id}/llamadas/${llamadaId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
}

export async function eliminarLlamada(id, llamadaId) {
    try {
        const response = await fetch(`${url}/${id}/llamadas/${llamadaId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}