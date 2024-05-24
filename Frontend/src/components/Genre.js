import React from 'react';

function Genre({categorie}){
    return(
        <React.Fragment>
            <div className="col-lg-6 mb-4">
                <div className="card text-white bg-dark  shadow">
                    <div className="card-body row">
                        <div>
                        {categorie?.name}
                        </div>
                        <div>
                        {categorie?.name}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Genre;