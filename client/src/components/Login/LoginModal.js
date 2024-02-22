
import Modal from '../UI/Modal/Modal.js'

const LoginModal = ({loading, onCloseLogin, logBodyContext})=>{
    const logHeaderContext =
    'Login';

    return(
    <Modal
            ModalContainerStyle='loginModal'
            HeaderContext = {logHeaderContext}
            BodyContext = {logBodyContext}
            onCloseModal={onCloseLogin} 
            loading={loading}
        />
    )
}

export default LoginModal;