import React, { useEffect } from 'react';
import TopBar from './TopBar';
import ContentRowTop from './ContentRowTop';
import Movie from './Movie';
import Footer from './Footer';
import { useState } from 'react';
import axios from 'axios';
function Main(){
    
    const [data, setData] = useState()
    
    const allData = () => {
        axios.get('http://localhost:3000/product/list')
        .then(function (response) {
          // manejar respuesta exitosa
          setData(response.data);
        })
        .catch(function (error) {
          // manejar error
          console.log(error);
        })
        .finally(function () {
          // siempre sera executado
        });
    }
    
    useEffect(() => {
      allData()
    }, [])

    return (
        <React.Fragment>
            {/*<!-- Content Wrapper -->*/}
            <div id="content-wrapper" className="d-flex flex-column">
                {/*<!-- Main Content -->*/}
                <div id="content">
                    <TopBar />
                    <ContentRowTop data={data} />
                    <Movie />
                    <Footer />
                </div>
            </div>    
        </React.Fragment>
    )
}
export default Main;