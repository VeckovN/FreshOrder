import {useReducer} from 'react'

import NotificationContext from './notification-context'

const InitialNotificationState = {
    success:'',
    error:''
}


const ReducerNotification = (state,action) =>{

    if(action.type == 'AddSuccess'){
        return {
            success:action.message,
            error:'',
        }
    }

    if(action.type === 'RemoveSuccess'){
        return {
            success:'',
            error:'',
        }
    }

    if(action.type === 'AddError'){
        return {
            success:'',
            error:action.message
        }
    }

    if(action.type === 'RemoveError'){
        return {
            success:'',
            error:''
        }
    }

    if(action.type === 'RemoveNotification'){
        return {
            success:'',
            error:''
        }
    }

    // return state; //by Default
    //or
    //return InitialNotificationState
}


const NotificationProvider = props =>{

    const [notificationState, dispatchAction] = useReducer(ReducerNotification, InitialNotificationState);

    const addSuccessNotificationHandler = message =>{
        dispatchAction({type:'AddSuccess', message:message});
    }

    const removeSuccessNotificationHandler = ()=>{
        dispatchAction({type:'RemoveSuccess'});
    } 


    const addErrorNotificationHandler = message =>{
        dispatchAction({type:'AddError', message:message});
    }
    
    const removeErrorNotificationHandler = () =>{
        dispatchAction({type:'RemoveError'});
    }   

    const removeNotificationHandler = () =>{
        dispatchAction({type:'RemoveNotification'});
    }


    const notificationContext = {
        error:notificationState.error,
        success:notificationState.success,
        addSuccess: addSuccessNotificationHandler,
        removeSuccess: removeSuccessNotificationHandler,
        addError: addErrorNotificationHandler,
        removeError: removeErrorNotificationHandler,
        removeNotification: removeNotificationHandler
    }

    return(
        <NotificationContext.Provider value={notificationContext}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationProvider;

