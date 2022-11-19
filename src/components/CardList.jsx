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

  const { nombre, descripcion, tipoProducto, tipoAroma, proximamente,oculto } =
    props.producto;
  const { color, imagen, editar } = props;

  const mostrarDetalle = () => {
    if (proximamente) {
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
        !proximamente
          ? ""
          : tipoProducto == "Perfumina"
          ? "proximamenteVioleta"
          : "proximamenteRosa"
      }`}
    >
      {oculto && editar ?(<h2 className="cardList_oculto">OCULTO</h2>) : ("")}
      <div className={`cardList_header ${color}`}> </div>
      <div className="cardList_body">
        <div className="cardList_body_imagen">
          <img src={imagen} alt={tipoAroma} />
        </div>
        <div className="cardList_body_textos">
          <h1 className="centroT" onClick={() => mostrarDetalle()}>
            {!proximamente ? nombre : "Proximamente"}
          </h1>
          <p className="centroT">
            {!proximamente
              ? descripcion
              : "Dentro de muy poco lanzaremos este aroma. Seguinos en las redes para estar al tanto!"}
          </p>
        </div>
        <h3 className="centroT">{tipoAroma}</h3>
        {editar ? (
          <button onClick={() => editarProducto()} className="cardEdit">
            <i className="fa fa-pencil fa-3x"></i>
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
