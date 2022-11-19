import React, { createContext, useState } from "react";

export const ContextData = createContext();

const ContextProvider = ({ children }) => {
  const [editModal, setEditModal] = useState(false);
  const [detalleProducto, setDetalleProducto] = useState(false);
  const [producto, setProducto] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [actualizar,setActualizar] = useState(false);
  return (
    <ContextData.Provider
      value={{
        editModal,
        setEditModal,
        detalleProducto,
        setDetalleProducto,
        producto,
        setProducto,
        categoria,
        setCategoria,
        actualizar,
        setActualizar
      }}
    >
      {children}
    </ContextData.Provider>
  )
}

export default ContextProvider;
