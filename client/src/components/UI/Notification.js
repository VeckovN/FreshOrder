import {useContext, useEffect} from 'react'

import './Notification.css';
import notificationContext from '../Store/notification-context.js' 

import { MdOutlineError } from "react-icons/md";
import { MdThumbUp } from "react-icons/md";



const Notification = () =>{

    const {error, success, removeNotification} = useContext(notificationContext);

    console.log("SUCCESS: " + success);
    console.log("ERROR: " + error); 

    let styleComponent; 
    let styleIconComponent;
    let notifyIcon;

    if(error !=''){
        styleComponent ='error'
        styleIconComponent ='errorIcon'
        notifyIcon = <MdOutlineError />
    }
    else if(success!=''){
        styleComponent = 'success'
        styleIconComponent ='successIcon'
        notifyIcon = <MdThumbUp/>
    }
    

    //after some second set Erro and succes to '' and that will
    //trigger useCOntext in APP.js to unshowned compoennt
    useEffect(()=>{
        const timer = setTimeout(()=>{
            //after 3s remove error and succes notification
            removeNotification();
        },2200)

        return() =>{
            clearTimeout(timer);
        }
    },[])

    return(
        
        <div className={`notification-container ${styleComponent}`}>
            {/* <div className={`notification-title ${styleComponent}`}>
                Success
            </div> */}
            <div className={`notification-icon ${styleIconComponent}`}>{notifyIcon}</div>
            {/* <div className='notification-icon'><MdOutlineError /></div> */}
            <div className ='notification-context'>
                {success || error}
            </div>
        </div>
    )
}

export default Notification;