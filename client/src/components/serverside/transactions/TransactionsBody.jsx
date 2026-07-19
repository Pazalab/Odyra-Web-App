import { useEffect } from "react"
import { useGetAllTransactionsQuery } from "../../../redux/slices/admin/adminApiSlice"
import { useDispatch, useSelector } from "react-redux"
import { setAdminTransactions } from "../../../redux/slices/admin/adminActionsSlice";
import DataLoader from "../../clientside/common/spinners/DataLoader";
import noData from "../../../assets/business.png"
const TransactionsBody = () => {
  const { transactions } = useSelector(state => state.admin);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllTransactionsQuery({refetchOnMountOrArgChange: true})

  useEffect(() => {
       if(data){
            dispatch(setAdminTransactions([...data.transactions]))
       }
  }, [data, dispatch])

  return (
    <div className="dashboard-transactions">
            <div className="dashboard-intro">
                        <h2>Transactions</h2>
                        <p>Review all your transactions and confirmed bookings in one place.</p>
            </div>

             { isLoading && <DataLoader />}
               
               { transactions.length > 0 ? (
                      <div className=""></div>
               ) : (
                     <div className="data-empty">
                               <img src={noData} alt="" />
                              <h3>No Transactions Yet</h3>
                              <p>You haven't processed any transactions yet. Once a customer completes a checkout, their payment and confirmation details will appear here</p>
                     </div>
               )}
    </div>
  )
}

export default TransactionsBody