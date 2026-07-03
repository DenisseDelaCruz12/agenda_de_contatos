import mongoose from 'mongoose';
const { Schema, models } = mongoose;

const contacto = new Schema(
    {
        nombre: {
            type: String,
            required: true
        }, 
        apellido: {
            type: String,
            required: true
        },
        correo: {
            type: String,
            required: true
        }, 
        tipoSangre: {
            type: String,
            required: true
        },
        cedula: {
            type: String,
            required: true
        },
        fechaNacimiento: {
            type: Date,
            required: true
        },
        llamadas:[

        {

            fecha:{
                    type:Date,
                    required:true
                },

                motivo:{
                    type:String,
                    required:true
                },

                persona:{
                    type:String,
                    required:true
                }

            }

        ]

    },
)

const Contacto = models.Contacto || mongoose.model('Contacto', contacto);
export default Contacto;
