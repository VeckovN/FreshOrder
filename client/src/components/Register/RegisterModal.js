import Modal from "../UI/Modal/Modal.js"

const RegisterModal = ({loading, regBodyContext, onCloseRegister}) =>{

    const regHeaderContext =
    'Registration';

    return(
        <Modal
            ModalContainerStyle='registerModal'
            HeaderContext = {regHeaderContext}
            BodyContext = {regBodyContext}
            onCloseModal={onCloseRegister} 
            loading={loading}
        />
    )
}

export default RegisterModal;