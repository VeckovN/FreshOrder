import react, {Fragment} from 'react';

import './Modal.css'

//portal needs
import ReactDom from 'react-dom';


const ModalViewOverlay = props =>{ 
    // const modalStyle = 'modal ' +  props.ModalContainer;
    const modalStyle = props.ModalContainer=== undefined ? `modal` : `modal ${props.ModalContainer}`;
    // return <div className='modal' >
    return <div className={modalStyle}>
        <div className='modal-conatiner'>
            <div className='modal-header'>
                <div>{props.HeaderContext}</div>
                <button className='close_sign' onClick={props.onCloseMV}>X</button>
            </div>
            
            {/* <div className='modal-body'>     */}
            <div className={`modal-body ${props.loading ? 'loading-modal-body' : ''}`}>    
                {/* {props.children} */}
                {props.BodyContext}
            </div>
        </div>    
    </div>
}


const BackView = props =>{
    //when is click out of modal form
    return <div className='backView' onClick={props.onCloseBV}></div>
}



//from public/index.html 
const portalElement = document.getElementById('modal-portal');

const Modal = props =>{

    //a portal is used to show the modal on a particular element on page

    return(
        <Fragment>
            {ReactDom.createPortal(<BackView onCloseBV={props.onCloseModal}/>,
            portalElement)}

            {ReactDom.createPortal(<ModalViewOverlay 
                ModalContainer={props.ModalContainerStyle}
                onCloseMV={props.onCloseModal}
                //this is from cart return (Modal props)
                HeaderContext={props.HeaderContext}
                BodyContext={props.BodyContext}
                loading={props.loading}
            />,
            portalElement)}
        </Fragment>
    )
}

export default Modal;