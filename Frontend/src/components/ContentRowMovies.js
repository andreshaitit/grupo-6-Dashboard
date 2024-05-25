import React from 'react';
import SmallCard from './SmallCard';

let productInDataBase = {
    color:   "primary",
    titulo: "Total Productos",
    valor: 21,
    icono: "fas fa-film",
}

let amount ={
    color:   "success",
    titulo: "Total usuarios",
    valor: 79,
    icono: "fas fa-award",
}

let user = {
    color:   "warning",
    titulo: "Total categorias",
    valor: 49,
    icono: "fas fa-user",
}

let cardProps = [productInDataBase,amount,user];


function ContentRowTop({data}){
    console.log(data)
    return (
        <React.Fragment>
        {/*<!-- Content Row -->*/}
        <div className="row">
            
            <div className="col-md-4 mb-4">
                <div className={`card border-left-primary shadow h-100 py-2`}>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className={`text-xs font-weight-bold text-primary text-uppercase mb-1`}> Total Producto</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{data.products.length}</div>
                            </div>
                            <div className="col-auto">
                                <i className={`fas fa-film fa-2x text-gray-300`}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-md-4 mb-4">
                <div className={`card border-left-success shadow h-100 py-2`}>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className={`text-xs font-weight-bold text-success text-uppercase mb-1`}> Total Usuario</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{data.usersCount}</div>
                            </div>
                            <div className="col-auto">
                                <i className={`fas fa-film fa-2x text-gray-300`}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-md-4 mb-4">
                <div className={`card border-left-warning shadow h-100 py-2`}>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className={`text-xs font-weight-bold text-warning text-uppercase mb-1`}> Total Categorias</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{data.countByCategory.length}</div>
                            </div>
                            <div className="col-auto">
                                <i className={`fas fa-film fa-2x text-gray-300`}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>
    )
}
export default ContentRowTop;