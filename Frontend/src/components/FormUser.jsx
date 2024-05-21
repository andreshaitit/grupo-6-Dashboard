import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";

const FormUser = ({ edit }) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordTwo, setPasswordTwo] = useState();
    const [category, setCategory] = useState();
    const [image, setImage] = useState();
    
  const id = useParams();
  
  const resetForm = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setPasswordTwo('')
    setCategory(false)
  }
  
  const crearUsuario = (e) => {
    e.preventDefault()
    
    // const 
    let user = {
        firstName,
        lastName,
        email,
        password,
        category
    }
    
    axios.post('http://localhost:3000/user/register', user)
    .then((response)=>{
        console.log(response)
        resetForm();
    }).catch((error)=>{
        console.log(error)
    })
  }

  return (
    <form onSubmit={crearUsuario}>
      <label className="form-label mt-3">Nombre</label>
      <input
        className="form-control"
        type="text"
        name="firstName"
        placeholder="Nombre"
        value={firstName}
        onChange={(e)=>setFirstName(e.target.value)}
      />

      <label className="form-label mt-3">Apellido</label>
      <input
        className="form-control"
        type="text"
        name="lastName"
        placeholder="Apellido"
        value={lastName}
        onChange={(e)=>setLastName(e.target.value)}
      />

      <label className="form-label mt-3">Correo</label>
      <input
        className="form-control"
        type="email"
        name="email"
        placeholder="Correo"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <label className="form-label mt-3">Contraseña</label>

      <input
        className="form-control"
        type="password"
        name="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <label className="form-label mt-3">Repite la Contraseña</label>

      <input
        className="form-control"
        type="password"
        name="passwordConfirmation"
        placeholder="Repite la contraseña"
        value={passwordTwo}
        onChange={(e)=>setPasswordTwo(e.target.value)}
      />

      <label className="form-check-label my-3">
        Rol del usuario
      </label>
      <div className="d-flex gap-5 ml-3">
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onChange={()=>setCategory(false)}
            checked={!category}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Comprador
          </label>
        </div>
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck2"
            onChange={()=>setCategory(true)}
            checked={category}
          />
          <label className="form-check-label" htmlFor="exampleCheck2">
            Admin
          </label>
        </div>
      </div>

      <label className="form-label mt-3">Imagen</label>
        
      <input className="form-control" type="file" name="image" id="image" onChange={(e)=>setImage(e.target.value)}/>

      <input
        type="checkbox"
        id="cbox1"
        value="first_checkbox"
        className="checkbox mt-3"
        required
      />
      <label className="label-control mt-3 ml-2">
        Al registrarse acepta nuestro <a href="#">términos y condiciones</a>
      </label>

      <div className="row mt-5">
        <div className="offset-9 col-3">
          <button className="btn btn-danger mt-3 mr-2" type="submit">
            Cancelar
          </button>
          <button className="btn btn-primary mt-3" type="submit">
            {Object.keys(id).length === 0
              ? "Guardar usuario"
              : "Editar usuario"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormUser;
