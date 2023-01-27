//para proteger vistas del frontend:
//se define este componente que va a ver si se renderiza o no la vista
//segun el usuario este loggeado o no.



import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'

import { Navigate } from 'react-router-dom'
import UserContext from '../../../config/contexts/users/UserContext'

export default function PrivateRoute( { children } ) {

//primero se extrae el contexto del usuario
  const userCtx = useContext( UserContext )

  //junto con estos metodos
  const { authStatus, verifyingToken } = userCtx

  //y un useState para el spinner, si se carga o no.
  const [ loading, setLoading ] = useState( true )

  
  //UseEffect para verificar el usuario,
  //si es correcto, el spìnner pasa a falso.
  useEffect( () => {
    const verifyUser = async () => {
      await verifyingToken()
      setLoading( false )
    }
    verifyUser()

//si no,se verá el spinner 
  }, [ authStatus, verifyingToken ] )
  if ( loading ) return (
    <>
      <Spinner></Spinner>
    </>
  )

//si se esta autenticado, se vera la vista hija, para renderizarla.
//si no, redirige a home.
  return authStatus ?
    ( children )
    :
    ( <Navigate to="/" /> )
}