import React from 'react'
import FormUser from '../components/FormUser'

const EditUsers = () => {
  return (
    <div className='container-fluid p-5'>
        <div className='row'>
            <div className='col-12'><h1>Editar Usuario</h1></div>
            <div className='col-8 offset-1'>
                <FormUser />
            </div>
        </div>
    </div>
  )
}

export default EditUsers