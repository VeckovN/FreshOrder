import {useContext, useEffect} from 'react'

import notificationContext from '../../store/notification-context.js' 

import { MdOutlineError } from "react-icons/md";
import { MdThumbUp } from "react-icons/md";

import './Notification.css';


const Notification = () =>{

    const {error, success, removeNotification} = useContext(notificationContext);

    const getNotificationStyles =(error, success) =>{
        if(error !=''){
            return{
                styleComponent:'error',
                styleIconComponent:'errorIcon',
                notifyIcon: <MdOutlineError />
            }
        }
        else if(success != ''){
            return{
                styleComponent: 'success',
                styleIconComponent:'successIcon',
                notifyIcon: <MdThumbUp/>
            }
        }
        return {};
    }

    //const instead of let variables with conditions this way, easier to test and maintain
    const {styleComponent, styleIconComponent, notifyIcon } = getNotificationStyles(error, success);

    // let styleComponent; 
    // let styleIconComponent;
    // let notifyIcon;

    // if(error !=''){
    //     styleComponent ='error'
    //     styleIconComponent ='errorIcon'
    //     notifyIcon = <MdOutlineError />
    // }
    // else if(success!=''){
    //     styleComponent = 'success'
    //     styleIconComponent ='successIcon'
    //     notifyIcon = <MdThumbUp/>
    // }

    //trigger useContext in APP.js to unshowned compoennt
    useEffect(()=>{
        const timer = setTimeout(()=>{
            removeNotification();
        },2200)

        return() =>{
            clearTimeout(timer);
        }
    },[])

    return(
        
        <div className={`notification-container ${styleComponent}`}>
            <div className={`notification-icon ${styleIconComponent}`}>{notifyIcon}</div>
            <div className ='notification-context'>
                {success || error}
            </div>
        </div>
    )
}

export default Notification;