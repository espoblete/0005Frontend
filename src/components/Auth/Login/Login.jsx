import { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../config/contexts/users/UserContext';
import './login.css';

const Login = () => {
  //invocar contexto de usuario
  const userCtx = useContext( UserContext )
  const history = useNavigate()
  
  //se extrae del contecto del usuario:  todo eso
  const {
    loginUser,
    authStatus,
    verifyingToken
  } = userCtx

  const [ formValues, setFormValues ] = useState( {
    email: "",
    password: "",
  } )

  //useEffect para verificar token
  useEffect( () => {
    verifyingToken()

    if ( authStatus ) {
      history( "/profile" )
    }

  }, [ authStatus, verifyingToken, history ] )

  //si no pasa el token, aparece spinner hasta resolverlo
  if ( authStatus ) return (
    <>
      <Spinner></Spinner>
    </> )

//y queda vista para acceder al login
  async function handleSubmit( event ) {
    event.preventDefault()
    console.log( `🚀 ~ event`, formValues );
    loginUser( formValues )

  }

  function handleFormChange( event ) {
    const { target } = event
    const { name, value } = target
    const newValues = { ...formValues, [ name ]: value }
    setFormValues( newValues )

  }

  return (
    <div>
      <h1>Ingreso</h1>
      <form onSubmit={ handleSubmit }>
        <label htmlFor='email'>Correo</label>
        <input id='email' name='email' type="text" value={ formValues.email } onChange={ handleFormChange }></input>

        <label htmlFor='password'>Contraseña</label>
        <input type="password" id='password' name='password' value={ formValues.password } onChange={ handleFormChange }></input>

        <button type='submit'>Ingresar</button>
      </form>
    </div>
  )
}

export default Login