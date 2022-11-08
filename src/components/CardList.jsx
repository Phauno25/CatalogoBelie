import React, { useContext, useState } from "react";
import "./css/CardList.css";
import { ContextData } from "../context/ContextData";

function CardList(props) {
  const {
    editModal,
    setEditModal,
    detalleProducto,
    setDetalleProducto,
    producto,
    setProducto,
    categoria,
    setCategoria,
  } = useContext(ContextData);

  const { nombre, descripcion, tipoProducto, tipoAroma, publicado } =
    props.producto;
  const { color, imagen, editar } = props;

  const mostrarDetalle = () => {
    if (publicado) {
      setProducto(props.producto);
      setDetalleProducto(true);
    }
  };

  const editarProducto = () => {
    setProducto(props.producto);
    setEditModal(true);
  };

  return (
    <div
      className={`cardList ${
        publicado == 1
          ? ""
          : tipoProducto == "Perfumina"
          ? "proximamenteVioleta"
          : "proximamenteRosa"
      }`}
    >
      <div className={`cardList_header ${color}`}> </div>
      <div className="cardList_body">
        <div className="cardList_body_imagen">
          <img src={imagen} alt={tipoAroma} />
        </div>
        <div className="cardList_body_textos">
          <h1 className="centroT" onClick={() => mostrarDetalle()}>
            {publicado == 1 ? nombre : "Proximamente"}
          </h1>
          <p className="centroT">
            {publicado == 1
              ? descripcion
              : "Dentro de muy poco lanzaremos este aroma. Seguinos en las redes para estar al tanto!"}
          </p>
        </div>
        <h3 className="centroT">{tipoAroma}</h3>
        {editar ? (
          <button onClick={() => editarProducto()} className="cardEdit">
            <i className="fa fa-pencil fa-4x"></i>
          </button>
        ) : (
          ""
        )}
      </div>
      <div className={`cardList_footer ${color}`}></div>
    </div>
  );
}

export default CardList;
