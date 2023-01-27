
//Reducers: capturan eventos y realizan los distintos cambios de estado: aqui 2 eventos:
const reducers = ( globalState, action ) => {


    //si llega 'LOGIN _EXITOSO ' se guarda token en localstorage
    //y retorna una actualizacion del estado global a autenticacion:true.
    //lo mismo para registro exitoso.
    //otra cosa, deja el estado global como estaba.
    switch ( action.type ) {
      case 'LOGIN_EXITOSO':
        localStorage.setItem( "token", action.payload.token )
    
        return {
          ...globalState,
          authStatus: true,
        }
    
        case "REGISTRO_EXITOSO":

        localStorage.setItem( "token", action.payload.token )
  
        return {
          ...globalState,
          authStatus: true,
        }
      
      case "OBTENER_USUARIO":
  //actualiza estadoauth a true e info de usuario según payload que devuelve el backend 
        return {
          ...globalState,
          authStatus: true,
          user: action.payload
        }
  
  //en este caso, se borra token de localstorage y cambia user a null, otro a null y otro a false
      case "CERRAR_SESION":
        localStorage.removeItem( 'token' )
        localStorage.removeItem( 'shoppingCart' )
        
        return {
          ...globalState,
          user: null,
          authStatus: false,
          loading: false
        }
  
      default:
        return globalState
  
    }
  
  }
  
  export default reducers
  