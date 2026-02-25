import { useRef, useState } from "react"
import { useClickOutside } from "../../../../hooks/outsideClickHook";
import { HiOutlineChevronDown, HiOutlineChevronLeft, HiOutlineChevronRight} from "react-icons/hi";

const PaginationBlock = ({ 
    pageSize,
    totalResults,
    currentPage,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions
}) => {
    const [ rowStatus, setRowStatus ] = useState({ isActive: false, numberItem: pageSize});
    const totalPages = Math.ceil(totalResults / pageSize);
    const rowPopRef = useRef();

    useClickOutside(rowPopRef, () => {
          setRowStatus(prev => ({ ...prev, isActive: false}))
    })

        const getPageRangeNumbers = () => {
          const delta = 2;
          const range = [];
          const rangeWithDots = [];
          let l;

          for(let i = 1; i <= totalPages; i++){
               if(i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)){
                      range.push(i)
               }
          }

          for(let i of range){
               if(l){
                   if(i - l === 2){
                          rangeWithDots.push(l + 1)
                   }else if(i - l !== 1){
                         rangeWithDots.push("...")
                   }
               }
               rangeWithDots.push(i);
               l = i
          }
          return rangeWithDots;
    }

      const handleNumRowSelection = (num) => {
       setRowStatus(prev => ({ ...prev, numberItem: Number(num), isActive: false }));
       onPageSizeChange(num)
  }

  const isPreviousPossible = currentPage > 1;
  const isNextPossible = currentPage < totalPages;

  return (
    <div className="pagination-block">
             <div className="pagination-status">
                         <p>Showing
                                 <span>{ Math.min((currentPage - 1) * pageSize + 1, totalResults) }</span> 
                                 <span>-</span>
                                 <span>  { Math.min(currentPage * pageSize, totalResults)}</span> of { totalResults}
                         </p>
             </div>
             { totalPages > 1 && (
                     <div className="pagination-items">
                                <button
                                      disabled={!isPreviousPossible}
                                      onClick={() => onPageChange(currentPage - 1)}
                                className={ isPreviousPossible ? "paginate-btn" : "paginate-btn inactive"}>
                                           <span><HiOutlineChevronLeft /></span>
                                </button>
                               { getPageRangeNumbers().map((page, index) => (
                                    <button 
                                            key={`pgn${page}~${index}`} 
                                            disabled={ page === "..."}
                                            className={`paginate-btn
                                                 ${ page === currentPage ? `active` : 
                                                  page === "..." ? `inactive`: ``}`}
                                            onClick={() => typeof page === 'number' && onPageChange(page)}
                                        >{page}</button>
                                  ))}
                                  <button
                                          disabled={!isNextPossible}
                                          onClick={() => onPageChange(currentPage + 1)}
                                    className={ isNextPossible ? "paginate-btn" : "paginate-btn inactive"}>
                                             <span><HiOutlineChevronRight /></span>
                                  </button>
                     </div>
                )}
                <div className="page-size-options">
                          <p>Rows per page</p>
                          <div className="page-size-changer">
                                      <div className="page-size-indicator" onClick={() => setRowStatus(prev => ({ ...prev, isActive: !prev.isActive}))}>
                                               <span className="size">{ rowStatus.numberItem }</span>
                                               <span className="icon"><HiOutlineChevronDown /></span>
                                      </div>
                                      <div ref={rowPopRef} className={ `${ rowStatus.isActive ? "page-size-pop active" : "page-size-pop"}`}>
                                                 <ul>
                                                           { pageSizeOptions.map(option => (
                                                                  <li key={option} onClick={() => handleNumRowSelection(option)}>{option}</li>
                                                           ))}
                                                 </ul>
                                      </div>
                          </div>
                </div>
    </div>
  )
}

export default PaginationBlock