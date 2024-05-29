import React from 'react';
import imagenFondo from '../assets/images/mandalorian.jpg';
import GenresInDb from './GenresInDb';
import ContentRowMovies from './ContentRowMovies';
function ContentRowTop({data, dataTable}){
	const {top} = dataTable;
    return(
        <React.Fragment>
				{/*<!-- Content Row Top -->*/}
				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
					</div>

					<ContentRowMovies data={data} />					
	
					<div className="row">
						{/*<!-- Last Movie in DB -->*/}
						<div className="col-lg-6 mb-4">
							<div className="card shadow mb-4">
								<div className="card-header py-3">
									<h5 className="m-0 font-weight-bold text-gray-800">Ultimo producto agregado</h5>
								</div>
								<div className="card-body">
									<div className="text-center">
										<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} alt=" Star Wars - Mandalorian "/>
									</div>
									<p>{top.name}</p>
									<a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Ver producto</a>
								</div>
							</div>
						</div>

						<GenresInDb data={data} />
	
					</div>
				</div>

        </React.Fragment>
    )

}
export default ContentRowTop;