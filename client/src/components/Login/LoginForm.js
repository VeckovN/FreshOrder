import FormInput from "../UI/Modal/FormInput/FormInput"

const LoginForm = ({loading, values, handleChanges, errors, submitForm }) =>{

    return(
        <form className='loginForm'>
            {loading &&
            <div className='loadingBackground'>
                <div className='loader'></div>
            </div>
            }

            <div className='welcome-text'>
                <div>The First Step to order your food is to login</div>
                <div id="login-text"> Login to FreshOrder </div>
            </div>

            <div className="input-login-container">
                <div className='input-login'>
                    <FormInput 
                        name='email'
                        type='text'
                        values={values}
                        errors={errors}
                        handleChanges={handleChanges}
                        // placeholder='example@gmail.com'
                        placeholder='Enter email address'
                    />
                </div>

                <div className='input-login'>
                    <FormInput 
                        name='password'
                        type='password'
                        values={values}
                        errors={errors}
                        handleChanges={handleChanges}
                        placeholder='Enter password'
                    />
                </div>

                <div className='login-button-container'>
                    <button onClick={submitForm}>Login in</button>
                </div>
            </div>

            <div id="create-acc-div">
                <div id="text-acc">New Here? <span>Create an account</span></div> 
            </div>
        </form>
    )
}

export default LoginForm