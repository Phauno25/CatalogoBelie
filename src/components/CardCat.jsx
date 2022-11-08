import React, { useContext } from "react";
import { ContextData } from "../context/ContextData";
import "./css/CardCat.css";

function CardCat(props) {
  const { nombre, descripcion, imagen, tipoCategoria } = props.categoria;
  const { editar } = props;
  const { setCategoria,setEditModal } = useContext(ContextData);


  const editarCategoria = () => {
    setCategoria(props.categoria);
    setEditModal(true);
  };


  return (
    <div className="cardCat">
      <img src={imagen} alt={nombre} />
      <div className="cardCat_body">
        <div>
          <h1>{nombre}</h1>
          <p>{descripcion}</p>
        </div>
        <a href={`#${tipoCategoria}`} className="cardCatBtn">
          Quiero ver!
        </a>
      </div>
      {editar ? (
        <button
          onClick={() => editarCategoria()}
          className="cardEdit"
        >
          <i className="fa fa-pencil fa-4x"></i>
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default CardCat;
