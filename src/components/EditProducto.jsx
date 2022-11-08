import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase/fireConfig";
import { doc, updateDoc } from "firebase/firestore";
import { ContextData } from "../context/ContextData";
import "./css/EditModal.css";
function EditProducto() {
  //context
  const { producto, setProducto, editModal, setEditModal } =
    useContext(ContextData);

  //variables del producto
  const [nombre, setNombre] = useState(producto.nombre);
  const [descripcion, setDescripcion] = useState(producto.descripcion);
  const [descripcionLarga, setDescripcionLarga] = useState(producto.descripcionLarga);
  const [tipoAroma, setTipoAroma] = useState(producto.tipoAroma);
  const [tipoProducto, setTipoProducto] = useState(producto.tipoProducto);
  const [publicado, setPublicado] = useState(producto.publicado);

  //varibales de validaciones
  const [errNombre, setErrNombre] = useState("");
  const [errDescripcion, setErrDescripcion] = useState("");
  const [errTipoAroma, setErrTipoAroma] = useState("");
  const [errTipoProducto, setErrTipoProducto] = useState("");
  const [errPublicado, setErrPublicado] = useState("");

  //funciones
  const validarNombre = (e) => {
    return e.trim()
      ? (setErrNombre(""), setNombre(e))
      : (setErrNombre("El nombre no puede quedar vacio"), setNombre(e));
  };
  const validarDescripcion = (e) => {
    return e.trim()
      ? (setErrDescripcion(""), setDescripcion(e))
      : (setErrDescripcion("La descripción no puede quedar vacía"),
        setDescripcion(e));
  };
  const validarDescripcionLarga = (e) => {
    return e.trim()
      ? (setErrDescripcion(""), setDescripcion(e))
      : (setErrDescripcion("La descripción larga no puede quedar vacía"),
        setDescripcion(e));
  };
  const validarTipoAroma = (e) => {
    return e.trim()
      ? (setErrTipoAroma(""), setTipoAroma(e))
      : (setErrTipoAroma("El tipo de aroma no puede quedar vacío"),
        setTipoAroma(e));
  };
  const validarTipoProducto = (e) => {
    return e.trim()
      ? (setErrTipoProducto(""), setTipoProducto(e))
      : setErrTipoProducto("El tipo de producto no puede quedar vacío");
  };
  const validarPublicado = (e) => {
    return errNombre || errDescripcion || errTipoAroma || errTipoProducto
      ? setErrPublicado(
          "No se puede realizar esta acción si otros campos tienen errores"
        )
      : (setPublicado(e.target.checked),
        setErrPublicado(""),
        console.log(publicado));
  };

  const editProducto = async (e) => {
    e.preventDefault();
    console.log("clicked");
    if (!errNombre && !errDescripcion && !errTipoAroma && !errTipoProducto) {
      const docu = doc(db, "productoBelie", producto.id);
      const newDocu = {
        nombre: nombre,
        descripcion: descripcion,
        descripcion: descripcionLarga,
        tipoAroma: tipoAroma,
        tipoProducto: tipoProducto,
        publicado: publicado,
      };

      await updateDoc(docu, newDocu).then(alert("Producto modificado ok"));
    }
  };
  const ocultarModal = (e) => {
    //Si se hizo click solo en el componente padre
    return e.target == e.currentTarget ? 
    (setEditModal(false),
    setProducto(null)) : "";
  };

  return (
    <div
      className={editModal ? "modalEdit displayOn" : "displayOff"}
      onClick={(e) => ocultarModal(e)}
    >
      <div className="modalContent">
        <div className="cardModal bg_nude">
          <form
            className="registerForm"
            method="post"
            onSubmit={(e) => editProducto(e)}
          >
            <h1>Editar producto</h1>
            <p>Escribe sobre los campos a editar.</p>
            <hr />
            <div className="row">
              <label htmlFor="nombre">Nombre</label>
              <input
                className={errNombre ? "inputError" : "rowInput"}
                type="text"
                value={nombre}
                name="nombre"
                onChange={(e) => validarNombre(e.target.value)}
              />
              <span htmlFor="nombre">{errNombre}</span>
            </div>
            <div className="row">
              <label htmlFor="descripcion">Descripcion:</label>
              <textarea
                className={errDescripcion ? "inputError" : "rowInput"}
                maxLength="140"
                value={descripcion}
                name="descripcion"
                onChange={(e) => validarDescripcion(e.target.value)}
              />
              <span htmlFor="descripcion">{errDescripcion}</span>
            </div>
            <div className="row">
              <label htmlFor="descripcion">Descripcion Larga:</label>
              <textarea
                className={errDescripcion ? "inputError" : "rowInput"}
                maxLength="140"
                value={descripcionLarga}
                name="descripcion"
                onChange={(e) => validarDescripcionLarga(e.target.value)}
              />
              <span htmlFor="descripcion">{errDescripcion}</span>
            </div>
            <div className="row">
              <label htmlFor="tipoAroma">TipoAroma:</label>
              <input
                className={errTipoAroma ? "inputError" : "rowInput"}
                type="text"
                value={tipoAroma}
                name="tipoAroma"
                onChange={(e) => validarTipoAroma(e.target.value)}
              />
              <span htmlFor="tipoAroma">{errTipoAroma}</span>
            </div>
            <div className="row">
              <label htmlFor="pass">TipoProducto:</label>
              <input
                className={errTipoProducto ? "inputError" : "rowInput"}
                type="text"
                value={tipoProducto}
                name="pass"
                onChange={(e) => validarTipoProducto(e.target.value)}
              />
              <span htmlFor="pass">{errTipoProducto}</span>
            </div>
            <div className="rowCheckBox">
              <label htmlFor="publicado">
                Publicado:
                <input
                  className="rowCheckBoxInput"
                  type="checkbox"
                  checked={publicado}
                  name="publicado"
                  onChange={(e) => validarPublicado(e)}
                />
              </label>

              <span className="centroT" htmlFor="publicado">
                {errPublicado}
              </span>
            </div>
            <div className="row">
              <button
                disabled={
                  errNombre || errDescripcion || errTipoAroma || errTipoProducto
                    ? true
                    : false
                }
                className="submit"
                type="submit"
              >
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditProducto;
