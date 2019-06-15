import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAccounts} from '../actions/accounts';
import DebitFirstInput from '../components/DebitFirstInput'
import DebitSecondInput from '../components/DebitSecondInput'
import { createTransaction } from '../actions/transactions'

class DebitContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_submit: false,
      authenticate: false,
      value: '',

      //Initial state for form
      amount: '',
      counterparty: '',
      date: new Date(),
      account_id: 1,
      parent_id: '',
      debit: true,
      percentage: '',
    }
    this.handleDateChange = this.handleDateChange.bind(this);
  }

    componentDidMount(){
      this.props.getAccounts()
    }

    handleOnChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

    handleDateChange(date) {
      this.setState({
        date: date
      })
    }

    handleFirstSubmit = event => {
      event.preventDefault();
      this.props.createTransaction(this.state)
      this.setState({ first_submit: true })
    }

    handleSecondSubmit = event => {
      event.preventDefault();
      this.props.createTransaction(this.state)
      this.setState({
        first_submit: false,
        authenticate: true,
        amount: '',
        counterparty: '',
        date: '',
        account_id: 1,
        parent_id: '',
        debit: true,
        percentage: '',
     })
    }

    render() {
      //Redirect to accounts page when form is submitted
      if (this.state.authenticate === true) {
        return <Redirect to='/' />
      }

      return(
        <>
          {this.state.first_submit ? null : <DebitFirstInput
            state={this.state}
            handleDateChange={this.handleDateChange}
            handleOnChange={this.handleOnChange}
            handleFirstSubmit={this.handleFirstSubmit} />
          }
          {this.state.first_submit ? <DebitSecondInput
            state={this.state}
            handleDateChange={this.handleDateChange}
            accounts={this.props.accounts}
            handleOnChange={this.handleOnChange}
            handleSecondSubmit={this.handleSecondSubmit}/> : null
          }
          
          <DebitSecondInput state={this.state} accounts={this.props.accounts} handleOnChange={this.handleOnChange} handleSecondSubmit={this.handleSecondSubmit}/>
        </>
      )
    }
  }

const mapStateToProps = (state) => {
  return {
    //is accounts.accounts. not considered best practice? Or is this okay?
    accounts: state.accounts.accounts,
  }
}

export default connect(mapStateToProps, {
  getAccounts,
  createTransaction,
})(DebitContainer)
