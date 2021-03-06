import React, { Component } from 'react';
import AccountsTable from '../components/AccountsTable';
import AccountTotal from '../components/AccountTotal';
import { connect } from 'react-redux';
import { getAccounts, getTotal} from '../actions/accounts';

class AccountsContainer extends Component {

  componentDidMount(){
    this.props.getTotal();
    this.props.getAccounts();
  }

  state = {
    update: false,
    id: ''
  }

  handleOnClick = (event, id) => {
    event.preventDefault();
    this.setState({
      update: true,
      id: id
    })
  }

  handleFormSubmit = () => {
    this.setState({
      update: false
    })
  }

  render() {
    console.log("AccountsContainer props are:", this.props.accounts)
    return(
      <>
        <div className="welcome">
        <h2>Welcome!</h2>
        <h6>Your account overview is below. Happy saving :)</h6>
        </div>

        <AccountTotal total={this.props.total} />

        <AccountsTable
          accounts={this.props.accounts}
          state={this.state}
          handleOnClick={this.handleOnClick}
          handleFormSubmit={this.handleFormSubmit}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    //is accounts.accounts. not considered best practice? Or is this okay?
    accounts: state.accounts.accounts,
    total: state.accounts.total
  })
}

export default connect(mapStateToProps, { getAccounts, getTotal })(AccountsContainer)
