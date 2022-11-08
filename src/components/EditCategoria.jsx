import React, { useState, useContext } from "react";
import { db } from "../firebase/fireConfig";
import { doc, updateDoc } from "firebase/firestore";
import { Storage } from "../firebase/fireConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./css/EditModal.css";
import { ContextData } from "../context/ContextData";
function EditCategoria(prop) {

  const {  categoria, setCategoria, editModal, setEditModal } =
    useContext(ContextData);

  const [nombre, setNombre] = useState(prop.categoria.nombre);
  const [descripcion, setDescripcion] = useState(prop.categoria.descripcion);
  const [imagenCat, setImagenCat] = useState(prop.categoria.imagen);
  const [uploadImg, setUploadImg] = useState(null);
  const [errNombre, setErrNombre] = useState("");
  const [errDescripcion, setErrDescripcion] = useState("");
  //const [errImagen, setErrImagen] = useState("");

  const [loading, setLoading] = useState(false);

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

  const validarImagen = (e) => {
    const reader = new FileReader();
    const archivo = e.target.files[0];
    reader.readAsDataURL(archivo);
    reader.onload = () => {
      setImagenCat(reader.result);
    };
    setUploadImg(archivo);
  };

  const EditCategoria = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!errNombre && !errDescripcion) {
      let url = `/Cat${prop.categoria.tipoCategoria}.jpg`;
      let storageRef = ref(Storage, url);
      const metadata = {
        contentType: uploadImg.type,
      };
      console.log(metadata);

      uploadBytes(storageRef, uploadImg, metadata)
        .then((storageRef = ref(Storage, "url")))
        .then(getDownloadURL(storageRef))
        .then((e) => setImagenCat(e))
        .then(updateDocuCat());
    }
  };

  const updateDocuCat = async () => {
    const docu = doc(db, "categoriaBelie", prop.categoria.id);
    const newDocu = {
      nombre: nombre,
      descripcion: descripcion,
      imagen: imagenCat,
    };

    await updateDoc(docu, newDocu)
      .then(setLoading(false))
      .then(alert("Categoria modificada ok"))
      .then(setCategoria ==(null),setEditModal(false));
  };

  const ocultarModal = (e) => {
    //Si se hizo click solo en el componente padre
    return e.target == e.currentTarget
      ? (setEditModal(false), setCategoria(null))
      : "";
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
            onSubmit={(e) => EditCategoria(e)}
          >
            <h1>Editar Categoria</h1>
            <p>Escribe sobre los campos a editar.</p>
            <hr />
            <div className="row">
              <label htmlFor="nombre">Nombre</label>
              <input
                className={errNombre ? "inputError" : "rowInput"}
                type="text"
                value={nombre}
                name="nombre"
                onChange={(e) => validarNombre(e)}
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
                onChange={(e) => validarDescripcion(e)}
              />
              <span htmlFor="descripcion">{errDescripcion}</span>
            </div>
            <div className="row">
              <label htmlFor="uploadImg">imagen:</label>
              <input
                className="rowInput"
                type="file"
                name="uploadImg"
                onChange={(e) => validarImagen(e)}
              />
              <span htmlFor="uploadImg"></span>
            </div>
            <div className="row">
              <img className="uploadImg" alt={nombre} src={imagenCat} />
            </div>

            {loading ? (
              <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
            ) : (
              <div className="row">
                <button
                  disabled={errNombre || errDescripcion ? true : false}
                  className="submit"
                  type="submit"
                >
                  Confirmar
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditCategoria;
