import React from 'react';

function Genre({categorie}){
    return(
        <React.Fragment>
            <div className="col-lg-6 mb-4">
                <div className="card text-white bg-dark  shadow">
                    <div className="card-body row">
                        <div className='col-10'>
                        {categorie?.name}
                        </div>
                        <div className='col-2'>
                        {categorie?.count}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Genre;