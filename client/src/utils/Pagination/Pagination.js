
import './Pagination.css'

//return buttons of page number ()
const Pagination = ({itemsPerPage, totalItems, onPageNumberSelect, currentPage}) =>{

    const pageNumbers = [];
    //CEIL- round up -- e.g 30 items 9perPage => 4pages
    const totalPages = Math.ceil(parseInt(totalItems) / parseInt(itemsPerPage));
    for(let i=1; i<=totalPages; i++){
        pageNumbers.push(i);
    }

    const onClickPage =(e)=>{
        const pageNumber = e.target.value
        onPageNumberSelect(pageNumber);
    }
    

    return(
        <div className='pagination_container'>
            <div className ='pagination_numbers'>
                {pageNumbers.map(num => (        
                    // <button className='page_number' onClick={onClickPage} value={num} >{num}</button>
                    <button className={num == currentPage ? 'page_number current' : 'page_number'} onClick={onClickPage} value={num} >{num}</button>
                ))}
            </div>            
        </div>
    )
}

export default Pagination