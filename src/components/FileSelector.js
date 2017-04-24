import React from 'react'

class FileSelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fileList: this.readLocalStorageList() || [],
      selectedFile: {}
    }
    this.handleLoadFileClick = this.handleLoadFileClick.bind(this)
    this.LoadFile = this.LoadFile.bind(this)
    this.writeToLocalStorage = this.writeToLocalStorage.bind(this)
    this.readLocalStorageList = this.readLocalStorageList.bind(this)
  }

  handleLoadFileClick () {
    this.fileInputElement.click()
  }

  handleSelectFileClick (file) {
    this.setState({selectedFile: file})
  }

  handleRemoveFileClick (index, e) {
    e.stopPropagation()
    let updatedList = this.state.fileList
    if (updatedList[index].hash === this.state.selectedFile.hash) {
      this.setState({selectedFile: {}})
    }
    updatedList.splice(index, 1)
    this.setState({fileList: updatedList})
    this.writeToLocalStorage()
  }

  LoadFile (e) {
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]
    let list = this.state.fileList
    let isFileInDb = -1

    reader.onloadend = () => {
      let fileHash = this.getHashCode(reader.result)
      let data = JSON.parse(reader.result)

      list.forEach((element, index) => {
        if (element.hash === fileHash) {
          isFileInDb = index
        }
      })

      if (isFileInDb < 0) {
        list.push({
          hash: fileHash,
          data: data,
          timestamp: Date.now()
        })
      } else {
        list[isFileInDb] = {
          hash: fileHash,
          data: data,
          timestamp: Date.now()
        }
      }
      this.setState({fileList: list})
      this.writeToLocalStorage()
    }
    reader.readAsText(file)
  }

  readLocalStorageList () {
    const fileList = localStorage.getItem('currencyFiles')
    if (fileList) {
      return JSON.parse(fileList)
    }
  }

  writeToLocalStorage () {
    localStorage.setItem('currencyFiles', JSON.stringify(this.state.fileList))
  }


  getHashCode (fileContent) {
    let hash = 0
    let char = ''
    if (fileContent.length === 0) {
      return hash
    }
    for (let i = 0, max = fileContent.length; i < max; i += 1) {
      char = fileContent.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return hash
  }


  render () {
    const fileList = this.state.fileList.map((item, index) => {
      let date = new Date(item.timestamp)
      return <li
        key={item.hash}
        className={'ph3 pv2 bb b--light-silver hover-bg-lightest-blue pointer' + (this.state.selectedFile.hash === item.hash ? ' b' : '')}
        onClick={this.handleSelectFileClick.bind(this, item)}>
        <span>{date.toLocaleDateString()}, {date.toLocaleTimeString()}, <strong>{item.data.length}</strong> transactions</span>
        <span className='close grow-large' onClick={this.handleRemoveFileClick.bind(this, index)}>X</span>
      </li>
    })

    return (
      <div>
        <ul className='list pl0 ml0 center mw7 ba b--light-silver br3 pointer'>
         {fileList}
          <li
            className='ph3 pv2 hover-bg-lightest-blue'
            onClick={this.handleLoadFileClick}>
              Load new file
          </li>
        </ul>
        <input
          type='file'
          className='hidden'
          ref={input => { this.fileInputElement = input }}
          onChange={this.LoadFile} />
      </div>
    )
  }
}

export default FileSelector
