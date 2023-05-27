import {useContext, useEffect} from 'react'

import './Notification.css';
import notificationContext from '../Store/notification-context.js' 



const Notification = () =>{

    const {error, success, removeNotification} = useContext(notificationContext);

    console.log("SUCCESS: " + success);
    console.log("ERROR: " + error); 

    let styleComponent = '' 

    if(error !=''){
        styleComponent +='error'
    }
    else if(success!=''){
        styleComponent += 'success'
    }

    

    //after some second set Erro and succes to '' and that will
    //trigger useCOntext in APP.js to unshowned compoennt
    useEffect(()=>{
        const timer = setTimeout(()=>{
            //after 3s remove error and succes notification
            removeNotification();
        },3000)

        return() =>{
            clearTimeout(timer);
        }
    },[])

    return(
        
        <div className={`notification-container ${styleComponent}`}>
            {/* <div className={`notification-title ${styleComponent}`}>
                Success
            </div> */}
            <div className ='notification-context'>
                {success || error}
            </div>
        </div>
    )
}

export default Notification;