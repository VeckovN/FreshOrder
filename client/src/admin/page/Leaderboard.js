import './Leaderboard.css'

const Leaderboard = () =>{

    return(
        <>
             <div className='cardInfo_container'> 
                <div className='cardInfo'>
                    <div>ICON</div>
                    <div className='Info'>
                        <div >Order Pending</div>
                        <div >{5}</div>
                    </div>
                    
                </div>

                <div className='cardInfo'>
                    <div>ICON</div>
                    <div className='Info'>
                        <div >Order Complited</div>
                        <div>{6120}</div>
                    </div>
                </div>

                <div className='cardInfo'>
                    <div>ICON</div>
                    <div className='Info'>
                        <div >Users</div>
                        <div>{3021}</div>
                    </div>
                </div>

                <div className='cardInfo'>
                    <div>ICON</div>
                    <div className='Info'>
                        <div >Products</div>
                        <div>{51}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Leaderboard