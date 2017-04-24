import React from 'react'

class CurrencySelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentCy: 'EUR'
    }
  }

  setCurrent (currency) {
    this.setState({currentCy: currency})
  }

  render () {
    const currencyButtons = this.props.currencyList.map((currency, index) => {
      return (
        <a
          key={index}
          className={'fl f6 link ba ph3 pv2 mb2 mh2 dib near-black br3 pointer hover-bg-lightest-blue' + (this.state.currentCy === currency ? ' b' : '')}
          onClick={this.setCurrent.bind(this, currency)}>{currency}</a>
      )
    })
    return (
      <div className='cf ph5'>
        {currencyButtons}
      </div>
    )
  }
}

export default CurrencySelector
