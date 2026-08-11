import { useEffect, useMemo } from "react"
import { useGetAllTransactionsQuery } from "../../../redux/slices/admin/adminApiSlice"
import { useDispatch, useSelector } from "react-redux"
import { setAdminTransactions } from "../../../redux/slices/admin/adminActionsSlice";
import DataLoader from "../../clientside/common/spinners/DataLoader";
import noData from "../../../assets/business.png"
import PaginationBlock from "../common/utils/PaginationBlock";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SimpleTable from "../common/utils/SimpleTable";
import { ConvertDateToReadable } from "../../../utils/chores";

const TransactionsBody = () => {
  const { transactions } = useSelector(state => state.admin);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllTransactionsQuery({refetchOnMountOrArgChange: true});
  const [ searchParams ] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
       if(data){
            dispatch(setAdminTransactions([...data.transactions]))
       }
  }, [data, dispatch])

    const headerTitles = ["Transaction", "Customer", "Booking", "Gross Amount", "Stripe Fee", "Net Amount", "Status", "Date"];

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

    const moveToTheClickedPage = (newPage, newLimit) => {
          const params = new URLSearchParams(searchParams);
          params.set("page", newPage.toString());
          params.set("limit", newLimit.toString());
          navigate(`${pathname}?${params.toString()}`)
  }

  const paginatedData = useMemo(() => {
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;

          return transactions.slice(startIndex, endIndex)
  }, [page, limit, transactions])

  return (
    <div className="dashboard-transactions">
            <div className="dashboard-intro">
                        <h2>Transactions</h2>
                        <p>Review all your transactions and confirmed bookings in one place.</p>
            </div>

             { isLoading ? (
                   <div className="loader-col">
                           <DataLoader />
                   </div>
             ) : (
                     transactions.length > 0 ? (
                      <div className="table-container">
                               <div className="table-container-wrap">
                                         <SimpleTable 
                                                 headerTitles={headerTitles}
                                                 term={"No transactions yet"}
                                                 description={"No transactions have occured yet. Once a customer makes a payment, the transaction details will appear here."}
                                                 isFetching={isLoading}
                                                 gridClass="transactionTable"
                                                 rowData={paginatedData}
                                                 renderRow={(txn) => (
                                                       <>
                                                              <div className="booking-col">
                                                                        <h4>{txn.payment_intent_id.slice(0,8)+"...."+txn.payment_intent_id.slice(-3)}</h4>
                                                              </div>
                                                              <div className="booking-col">
                                                                         <div className="basic-customer-profile">
                                                                                  <h3>{txn.customerName}</h3>
                                                                                   <span>{txn.customerEmail}</span>
                                                                         </div>
                                                              </div>
                                                              <div className="booking-col">
                                                                        <h4>{txn.booking_id}</h4>
                                                              </div>
                                                              <div className="booking-col fin">
                                                                         <h4>{txn.grossAmount} <span className="aud">{txn.currency} $</span></h4>
                                                              </div>
                                                              <div className="booking-col fin">
                                                                         <h4>{txn.stripeFee} <span className="aud">{txn.currency} $</span></h4>
                                                              </div>
                                                              <div className="booking-col fin">
                                                                         <h4>{txn.netAmount} <span className="aud">{txn.currency} $</span></h4>
                                                              </div>
                                                              <div className="booking-col status">
                                                                        <div className={
                                                                                txn.paymentStatus === "succeeded" ? "status completed" :
                                                                                txn.paymentStatus === "failed" ? "status failed" :
                                                                                txn.paymentStatus === "on hold" ? "status paid" :
                                                                                "status "
                                                                        }>
                                                                                <h5>{txn.paymentStatus}</h5>
                                                                         </div>
                                                              </div>
                                                              <div className="booking-col date">
                                                                      <h4>{ ConvertDateToReadable(txn.paidAt)}</h4>
                                                              </div>
                                                       </>
                                                 )}
                                         />

                                              <PaginationBlock
                                                        totalResults={transactions.length}
                                                        currentPage={page}
                                                        pageSize={limit}
                                                        onPageChange={(page) => moveToTheClickedPage(page, limit)}
                                                        onPageSizeChange={(size) => moveToTheClickedPage(1, size)}
                                                        pageSizeOptions={[5, 10, 20, 50]}
                                                />
                               </div>
                      </div>
               ) : (
                     <div className="data-empty">
                               <img src={noData} alt="" />
                              <h3>No Transactions Yet</h3>
                              <p>You haven't processed any transactions yet. Once a customer completes a checkout, their payment and confirmation details will appear here</p>
                     </div>
                )
             )}
    </div>
  )
}

export default TransactionsBody