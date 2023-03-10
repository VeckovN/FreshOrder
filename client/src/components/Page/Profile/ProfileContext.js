
const ProfileContext = ({userInfo, errors, shows, commitHandler, handleChanges, checkForCommit, onClickShowHandler}) =>{

    return (
        <div className='input_container'>
            <div className='input_field'>
                <div  onClick={() => onClickShowHandler("username")}>Username: <span> {userInfo.username} </span></div>        
                {shows.username && <input className={errors.username && 'errorInput'} onChange={handleChanges}  type='text' placeholder='New username' name='username'/>}
                {errors.username && <label className='errorInputLabel'>{errors.username}</label>}
            </div>

            <div className='input_field'>
                <div  onClick={() => onClickShowHandler("email")} >Email: <span>{userInfo.email}</span></div>
                {shows.email && <input className={errors.email && 'errorInput'} onChange={handleChanges} type='text' placeholder='New email' name='email'></input>}
                {errors.email && <label className='errorInputLabel'>{errors.email}</label>}
            </div>

            <div className='input_field'>
                <div  onClick={()=>onClickShowHandler("phone_number")}>PhoneNumber: <span>{userInfo.phone_number}</span></div>
                {shows.phone_number && <input className={errors.phone_number && 'errorInput'} onChange={handleChanges} type='number' placeholder='New Phone_number' name='phone_number'></input>}
                {errors.phone_number && <label className='errorInputLabel'>{errors.phone_number}</label>}
            </div>

            <div className='input_field'>
                <div onClick={() => onClickShowHandler("address")}>Address: <span>{userInfo.address}</span></div>
                {shows.address && <input className={errors.address && 'errorInput'} onChange={handleChanges}  type='text' placeholder='New Address' name='address'></input>}
                {errors.address && <label className='errorInputLabel'>{errors.address}</label>}
            </div>

            <div className='input_field'>
                <div onClick ={()=> onClickShowHandler("password")}>Password</div>
                {shows.password && 
                <div>
                    <input onChange={handleChanges} type='password' placeholder='New password' name='password'></input> 
                    {errors.password && <label className='errorInputLabel'>{errors.password}</label>}
                    {/* //Only if password input exist then show repeatPassword */}
                    <div>Repeat Password</div>
                    <input onChange={handleChanges} type='password' placeholder='Repeat new password' name ='repeat_password'></input>
                    {errors.repeat_password && <label className='errorInputLabel'>{errors.repeat_password}</label>}
                </div>}
            </div>

            <div className='commit_container'>
                <button onClick={commitHandler} disabled={!checkForCommit()} className='commitButton'>Commit</button>
            </div>

            {/* <div className='edit_container'>
                <button onClick={editAll} className='editButton'>Edit</button>
            </div> */}   
        </div>
    )
}

export default ProfileContext;