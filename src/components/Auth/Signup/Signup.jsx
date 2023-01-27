import { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../../config/contexts/users/UserContext'



//se invoca el contexto del usuario
//se extraen los 3 metodos
const Signup = () => {
  const userCtx = useContext( UserContext )
  const {
    registerUser,
    authStatus,
    verifyingToken
  } = userCtx

  //importamos un hook para navegar entre los distintos componentes
  const history = useNavigate()

  //variables del formulario
  const [ formValues, setFormValues ] = useState( {
    name: "",
    surname: "",
    email: "",
    password: ""
  } )

  //para verificar el token.
  //si token esta presente y es valido, redirige al perfil.
  
  useEffect( () => {
    verifyingToken()

    if ( authStatus ) {
      history( "/profile" )
    }

  }, [ authStatus, verifyingToken, history ] )


//fx para manejar carga de datos
  async function handleSubmit( event ) {
    event.preventDefault()
    console.log( formValues )
    registerUser( formValues )
  }

  //fx para manejar cambios en el formulario
  function handleFormChange( event ) {
    const { target } = event
    const { name, value } = target
    const newValues = { ...formValues, [ name ]: value }
    setFormValues( newValues )

  }
  if ( authStatus ) return (
    <>
      <Spinner></Spinner>
    </> )

// si no está token o no es valido, queda en esta vista para registrarse
  return (
    <div>
      <h1> Registro </h1>
      <form onSubmit={ handleSubmit }>
        <label htmlFor='name'>Nombre</label>
        <input id='name' name='name' type="text" value={ formValues.name } onChange={ handleFormChange }></input>

        <label htmlFor='surname'>Apellido</label>
        <input id='surname' name='surname' type="text" value={ formValues.surname } onChange={ handleFormChange }></input>

        <label htmlFor='email'>Correo</label>
        <input id='email' name='email' type="text" value={ formValues.email } onChange={ handleFormChange }></input>

        <label htmlFor='password'>Contraseña</label>
        <input id='password' name='password' type="password" value={ formValues.password } onChange={ handleFormChange }></input>

        <button type='submit'>Registrarse</button>
      </form>
    </div>
  )
}

export default Signup