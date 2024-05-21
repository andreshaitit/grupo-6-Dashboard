import React from 'react'
import DataTable from './DataTable'

const LayoutPage = ({title, textBtnAdd, body, headers, linkBtnAdd}) => {
  return (
    <div className='container-fluid p-5'>
        <div className="row">
            <div className='col-12'>
                <DataTable titleTable={title} textBtnAdd={textBtnAdd} body={body} headers={headers} linkBtnAdd={linkBtnAdd}/>
            </div>
        </div>
    </div>
  )
}

export default LayoutPage