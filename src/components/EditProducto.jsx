import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase/fireConfig";
import { doc, updateDoc } from "firebase/firestore";
import { ContextData } from "../context/ContextData";
import "./css/EditModal.css";
function EditProducto() {
  //context
  const { producto, setProducto, editModal, setEditModal,actualizar,setActualizar } =
    useContext(ContextData);

  //variables del producto
  const [nombre, setNombre] = useState(producto.nombre);
  const [descripcion, setDescripcion] = useState(producto.descripcion);
  const [descripcionLarga, setDescripcionLarga] = useState(producto.descripcionLarga);
  const [tipoAroma, setTipoAroma] = useState(producto.tipoAroma);
  const [idealPara, setIdealPara] = useState(producto.idealPara)
  const [tipoProducto, setTipoProducto] = useState(producto.tipoProducto);
  const [proximamente, setProximamente] = useState(producto.proximamente);
  const [oculto, setOculto] = useState(producto.oculto);

  //varibales de validaciones
  const [errNombre, setErrNombre] = useState("");
  const [errDescripcion, setErrDescripcion] = useState("");
  const [errDescripcionLarga, setErrDescripcionLarga] = useState("");
  const [errTipoAroma, setErrTipoAroma] = useState("");
  const [errTipoProducto, setErrTipoProducto] = useState("");
  const [errProximamente, setErrproximamente] = useState("");
  const [errOculto, setErrOculto] = useState("");
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
      ? (setErrDescripcionLarga(""), setDescripcionLarga(e))
      : (setErrDescripcionLarga("La descripción larga no puede quedar vacía"),
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
  const validarproximamente = (e) => {
    return errNombre || errDescripcion || errDescripcionLarga ||errTipoAroma || errTipoProducto
      ? setErrproximamente(
          "No se puede realizar esta acción si otros campos tienen errores"
        )
      : (setProximamente(e.target.checked),
        setErrproximamente(""));
  };
  const validarOculto = (e) => {
    return errNombre || errDescripcion || errDescripcionLarga || errTipoAroma || errTipoProducto
      ? setErrOculto(
          "No se puede realizar esta acción si otros campos tienen errores"
        )
      : (setOculto(e.target.checked),
        setErrOculto(""));
  };

  const editProducto = async (e) => {
    e.preventDefault();
    if (!errNombre && !errDescripcion && !errTipoAroma && !errTipoProducto && !errDescripcionLarga) {
      const docu = doc(db, "productoBelie", producto.id);
      const newDocu = {
        nombre: nombre,
        descripcion: descripcion,
        descripcionLarga: descripcionLarga,
        tipoAroma: tipoAroma,
        tipoProducto: tipoProducto,
        idealPara: idealPara,
        proximamente: proximamente,
        oculto: oculto
      };

      await updateDoc(docu, newDocu).then(alert("Producto modificado ok"));
      actualizar ? setActualizar(false) : setActualizar(true);
      setEditModal(false);
      setProducto(null);
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
                rows={3}
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
              rows={6}
                className={errDescripcion ? "inputError" : "rowInput"}
                maxLength="140"
                value={descripcionLarga}
                name="descripcion"
                onChange={(e) => validarDescripcionLarga(e.target.value)}
              />
              <span htmlFor="descripcion">{errDescripcion}</span>
            </div>
            <div className="row direction-row">
              <div>
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
              <div>
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
            </div>
            <div className="row">
            <label htmlFor="idealPara">Ideal Para:</label>
            <div className="d-flex flex-wrap space-center">
            <input
                className={errTipoProducto ? "inputError inputIdealPara" : "rowInput inputIdealPara"}
                type="text"
                value={idealPara.ideal1}
                name="pass"
                onChange={(e) => validarTipoProducto(e.target.value)}
              />
                <input
                className={errTipoProducto ? "inputError inputIdealPara" : "rowInput inputIdealPara"}
                type="text"
                value={idealPara.ideal2}
                name="pass"
                onChange={(e) => validarTipoProducto(e.target.value)}
              />
                <input
                className={errTipoProducto ? "inputError inputIdealPara" : "rowInput inputIdealPara"}
                type="text"
                value={idealPara.ideal3}
                name="pass"
                onChange={(e) => validarTipoProducto(e.target.value)}
              />
            </div>
            </div>
 
            <div className="d-flex p2 flex-row space-evenly">
              <div>
              <label htmlFor="proximamente">
                Proximamente:
                <input
                  className="rowCheckBoxInput"
                  type="checkbox"
                  checked={proximamente == 1}
                  name="proximamente"
                  onChange={(e) => validarproximamente(e)}
                />
              </label>
              </div>
              <div>
              <label htmlFor="oculto">
                Oculto:
                <input
                  className="rowCheckBoxInput"
                  type="checkbox"
                  checked={oculto == 1}
                  name="oculto"
                  onChange={(e) => validarOculto(e)}/>
              </label>
              </div>
            </div>
            <span className="centroT" htmlFor="proximamente">
                {errProximamente}
              </span>
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
