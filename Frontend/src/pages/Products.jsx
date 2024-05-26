import { useState, useEffect } from "react";
import LayoutPage from "../components/LayoutPage";
import axios from "axios";
import { useNavigate } from "react-router";

const Productos = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();  

  const allProducts = () => {
    axios
      .get("http://localhost:3000/product/list")
      .then(function (response) {
        // manejar respuesta exitosa
        setProducts(response.data.products);
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      })
      .finally(function () {
        // siempre sera executado
      });
  };

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3000/product/delete/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      })
      .finally(function () {
        // siempre sera executado
        allProducts();
      });
  };

  const headers = [
    {
      title: "Image",
      prop: "button",
      cell: (row) => (
          <img src={row.imageUrl} width="36px" height="36px" alt={row.name} />
      ),
    },
    { title: "Nombre", prop: "name" },
    { 
      title: "Precio", 
      prop: "price", 
      cell: (row) => (
        <span>{Number(row.price).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
      ) 
    },    
    { title: "Stock", prop: "stock" },
    {
      title: "Acciones",
      prop: "button",
      cell: (row) => (
        <div>
          <button
            className="btn btn-warning mr-3"
            onClick={() =>
              navigate(`/agregar-producto/`, { state: { data: row } } )
            }
          >
            Editar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => deleteProduct(row.id_product)}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    allProducts();
  }, []);

  console.log(products);
  return (
    <LayoutPage
      title={"Productos"}
      textBtnAdd={"Agregar producto"}
      headers={headers}
      body={products}
      linkBtnAdd={'/agregar-producto'}
    />
  );
};

export default Productos;
