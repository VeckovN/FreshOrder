
import './ProfileInput.css'

const ProfileInput = ({name, type, placeholder, userInfo, shows, errors, handleChanges, onClickShowHandler, }) =>{
    return(
        <div className='profile-input-control'>
            <div className={`user-info ${shows[name] ? 'selected' : ''}`} onClick={onClickShowHandler}> <span>{userInfo[name]}</span> 
                <div className='input-label'>{name[0].toUpperCase() + name.substring(1)}</div>
            </div>        
            {shows[name] && 
                <input 
                    name={name}    
                    type={type}
                    placeholder={placeholder}
                    onChange={handleChanges}  
                    className={errors[name] && 'errorInput'} 
                />}
            {errors[name] && <label className='errorInputLabel'>{errors[name]}</label>}
        </div>
    )
}

export default ProfileInput;