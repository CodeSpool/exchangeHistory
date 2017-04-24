import React from 'react'
import FileSelector from './FileSelector'
import CurrencySelector from './CurrencySelector'
import ResultTable from './ResultTable'
const currencyList = ['EUR', 'USD', 'JPY', 'CAD', 'CHF', 'GBP']
class App extends React.Component {
  render () {
    return <div className='mw5 mw7-ns center bg-light-gray pa3 ph5-ns'>
      <h1 className='mt0'>Currency history checker</h1>
      <CurrencySelector currencyList={currencyList} />
      <FileSelector />
      <ResultTable />
    </div>
  }
}

export default App
