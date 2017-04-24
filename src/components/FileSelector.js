import React from 'react'

class FileSelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fileList: this.readLocalStorageList() || [],
      selectedHash: ''
    }
    this.handleLoadFileClick = this.handleLoadFileClick.bind(this)
    this.LoadFile = this.LoadFile.bind(this)
    this.writeToLocalStorage = this.writeToLocalStorage.bind(this)
    this.readLocalStorageList = this.readLocalStorageList.bind(this)
  }

  handleLoadFileClick () {
    this.fileInputElement.click()
  }

  LoadFile (e) {
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]
    let list = this.state.fileList
    let isFileInDb = false

    reader.onloadend = () => {
      let fileHash = this.getHashCode(reader.result)
      let data = JSON.parse(reader.result)

      list.forEach(element => {
        if (element.hash === fileHash) {
          isFileInDb = true
        }
      })

      if (!isFileInDb) {
        list.push({
          hash: fileHash,
          data: data,
          time: Date.now()
        })
        this.setState({fileList: list})
        this.writeToLocalStorage()
      }
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
    const fileList = this.state.fileList.map(item => {
      return <li
        key={item.hash}
        className='ph3 pv2 bb b--light-silver hover-bg-lightest-blue pointer'
        onClick={this.handleSelectFileClick}>
          {item.time}
      </li>
    })

    return (
      <div>
        <ul className='list pl0 ml0 center mw5 ba b--light-silver br3 pointer'>
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
