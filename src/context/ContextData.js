import React, { createContext, useState } from "react";

export const ContextData = createContext();

const ContextProvider = ({ children }) => {
  const [editModal, setEditModal] = useState(false);
  const [detalleProducto, setDetalleProducto] = useState(false);
  const [producto, setProducto] = useState(null);
  const [categoria, setCategoria] = useState(null);

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
      }}
    >
      {children}
    </ContextData.Provider>
  )
}

export default ContextProvider;
