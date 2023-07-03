
const ProfileContext = ({userInfo,values, errors, shows, commitHandler, handleChanges, checkForCommit, onClickShowHandler}) =>{

    return (
        <div className='input_container'>
            <div className='input_field'>
                <div  onClick={() => onClickShowHandler("username")}>Username: <span> {userInfo.username} </span></div>        
                {shows.username && 
                    <input 
                        className={errors.username && 'errorInput'} 
                        onChange={handleChanges}  
                        type='text' 
                        placeholder='New username'
                        name='username'
                    />}
                {errors.username && <label className='errorInputLabel'>{errors.username}</label>}
            </div>

            <div className='input_field'>
                <div  onClick={() => onClickShowHandler("email")} >Email: <span>{userInfo.email}</span></div>
                {shows.email && 
                    <input 
                        className={errors.email && 'errorInput'} 
                        onChange={handleChanges} 
                        type='text' 
                        placeholder='New email' 
                        name='email'
                    />
                }
                {errors.email && <label className='errorInputLabel'>{errors.email}</label>}
            </div>

            <div className='input_field'>
                <div  onClick={()=>onClickShowHandler("phone_number")}>PhoneNumber: <span>{userInfo.phone_number}</span></div>
                {shows.phone_number && 
                    <input 
                        className={errors.phone_number && 'errorInput'} 
                        onChange={handleChanges} 
                        type='number' 
                        placeholder='New Phone_number' 
                        name='phone_number'/>
                }
                {errors.phone_number && <label className='errorInputLabel'>{errors.phone_number}</label>}
            </div>

            <div className='input_field'>
                <div onClick={() => onClickShowHandler("address")}>Address: <span>{userInfo.address}</span></div>
                {shows.address && 
                    <input 
                        className={errors.address && 'errorInput'} 
                        onChange={handleChanges}  
                        type='text' 
                        placeholder='New Address' 
                        name='address'
                    />
                }
                {errors.address && <label className='errorInputLabel'>{errors.address}</label>}
            </div>

            <div className='input_field'>
                <div onClick ={()=> onClickShowHandler("password")}>Password</div>
                {shows.password && 
                    <div className="password_form">  
                        <div className='password_input'>
                            <input 
                                onChange={handleChanges} 
                                type='password' 
                                placeholder='New password' 
                                name='password'
                            /> 
                            {errors.password && <label className='errorInputLabel'>{errors.password}</label>}
                        </div>
                        <div className='password_input'>
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

            <div className='commit_container'>
                <button onClick={commitHandler}  disabled={!checkForCommit()} className='commitButton'>Commit</button>
            </div>

            {/* <div className='edit_container'>
                <button onClick={editAll} className='editButton'>Edit</button>
            </div> */}   
        </div>
    )
}

export default ProfileContext;