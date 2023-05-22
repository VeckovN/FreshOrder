import './Register.css'

const RegisterForm = ({submitForm, values, errors, handleChanges,}) =>{

    return (
        <form onSubmit={submitForm}>
            <div className='registerControl-input'>
                <label className='reg_label'>Username</label>
                <div className='register_input_field'>
                    <input
                        type='text'
                        name='username'
                        onChange={handleChanges}
                        value={values.username || ''}
                        placeholder='Enter name'
                        className={errors.username && 'error'}
                    />
                    {errors.username && <label>{errors.username}</label>}
                </div>
            </div>


            <div className='registerControl-input'>
                <label className='reg_label'>Email Address</label>
                <div className='register_input_field'>
                    <input
                        type='text'
                        name='email'
                        onChange={handleChanges}
                        value={values.email || ''}
                        placeholder="example@gmail.com"
                        className={errors.email && 'error'}
                    />
                    {errors.email &&<label>{errors.email}</label>}
                </div>
                
            </div>

            <div className='registerControl-input'>
                <label className='reg_label'>Password</label>
                <div className='register_input_field'>
                    <input
                        type='password'
                        name='password'
                        onChange={handleChanges}
                        value={values.password || ''}
                        placeholder='Enter password'
                        className={errors.password && 'error'}
                    />
                    {errors.password &&<label>{errors.password}</label>}
                </div>
                
            </div>

            <div className='registerControl-input'>
                <label className='reg_label'>Repeat Password</label>
                <div className='register_input_field'>
                    <input
                        type='password'
                        name='repeat_password'
                        onChange={handleChanges}
                        value={values.repeat_password || ''}
                        placeholder='Enter password'
                        className={errors.repeat_password && 'error'}
                    />
                    {errors.repeat_password && <label>{errors.repeat_password}</label>}
                </div>
                
            </div>

            <div className='registerControl-input'>
                <label className='reg_label'>Address</label>
                <div className='register_input_field'>
                    <input
                        type='text'
                        name='address'
                        onChange={handleChanges}
                        value={values.address || ''}
                        placeholder="Enter address"
                        className={errors.address && 'error'}
                    />
                    {errors.address && <label>{errors.address}</label>}
                </div>
            </div>

            <div className='registerControl-input'>
                <label className='reg_label'>Phone Number</label>
                <div className='register_input_field'>
                    <input
                        type='number'
                        name='phone_number'
                        onChange={handleChanges}
                        value={values.phone_number || ''}
                        min='9'
                        placeholder='Enter digit values'
                        className={errors.phone_number && 'error'}
                    />
                    {errors.phone_number && <label>{errors.phone_number}</label>}
                </div>
                
            </div>

            <div className = 'registerForm-actions'>
                <button>Submit</button>
            </div>
        </form>
    )
}

export default RegisterForm;