
import Modal from '../UI/Modal/Modal.js'

const LoginModal = ({onCloseLogin, logBodyContext, error, submitForm})=>{

    
    const logHeaderContext =
    'Login';

    const logLoading = 
        <div></div>

    //in Login component
    // const regBodyContext
    
    // const logFooterContext = 
    //     error && <div className='loginError'> <span>{error.message}</span></div>

    //When is Enter click also do submit

    const logFooterContext = 
            <>
                <div className ='loginForm_submit'>
                    <button onClick={submitForm} >Submit</button>
                </div> 
            </>

    return(
    <Modal
            ModalContainerStyle='loginModal'
            HeaderContext = {logHeaderContext}
            BodyContext = {logBodyContext}
            FooterContext = {logFooterContext}
            // onCloseModal={props.onClose} 
            onCloseModal={onCloseLogin} 
            // onCloseSignClick={props.onCloseCart}>
        />
    )
}

export default LoginModal;