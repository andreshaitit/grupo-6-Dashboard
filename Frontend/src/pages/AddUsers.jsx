import React from 'react'
import FormUser from '../components/FormUser'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router';

const AddUsers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state?.data;
  return (
    <div className="container-fluid p-5">
      <div className="row">
        <div className="col-2">
          <IoIosArrowRoundBack
            size={48}
            onClick={() => navigate("/usuarios")}
          />
        </div>
        <div className="col-10">
          <h1>{data ? "Editar Usuario" : "Agregar Usuario"}</h1>
        </div>
        <div className="col-8 offset-1">
          <FormUser dataEdit={data} />
        </div>
      </div>
    </div>
  );
}

export default AddUsers