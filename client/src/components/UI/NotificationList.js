import {useState} from 'react';

const NotificationList = () =>{

    const [notification, setNotifications] = useState[''];

    const handleNotificationAdd = (notificationCompoenent) =>{
        setNotifications(prev =>{
            [
                ...prev,
                notificationCompoenent
            ]
        })
    }

    return(
        <div className='notification-List'>
            {notification.map(el =>{
                <div className='notification'>{el}</div>
            }) }
        </div>
    )
}

export default NotificationList