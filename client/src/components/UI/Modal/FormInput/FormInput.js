
import './FormInput.css';

const FormInput = ({name, type, placeholder, values, errors, handleChanges}) =>{

    return(
        <div className='form-input-controll'>
            <div>{name[0].toUpperCase() + name.substring(1)}</div>
            <div className='form-input-field'>
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={handleChanges}
                    // value={values.email || ''}
                    value={values[name] || ''}
                    // className={errors.email && 'error'}
                    className={errors[name] && 'error-input'}
                />
                {/* {errors.email && <label>{errors.email}</label>} */}
                {errors[name] && <label>{errors[name]}</label>}
            </div>
        </div>
    )
}

export default FormInput