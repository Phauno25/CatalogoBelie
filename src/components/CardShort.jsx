import React, { useContext ,useEffect,useState } from "react";
import "./css/CardShort.css";
import { ContextData } from "../context/ContextData";

function CardShort(props) {
  const { setEditModal, setProducto } = useContext(ContextData);
  const { nombre, descripcion, proximamente,categoria,oculto } = props.producto;
  const { imagen, editar } = props;
  let [classProximamente, setClassProximamente] = useState("");

  useEffect(()=>{
    if (proximamente) {
      switch (categoria) {
        case "Bath Time":
          setClassProximamente("proximamenteAzul")
          break;
        case "Velas":
          setClassProximamente("proximamenteNaranja")
           break;
        default:
          setClassProximamente("proximamenteNude")
          break;
      }
      console.log(props.producto)
    }
    else{
      setClassProximamente("")
    }
    
  },[proximamente])

  const editarProducto = () => {
    setProducto(props.producto);
    setEditModal(true);
  };
  return (
    <div className={ `cardShort ${classProximamente}`}>
      {oculto && editar ?(<h2 className="cardShort_oculto">OCULTO</h2>) : ("")}
      
      <div className="cardShort_header">
        <img src={imagen} alt={nombre} />
      </div>
      <div className="cardShort_body">
        <h2> {!proximamente ? nombre : "Proximamente"}</h2>
        <hr />
        <p>
          {!proximamente
            ? descripcion
            : "Dentro de muy poco lanzaremos este aroma. Seguinos en las redes para estar al tanto!"}
        </p>
      </div>
      {editar ? (
        <button onClick={() => editarProducto()} className="cardEdit">
          <i className="fa fa-pencil fa-2x"></i>
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default CardShort;
