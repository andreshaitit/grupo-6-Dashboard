import React, { useEffect, useState } from "react";
import LayoutPage from "../components/LayoutPage";
import axios from "axios";
import { useNavigate } from "react-router";

const Users = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate();
  
  const allUser = () => {
    axios.get('http://localhost:3000/user/users')
    .then(function (response) {
      // manejar respuesta exitosa
      setUsers(response.data);
    })
    .catch(function (error) {
      // manejar error
      console.log(error);
    })
    .finally(function () {
      // siempre sera executado
    });
  }
  
  const deleteUser = (id) => {
   axios.delete(`http://localhost:3000/user/delete/${id}`)
   .then((response) => {
    console.log(response)
   }).catch(function (error) {
    // manejar error
    console.log(error);
  })
  .finally(function () {
    // siempre sera executado
    allUser()
  });
  }
  
  useEffect(() => {
    allUser()
  }, [])
  
  
  const headers = [
    { title: "Nombre", prop: "firstName" },
    { title: "Apellido", prop: "lastName" },
    { title: "Email", prop: "email" },
    { title: "Categoria", prop: "category", cell: (row) => (
      <span> {row.category === 1 ? "Admin" : "Comprador" } </span>
    ), },
    { title: "Creacion", prop: "fecha_creacion" },
    {
      title: "Acciones",
      prop: "button",
      cell: (row) => (
        <div>
          <button
            className="btn btn-warning mr-3"
            onClick={() => navigate(`/editar-usuario/${row.userId}`)}
          >
            Editar
          </button>
          <button className="btn btn-danger" onClick={()=>deleteUser(row.userId)}>
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <LayoutPage
      textBtnAdd={"Agregar usuario"}
      title={"Usuarios"}
      body={users}
      headers={headers}
      linkBtnAdd={'/agregar-usuario'}
    />
  );
};

export default Users;
