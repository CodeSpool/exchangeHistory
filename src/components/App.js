import React from 'react'
import FileSelector from './FileSelector'
import CurrencySelector from './CurrencySelector'
import ResultTable from './ResultTable'
import axios from 'axios'

const currencyList = ['EUR', 'USD', 'JPY', 'CAD', 'CHF', 'GBP']
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: [],
      fileData: [],
      selectedCurrency: 'EUR'
    }

    this.handleApiCall = this.handleApiCall.bind(this)
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
  }

  handleApiCall (fileData) {
    console.log('####', this.state)
    axios.post('/api/bestdays', {
      'data': fileData,
      'currency': this.state.selectedCurrency
    }).then(response => {
      this.setState({tableData: response.data})
    })
  }

  handleCurrencyChange (currency) {
    this.setState({selectedCurrency: currency})
    if (this.state.fileData.length > 0) {
      this.setState({tableData: []})
      this.handleApiCall(this.state.fileData)
    }
  }

  handleFileChange (fileData) {
    console.log(fileData)
    this.setState({tableData: []})
    this.setState({fileData: fileData})
    this.handleApiCall(fileData)
  }
  render () {
    return <div className='mw5 mw7-ns center bg-light-gray pa3 ph5-ns'>
      <h1 className='mt0'>Currency history checker</h1>
      <CurrencySelector
        currencyList={currencyList}
        changeHandler={this.handleCurrencyChange}
      />
      <FileSelector changeHandler={this.handleFileChange} />
      <ResultTable tableData={this.state.tableData} />
    </div>
  }
}

export default App
