import React from 'react'

class CurrencySelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div className='ph3 mt4'>
        <a className='f6 link dim ba ph3 pv2 mb2 dib near-black' href='#0'>EUR</a>
      </div>
    )
  }
}

export default CurrencySelector
