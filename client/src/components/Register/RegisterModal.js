import Modal from "../UI/Modal/Modal.js"

const RegisterModal = ({regBodyContext, error, onCloseRegister, submitForm}) =>{

    const regHeaderContext =
    'Registration';

    //const regBodyContext =
        
    const regFooterContext = 
        <>
            <div className = 'registerForm_submit'>
                <button onClick={submitForm}>Submit</button>
            </div> 
        </>


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