import React, { useReducer } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'


//se define el userState inicial con su objeto user, 
//un estado inicial de usuario no autenticado y
//y un valor de carga para saber cuando se este cargando algun contenido
const UserState = ( props ) => {

  const initialState = {
    user: {
      id: null,
      fullName: null,
      email: null
    },
    authStatus: false,
    loading: true
  }


  //se importa reducer, useReducer da una variable de estado global y un método para disparo de eventos
  //que serán capturados por el UserReducer para realizar actualizaciones
  const [ globalState, dispatch ] = useReducer( UserReducer, initialState )

  
  
  //este metodo recibe datos del formulario
  //se hace peticion al backend
  //a la ruta, haciendo POST donde envio y espero recibir un json.
  //por payload se pasa respuesta de api
  const registerUser = async ( dataForm ) => {

    try {
      const res = await fetch( 'http://localhost:3001/auth/signup', { method: 'POST', headers: { "Content-type": 'application/json', "Accept": 'application/json' }, body: JSON.stringify( dataForm ) } )
      const payload = await res.json()
      dispatch( {
        type: "REGISTRO_EXITOSO",
        payload: payload
      } )

    } catch ( error ) {
      console.error( error )

    }
  }

  //como arriba
  const loginUser = async ( dataForm ) => {
    try {
      const response = await fetch( 'http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify( dataForm )
      } )
      const tokenObj = await response.json()

      dispatch( {
        type: "LOGIN_EXITOSO",
        payload: tokenObj
      } )

    } catch ( error ) {
      console.error( error )
    }
  }

  //metodo para verificar token
  //se extrae desde localstorage
  //
  const verifyingToken = async () => {

    const token = localStorage.getItem( 'token' )
    if ( !token ) {
      return null
    }
    try {
//si está el token, se hace una peticion al backend para obtener la info del usuario
      const fetchResponse = await fetch( "http://localhost:3001/users/profile", {
        method: 'GET', headers: {
          "Authorization": `Bearer ${ token }`,
          "Content-type": "application/json",
          "Accept": "application/json"
        }
      } )

      //si está correcto, se dispara evento
      const response = await fetchResponse.json()
      if (!fetchResponse.ok) {
        throw new Error (response.error)
      }

      dispatch( {
        type: "OBTENER_USUARIO",
        payload: response
      } )
//si no, cierra sesion gatillando otro evento para eso.
    } catch ( error ) {
      console.error (error)
      dispatch( {
        type: "CERRAR_SESION"
      } )
    }
  }

  const logout = () => {
    dispatch( {
      type: "CERRAR_SESION"
    } )
  }





//se retorna un proveedor de contexto de usuario que entrega user, auth.. y loading + otros metodos
  return (
    <UserContext.Provider value={ {
      user: globalState.user,
      authStatus: globalState.authStatus,
      loading: globalState.loading,
      registerUser,
      loginUser,
      verifyingToken,
      logout
    } }>

      { props.children }

    </UserContext.Provider>
  )
}

export default UserState
