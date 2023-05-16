const LoginForm = ({loading, submitForm, values, handleChanges, errors }) =>{

    return(
        <form className='loginForm' onSubmit={submitForm}>
            {loading &&
            <div className='loadingBackground'>
                <div className='loader'></div>
            </div>
            }

            <div className='loginControl-input'>
                <label className='reg_label'>Email Address</label>
                <div className='login_input_field'>
                    <input
                        type='text'
                        name='email'
                        onChange={handleChanges}
                        value={values.email || ''}
                        placeholder='example@gmail.com'
                        className={errors.email && 'error'}
                    />
                    {errors.email && <label>{errors.email}</label>}
                </div>
            </div>

            <div className='loginControl-input'>
                <label className='reg_label'>Password</label>
                <div className='login_input_field'>
                    <input
                        type='password'
                        name='password'
                        onChange={handleChanges}
                        value={values.password || ''}
                        placeholder='Enter password'
                        className={errors.password && 'error'}
                    />
                    {errors.password && <label>{errors.password}</label>}
                </div>
            </div>
            <div className ='loginForm-actions'>
                <button>Submit</button>
            </div>
        </form>
    )
}

export default LoginForm