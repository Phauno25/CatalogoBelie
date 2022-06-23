import React from 'react'
import { db } from '../firebase/fireConfig'
import { addDoc, collection } from 'firebase/firestore'

function Migrador() {

    const agregarPerfuminas = () => {
        let listaprodus = [];
        fetch('/perfuminasMock.json')
            .then(data => data.json())
            .then(data => { listaprodus = data; })
            .then(() => {
                listaprodus.forEach(item => {
                    console.log(item);
                    const producto = {
                        nombre: item.nombre,
                        tipoProducto: item.tipoProducto,
                        tipoAroma: item.tipoAroma,
                        descripcion: item.descripcion,
                        publicado: item.publicado

                    }
                    const docref = addDoc(collection(db, "productoBelie"), producto)
                    console.log("Generado id:" + docref.id)
                })
            })
    }

    const agregarDifusores = () => {
        let listaprodus = [];
        fetch('/difusoresMock.json')
            .then(data => data.json())
            .then(data => { listaprodus = data; })
            .then(() => {
                listaprodus.forEach(item => {
                    console.log(item);
                    const producto = {
                        nombre: item.nombre,
                        tipoProducto: item.tipoProducto,
                        tipoAroma: item.tipoAroma,
                        descripcion: item.descripcion,
                        publicado: item.publicado

                    }
                    const docref = addDoc(collection(db, "productoBelie"), producto)
                    console.log("Generado id:" + docref.id)
                })
            })
    }

    const agregarVelas = () => {
        let listaprodus = [];
        fetch('/velasMock.json')
            .then(data => data.json())
            .then(data => { listaprodus = data; })
            .then(() => {
                listaprodus.forEach(item => {
                    console.log(item);
                    const producto = {
                        nombre: item.nombre,
                        tipoProducto: item.tipoProducto,
                        tipoAroma: item.tipoAroma,
                        descripcion: item.descripcion,
                        publicado: item.publicado

                    }
                    const docref = addDoc(collection(db, "productoBelie"), producto)
                    console.log("Generado id:" + docref.id)
                })
            })
    }

    const agregarEspumas = () => {
        let listaprodus = [];
        fetch('/espumaMock.json')
            .then(data => data.json())
            .then(data => { listaprodus = data; })
            .then(() => {
                listaprodus.forEach(item => {
                    console.log(item);
                    const producto = {
                        nombre: item.nombre,
                        tipoProducto: item.tipoProducto,
                        tipoAroma: item.tipoAroma,
                        descripcion: item.descripcion,
                        publicado: item.publicado

                    }
                    const docref = addDoc(collection(db, "productoBelie"), producto)
                    console.log("Generado id:" + docref.id)
                })
            })
    }



    return (
        <div>
            {/* <button onClick={""}>Migrar Perfuminas</button>

            <button onClick={""}>Migrar Difusores</button>

            <button onClick={""}>Migrar Velas</button> */}

            <button onClick={() => agregarEspumas()}>Migrar Espumas</button>



        </div>
    )

}

export default Migrador

