import {useReducer, useEffect} from 'react'
import AuthContext from './auth-context'

const InitialAuthState ={
    //take user from localStorage, user is null for not logged 
    user: JSON.parse(localStorage.getItem('user')), //from JSON convert to JS Object
    loading:false,
    error:null,
}

const ReducerAuth = (state,action)=>{

    if(action.type == "LOGIN_START"){
        return{
            user:null,
            loading:true,
            error:null,
        }
    }
    
    if(action.type == "LOGIN_SUCCESS"){
        //user taken from action.payload
        return{
            user:action.payload,
            loading:false,
            error:null
        }
    }

    if(action.type == "LOGIN_FAILURE"){
        return{
            user:null,
            loading:false,
            error:action.payload
            //dispatchAction({type:"LOGIN_FAILURE", payload:err.res}) from login.js
        }
    }

    if(action.type == "LOGOUT"){
        localStorage.removeItem('user');
        return{
            //set user to null, delete from cookie
            user:null,
            loading:false,
            error:null,
        }
    }

    if(action.type == "RESET"){
        return{
            //set user to null, delete from cookie
            user:null,
            loading:false,
            error:null,
        }
    }
    return state;
}

const AuthProvider = props =>{
    const [userState, dispatchAction] = useReducer(ReducerAuth, InitialAuthState)

    //when we add a user(login), add it to LocalStorage(file created by website in our device)
    useEffect(()=>{//from JS convert to JSON
        localStorage.setItem('user',JSON.stringify(userState.user));
    }, [userState.user])    


    const logginHandler = (data) =>{
        dispatchAction({type:"LOGIN_SUCCESS", payload:data})
    }

    const authContext={
        user: userState.user,
        loading: userState.loading,
        error: userState.error,
        dispatchAction,
        loggin:logginHandler,
        //we can use only dispatchAction as dispatchAction({type:LOGIN_SUCCESS})
        //in components instead defined function 
    }

    return(
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;