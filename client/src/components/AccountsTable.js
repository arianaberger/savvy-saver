import React from 'react';
import AccountRow from './AccountRow';

const AccountsTable = (props) => {

  const displayAccounts = () => {
    return props.accounts.map(account => {
      return <AccountRow
        account={account}
        handleFormSubmit={props.handleFormSubmit}
        handleOnClick={props.handleOnClick}
        state={props.state}
        key={account.id}
      />
    })
  }

  return (
    <div className="account-wrapper">
      <table className="accounts">
        <thead>
          <tr className="account-table-header">
            <th>ACCOUNT NAME</th>
            <th>ACCOUNT BALANCE</th>
            <th>EDIT</th>
          </tr>
        </thead>
        <tbody>{displayAccounts()}</tbody>
      </table>
    </div>
  )
}

export default AccountsTable;
