import ProfileInput from "../../components/UI/ProfileInput";

const ProfileContext = ({userInfo,values, errors, shows, commitHandler, handleChanges, checkForCommit, onClickShowHandler}) =>{
    return (    
        <div className='input-profile-container'>
            <div className='input-field'>
                <ProfileInput
                    name='username'
                    type='text'
                    placeholder='Enter new username'
                    userInfo={userInfo}
                    shows={shows}
                    errors={errors}
                    onClickShowHandler={() => onClickShowHandler("username")}
                    handleChanges={handleChanges}
                />
            </div>
            <div className='input-field'>
                <ProfileInput
                    name='email'
                    type='text'
                    placeholder='Enter new email'
                    userInfo={userInfo}
                    shows={shows}
                    errors={errors}
                    onClickShowHandler={() => onClickShowHandler("email")}
                    handleChanges={handleChanges}
                />
            </div>

            <div className='input-field'>
                <ProfileInput
                    name='phone_number'
                    type='number'
                    placeholder='Enter new phone number'
                    userInfo={userInfo}
                    shows={shows}
                    errors={errors}
                    onClickShowHandler={() => onClickShowHandler("phone_number")}
                    handleChanges={handleChanges}
                />
            </div>

            <div className='input-field'>
                <ProfileInput
                    name='address'
                    type='text'
                    placeholder='Enter new address'
                    userInfo={userInfo}
                    shows={shows}
                    errors={errors}
                    onClickShowHandler={() => onClickShowHandler("address")}
                    handleChanges={handleChanges}
                />
            </div>

            <div className='input-field'>
                <div className='user-info' onClick={() => onClickShowHandler("password")}> <span>{'*'.repeat(userInfo.password_length)}</span>
                    <div className='input-label'>Password</div>
                </div>
                {shows.password && 
                    <div className="password-form">  
                        <div className='password-input-container'>
                            <input 
                                onChange={handleChanges} 
                                type='password' 
                                placeholder='New password' 
                                name='password'
                            /> 
                            {errors.password && <label className='errorInputLabel'>{errors.password}</label>}
                        </div>
                        <div className='password-input-container'>
                            <input
                                onChange={handleChanges} 
                                type='password' 
                                placeholder='Repeat new password' 
                                name ='repeat_password'
                            />
                            {errors.repeat_password && <label className='errorInputLabel'>{errors.repeat_password}</label>}
                        </div>    
                    </div>
                }
            </div>

            <div className='commit-container'>
                <button onClick={commitHandler}  disabled={!checkForCommit()} className='commitButton'>Commit</button>
            </div>

            {/* <div className='edit_container'>
                <button onClick={editAll} className='editButton'>Edit</button>
            </div> */}   
        </div>
    )
}

export default ProfileContext;