import React, { useContext } from "react";
import { ContextData } from "../context/ContextData";
import "./css/DetalleProducto.css";

function DetalleProducto() {
  const { producto, detalleProducto, setDetalleProducto } =
    useContext(ContextData);

  return (
    <div className={detalleProducto ? "modalEdit displayOn" : "displayOff"}>
      <div className="card_detalle">
        <div className="card_detalle_content">
          <div className="card_detalle_header ">
            <h2>{producto.nombre}</h2>
            <h4>{producto.tipoProducto}</h4>
          </div>
          <div>
            <p className="card_detalle_descripcion">
              {producto.descripcionLarga}
            </p>
          </div>
        </div>

        <div className="card_detalle_ideal w50 p2">
          <ul id="ideal">
            <li>ESTE BLEND ES IDEAL PARA:</li>
            <li>
              <i className="fa-regular fa-heart"></i>
              {" " + producto.idealPara.ideal1}
            </li>
            <li>
              <i className="fa-regular fa-heart"></i>
              {" " + producto.idealPara.ideal2}
            </li>
            <li>
              <i className="fa-regular fa-heart"></i>
              {" " + producto.idealPara.ideal3}
            </li>
          </ul>
        </div>
        <div className="w100">
          <button className="btn_back mt2" onClick={() => setDetalleProducto(false)}>
            Volver al catálogo
          </button>
        </div>
      </div>
    </div>
  );
}
export default DetalleProducto;
