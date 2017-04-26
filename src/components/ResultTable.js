import React from 'react'

class ResultTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    const rows = this.props.tableData.map((row, index) => {
      return (
        <tr key={index}>
          <td className="pv3 pr3 bb b--black-20">{index + 1}</td>
          <td className="pv3 pr3 bb b--black-20 width100">{row.day}</td>
          <td className="pv3 pr3 bb b--black-20">{row.totalAfterConversion.toFixed(2)}</td>
          <td className="pv3 pr3 bb b--black-20">{JSON.stringify(row.conversions)}</td>
        </tr>
      )
    })
    return (
      <div className="pa4">
        <div className="overflow-auto">
          <table className="f6 w-100 mw8 center" cellSpacing="0">
            <thead>
              <tr>
                <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Pos.</th>
                <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white width100">Date</th>
                <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Total</th>
                <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Conversions</th>
              </tr>
            </thead>
            <tbody className="lh-copy">
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default ResultTable
