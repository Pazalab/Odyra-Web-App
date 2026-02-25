import { memo } from "react"
import DataLoader from "../../../clientside/common/spinners/DataLoader"

const SimpleTable = ({ headerTitles, gridClass, rowData, renderRow, isFetching, redirectHandler }) => {
  return (
    <div className="simple-table">
              <div className="simple-table-wrap">
                        {/* header part */}
                        <div className={`simple-table-header ${gridClass}`}>
                                 { headerTitles.map((title, index) => (
                                         <div key={index} className="table-header-col">
                                                  <h4>{title}</h4>
                                         </div>
                                 ))}
                        </div>

                        { isFetching ?
                              <div className="table-loader">
                                    <DataLoader />
                            </div>
                            :
                         <div className="simple-table-body">
                                 { rowData && rowData.length > 0 ?
                                         rowData.map(item => (
                                                <TableRow
                                                         key={item._id}
                                                         item={item}
                                                         gridClass={gridClass}
                                                         renderRow={renderRow}
                                                         redirectHandler={redirectHandler}
                                                />
                                         ))
                                         :
                                         <div className="table-empty-block">
                                                  <p>No data found</p>
                                         </div>
                                 }
                        </div>
                        }
              </div>
    </div>
  )
}

export default SimpleTable

const TableRow = memo(({ gridClass, item, renderRow, redirectHandler }) => {
       return (
             <div onClick={() => redirectHandler(item.rideID)} className={`simple-table-row ${gridClass}`}>
                       { renderRow(item)}
             </div>
       )
})