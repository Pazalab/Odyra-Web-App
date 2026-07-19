import React from 'react'
import DashboardNotification from '../../components/serverside/common/nofitications/DashboardNotification'
import DashboardSidebar from '../../components/serverside/common/DashboardSidebar'
import Topbar from '../../components/serverside/common/Topbar'
import TransactionsBody from '../../components/serverside/transactions/TransactionsBody'
import "../../css/serverside/transactions.css"

const AdminTransactions = () => {
  return (
    <div className="admin-dashboard-wrap">
              <DashboardNotification />
              <DashboardSidebar />
              <div className="dashboard-wrapper">
                      <Topbar />
                      <TransactionsBody />
              </div>
    </div>
  )
}

export default AdminTransactions