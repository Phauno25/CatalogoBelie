import React from "react";
import { db } from "../firebase/fireConfig";
import { addDoc, collection } from "firebase/firestore";

function Migrador() {
  const agregarPerfuminas = () => {
    let listaprodus = [];
    fetch("/perfuminasMock.json")
      .then((data) => data.json())
      .then((data) => {
        listaprodus = data;
      })
      .then(() => {
        listaprodus.forEach((item) => {
          console.log(item);
          const producto = {
            nombre: item.nombre,
            tipoProducto: item.tipoProducto,
            tipoAroma: item.tipoAroma,
            descripcion: item.descripcion,
            descripcionLarga: item.descripcionLarga,
            idealPara: item.idealPara,
            notasSalida: item.notasSalida,
            notasCorazon: item.notasCorazon,
            notasFondo: item.notasFondo,
            publicado: item.publicado,
          };
          const docref = addDoc(collection(db, "productoBelie"), producto);
          console.log("Generado id:" + docref.id);
        });
      });
  };

  const agregarDifusores = () => {
    let listaprodus = [];
    fetch("/difusoresMock.json")
      .then((data) => data.json())
      .then((data) => {
        listaprodus = data;
      })
      .then(() => {
        listaprodus.forEach((item) => {
          console.log(item);
          const producto = {
            nombre: item.nombre,
            categoria: item.categoria,
            tipoProducto: item.tipoProducto,
            tipoAroma: item.tipoAroma,
            descripcion: item.descripcion,
            descripcionLarga: item.descripcionLarga,
            idealPara: item.idealPara,
            notasSaluda: item.notasSalida,
            notasCorazon: item.notasCorazon,
            notasFondo: item.notasFondo,
            publicado: item.publicado,
          };
          const docref = addDoc(collection(db, "productoBelie"), producto);
          console.log("Generado id:" + docref.id);
        });
      });
  };

  const agregarVelas = () => {
    let listaprodus = [];
    fetch("/velasMock.json")
      .then((data) => data.json())
      .then((data) => {
        listaprodus = data;
      })
      .then(() => {
        listaprodus.forEach((item) => {
          console.log(item);
          const producto = {
            nombre: item.nombre,
            categoria: item.categoria,
            tipoProducto: item.tipoProducto,
            tipoAroma: item.tipoAroma,
            descripcion: item.descripcion,
            descripcionLarga: item.descripcionLarga,
            idealPara: item.idealPara,
            notasSaluda: item.notasSalida,
            notasCorazon: item.notasCorazon,
            notasFondo: item.notasFondo,
            publicado: item.publicado,
          };
          const docref = addDoc(collection(db, "productoBelie"), producto);
          console.log("Generado id:" + docref.id);
        });
      });
  };

  const agregarEspumas = () => {
    let listaprodus = [];
    fetch("/espumasMock.json")
      .then((data) => data.json())
      .then((data) => {
        listaprodus = data;
      })
      .then(() => {
        listaprodus.forEach((item) => {
          console.log(item);
          const producto = {
            nombre: item.nombre,
            categoria: item.categoria,
            tipoProducto: item.tipoProducto,
            tipoAroma: item.tipoAroma,
            descripcion: item.descripcion,
            descripcionLarga: item.descripcionLarga,
            idealPara: item.idealPara,
            notasSaluda: item.notasSalida,
            notasCorazon: item.notasCorazon,
            notasFondo: item.notasFondo,
            publicado: item.publicado,
          };
          const docref = addDoc(collection(db, "productoBelie"), producto);
          console.log("Generado id:" + docref.id);
        });
      });
  };

  const agregarOleos = () => {
    let listaprodus = [];
    fetch("/oleosMock.json")
      .then((data) => data.json())
      .then((data) => {
        listaprodus = data;
      })
      .then(() => {
        listaprodus.forEach((item) => {
          console.log(item);
          const producto = {
            nombre: item.nombre,
            categoria: item.categoria,
            tipoProducto: item.tipoProducto,
            tipoAroma: item.tipoAroma,
            descripcion: item.descripcion,
            descripcionLarga: item.descripcionLarga,
            idealPara: item.idealPara,
            notasSaluda: item.notasSalida,
            notasCorazon: item.notasCorazon,
            notasFondo: item.notasFondo,
            publicado: item.publicado,
          };
          const docref = addDoc(collection(db, "productoBelie"), producto);
          console.log("Generado id:" + docref.id);
        });
      });
  };

  return (
    <div>
      {
        <div>
          <button onClick={() => agregarPerfuminas()}>Migrar Perfuminas</button>
          <button onClick={() => agregarDifusores()}>Migrar Difusores</button>
          <button onClick={() => agregarVelas()}>Migrar Velas</button>
          <button onClick={() => agregarEspumas()}>Migrar Bath</button>
          <button onClick={() => agregarOleos()}>Migrar Oleos</button>
        </div>
      }
    </div>
  );
}

export default Migrador;
