import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const FormUser = ({ dataEdit }) => {

  // Estados / datos del form
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordTwo, setPasswordTwo] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();

  //Navegacion
  const navigate = useNavigate();

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPasswordTwo("");
    setCategory(false);
  };

  const crearUsuario = (e) => {
    e.preventDefault();
    let user = {
      firstName,
      lastName,
      email,
      password,
      category,
      image
    };

    if (dataEdit.userId) {
      axios
        .put(`http://localhost:3000/user/edit/${dataEdit.userId}`, user, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          resetForm();
          navigate("/usuarios");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post("http://localhost:3000/user/register", user, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          resetForm();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (dataEdit) {
      setFirstName(dataEdit.firstName);
      setLastName(dataEdit.lastName);
      setEmail(dataEdit.email);
      setCategory(dataEdit.category);
    }
  }, []);

  return (
    <form onSubmit={crearUsuario}>
      <label className="form-label mt-3">Nombre</label>
      <input
        className="form-control"
        type="text"
        name="firstName"
        placeholder="Nombre"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <label className="form-label mt-3">Apellido</label>
      <input
        className="form-control"
        type="text"
        name="lastName"
        placeholder="Apellido"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <label className="form-label mt-3">Correo</label>
      <input
        className="form-control"
        type="email"
        name="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="form-label mt-3">Contraseña</label>

      <input
        className="form-control"
        type="password"
        name="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label className="form-label mt-3">Repite la Contraseña</label>

      <input
        className="form-control"
        type="password"
        name="passwordConfirmation"
        placeholder="Repite la contraseña"
        value={passwordTwo}
        onChange={(e) => setPasswordTwo(e.target.value)}
      />

      <label className="form-check-label my-3">Rol del usuario</label>
      <div className="d-flex gap-5 ml-3">
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onChange={() => setCategory(false)}
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
            onChange={() => setCategory(true)}
            checked={category}
          />
          <label className="form-check-label" htmlFor="exampleCheck2">
            Admin
          </label>
        </div>
      </div>

      <label className="form-label mt-3">Imagen</label>

      <input
        className="form-control"
        type="file"
        name="image"
        id="image"
        onChange={(e) => setImage(e.target.files[0])}
      />

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
          <button
            className="btn btn-danger mt-3 mr-2"
            onClick={() => navigate("/usuarios")}
          >
            Cancelar
          </button>
          <button className="btn btn-primary mt-3" type="submit">
            {dataEdit === 0 ? "Guardar usuario" : "Editar usuario"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormUser;
