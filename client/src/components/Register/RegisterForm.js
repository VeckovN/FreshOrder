import FormInput from '../UI/Modal/FormInput/FormInput';
import './Register.css'

const RegisterForm = ({submitForm, values, errors, handleChanges,}) =>{

    return (
        <div className='regForm'>
            <div className="title-text">Create an account</div>

            <div className='input-register-container'>
                <div className='input-register'>
                    <FormInput
                        name='username'
                        type='text'
                        values={values}
                        errors={errors}
                        handleChanges={handleChanges}
                        placeholder='Enter username'
                    />
                </div>  
                <div className='input-register'>
                    <FormInput
                        name='email'
                        type='text'
                        values={values}
                        errors={errors}
                        handleChanges={handleChanges}
                        placeholder='Enter email address'
                    />
                </div>  
                <div className='input-register'>
                    <FormInput
                        name='password'
                        type='password'
                        values={values}
                        errors={errors}
                        handleChanges={handleChanges}
                        placeholder='Enter password'
                    />
                </div>  
                <div className='input-register'>
                    <FormInput
                        name='repeat_password'
                        type='password'
                        values={values}
                        errors={errors}
                        handleChanges={handleChanges}
                        placeholder='Repeat the password'
                    />
                </div>  
                <div className='input-register'>
                    <FormInput
                        name='address'
                        type='text'
                        values={values}
                        errors={errors}
                        handleChanges={handleChanges}
                        placeholder='Enter address'
                    />
                </div>  

                <div className='input-register'>
                    <FormInput
                        name='phone_number'
                        type='number'
                        values={values}
                        errors={errors}
                        handleChanges={handleChanges}
                        placeholder='Enter digit values'
                    />
                </div>  

                <div className='register-button-container'>
                    <button onClick={submitForm}>Submit</button>
                </div>
            </div>

        </div>
    )
}

export default RegisterForm;