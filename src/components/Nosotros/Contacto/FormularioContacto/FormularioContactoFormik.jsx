import { useFormik } from 'formik';
import "./formulario-contacto.css";

export default function FormularioContacto() {
  const { handleSubmit, handleChange, values } = useFormik( {
    initialValues: {
      name: "",
      surname: "",
      email: "",
      contactReason: ""
    },
    onSubmit: async function ( values ) {

    }
  } )

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor='name'>Nombre</label>
      <input id='name' name='name' type="text" value={ values.name } onChange={ handleChange }></input>

      <label htmlFor='surname'>Apellido</label>
      <input id='surname' name='surname' type="text" value={ values.surname } onChange={ handleChange }></input>

      <label htmlFor='email'>Correo</label>
      <input id='email' name='email' type="email" value={ values.email } onChange={ handleChange }></input>

      <label htmlFor='contactReason'>Motivo</label>
      <textarea id='contactReason' name='contactReason' value={ values.contactReason } onChange={ handleChange }></textarea>

      <button type='submit'>Enviar</button>
    </form>
  )
}