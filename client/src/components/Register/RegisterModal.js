import Modal from "../UI/Modal/Modal.js"

const RegisterModal = ({regBodyContext, error, onCloseRegister}) =>{

    const regHeaderContext =
    'Registration';

    //const regBodyContext =
        
    const regFooterContext = 
    error && <div className='registerError'>Error: <span>{error}</span></div>


    return(
        <Modal
            ModalContainerStyle='registerModal'
            HeaderContext = {regHeaderContext}
            BodyContext = {regBodyContext}
            FooterContext = {regFooterContext}
            onCloseModal={onCloseRegister} 
        // onCloseSignClick={props.onCloseCart}>
        />
    )
}

export default RegisterModal;