import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const FormProduct = ({ dataEdit }) => {
  // Estados / datos del form
  const [image, setImage] = useState();
  const [idMark, setIdMark] = useState();
  const [name, setName] = useState();
  const [characteristics, setCharacteristics] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [warranty, setWarranty] = useState();
  const [shipping, setShipping] = useState();
  const [stock, setStock] = useState();
  const [idCategory, setIdCategory] = useState();
  const [idState, setIdState] = useState();
  const [description, setDescription] = useState();
  
  // Estados / Selects
  const [allDataSelect, setAllDataSelect] = useState([])
  
  const [loading, setLoading] = useState(true);
  // Traer todas las marcas para el select
  const getAllMarks = () => {
    axios.get('http://localhost:3000/product/create').then((response) =>{
      setAllDataSelect(response.data);
      console.log(response)
      setLoading(false)
    }).catch(error => {
      console.log(error)
    })
  }

  //Navegacion
  const navigate = useNavigate();

  // const resetForm = () => {
  //   setFirstName("");
  //   setLastName("");
  //   setEmail("");
  //   setPassword("");
  //   setPasswordTwo("");
  //   setCategory(false);
  // };

  const crearProducto = (e) => {
    e.preventDefault();
    
    const product = {
      name,
      mark : idMark,
      characteristics,
      price,
      discount,
      warranty,
      shipping,
      stock,
      category: idCategory,
      state: idState,
      description,
      image,
    }
    
    console.log(product);
    
    axios.post('http://localhost:3000/product/create', product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response)=>{
      console.log(response)
    })
  };

  console.log(dataEdit);
  
  useEffect(() => {
    getAllMarks();
    // if (dataEdit) {
    //   setFirstName(dataEdit.firstName);
    //   setLastName(dataEdit.lastName);
    //   setEmail(dataEdit.email);
    //   setCategory(dataEdit.category);
    // }
  }, []);


  return (
    <>
    {!loading && (
    <form onSubmit={crearProducto}>
      <label className="form-label mt-3">Imagen</label>

      <input
        className="form-control"
        type="file"
        name="image"
        id="image"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <label className="form-label mt-3">Marca</label>
      <select class="form-select" aria-label="Default select example" onChange={(e)=>setIdMark(e.target.value)}>
        <option selected>Selecciona una marca</option>
        {allDataSelect.marcas.map(marca => (
          <option value={marca.id}>{marca.name}</option>
        ))}
      </select>

      <label className="form-label mt-3">Nombre</label>
      <input
        className="form-control"
        type="text"
        name="name"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="form-label mt-3">Caracteristicas</label>
      <textarea
        className="form-control"
        name="charateristic"
        placeholder="Aqui puedes especificar las principales caracteristicas de tu producto"
        value={characteristics}
        onChange={(e) => setCharacteristics(e.target.value)}
      />

      <label className="form-label mt-3">Precio</label>

      <input
        className="form-control"
        type="number"
        name="price"
        placeholder="Contraseña"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label className="form-label mt-3">Descuento</label>

      <input
        className="form-control"
        type="number"
        name="discount"
        placeholder="Ingresar solo el numero del porcentaje"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        max={100}
        min={0}
      />

      <label className="form-label mt-3">Garantia</label>
      <input
        type="number"
        id="warranty"
        value={warranty}
        className="form-control"
        required
        placeholder="Ingresar numero de meses"
        onChange={(e)=>setWarranty(e.target.value)}
      />
      
      <label className="form-label mt-3">Envio gratis</label>
      <select class="form-select" aria-label="Default select example" onChange={(e)=>setShipping(e.target.value)}>
        <option disabled selected hidden>Selecciona una marca</option>
        <option value="true">Si</option>
        <option value="false">Acordar</option>
      </select>
      
      <label className="form-label mt-3">Stock</label>
      <input
        type="number"
        id="stock"
        value={stock}
        onChange={(e)=>setStock(e.target.value)}
        className="form-control"
        required
        placeholder="Ingresar numero"
      />
      
      <label className="form-label mt-3">Categoria</label>
      <select class="form-select" aria-label="Default select example" onChange={(e)=>setIdCategory(e.target.value)}>
        <option disabled selected hidden>Selecciona una marca</option>
        {allDataSelect.categorias.map(categoria => (
          <option value={categoria.id}>{categoria.name}</option>
        ))}
      </select>
      
      <label className="form-label mt-3">Estado</label>
      <select class="form-select" aria-label="Default select example" onChange={(e)=>setIdState(e.target.value)}>
        <option disabled selected hidden>Selecciona una marca</option>
        {allDataSelect.estados.map(estado => (
          <option value={estado.id}>{estado.name}</option>
        ))}
      </select>
      
      <label className="form-label mt-3">Descripcion</label>
      <textarea
        className="form-control"
        name="description"
        placeholder="Describe como quieres vender el producto"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />


      <div className="row mt-5">
        <div className="offset-9 col-3">
          <button
            className="btn btn-danger mt-3 mr-2"
            onClick={() => navigate("/usuarios")}
          >
            Cancelar
          </button>
          <button className="btn btn-primary mt-3" type="submit">
            {dataEdit ? "Editar producto" : "Guardar producto"}
          </button>
        </div>
      </div>
    </form>
    )}
    </>
  );
};

export default FormProduct;
