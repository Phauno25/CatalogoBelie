import React, { useState, useEffect } from 'react'
import { db } from '../firebase/fireConfig'
import { doc, updateDoc } from 'firebase/firestore'
import {Storage} from '../firebase/fireConfig'
import {ref, uploadBytes,getDownloadURL} from 'firebase/storage'
import './css/EditProducto.css'
function EditCategoria(prop) {

    const [nombre, setNombre] = useState(prop.categoria.nombre);
    const [descripcion, setDescripcion] = useState(prop.categoria.descripcion);
    const [imagenCat, setImagenCat] = useState(prop.categoria.imagen);
    const [errNombre, setErrNombre] = useState("");
    const [errDescripcion, setErrDescripcion] = useState("");
    //const [errImagen, setErrImagen] = useState("");
    const [activarModal, setActivarModal] = useState(false);


    useEffect(() => {
        prop.modal ? setActivarModal(true) : setActivarModal(false);
    }, [])

    const validarNombre = (e) => {
        return e.trim() ? (setErrNombre(""), setNombre(e)) : (setErrNombre("El nombre no puede quedar vacio"), setNombre(e))
    }
    const validarDescripcion = (e) => {
        return e.trim() ? (setErrDescripcion(""), setDescripcion(e)) : (setErrDescripcion("La descripción no puede quedar vacía"), setDescripcion(e))
    }

    const validarImagen = (e) => {
        let archivo = URL.createObjectURL(e.target.files[0]);
        setImagenCat(archivo);
        console.log(archivo);
    }


    const EditCategoria = async (e) => {
        e.preventDefault();
        if (!errNombre && !errDescripcion) {

            const storageRef = ref(Storage, '/CatPerfumina.png');
            uploadBytes(storageRef,imagenCat).then(console.log("Imagen cargada con exito")).catch(e=>console.log(e.code))

            const docu = doc(db, "categoriaBelie", prop.categoria.id);
            const newDocu =
            {
                nombre: nombre,
                descripcion: descripcion,
                imagen: imagenCat,
            }

            await updateDoc(docu, newDocu)
                .then(alert("Categoria modificada ok"))
                .then(prop.finish);


        }



    }




    return (
        <div className={`modalEdit ${activarModal && prop.modal ? "displayOn" : "displayOff"}`} onClick={prop.clickCancel}>
            <div className="modalContent">
                <div className="cardForm bg_nude">
                    <form className='registerForm' method="post" onSubmit={(e) => EditCategoria(e)}>
                        <h1>Editar Categoria</h1>
                        <p>Escribe sobre los campos a editar.</p>
                        <hr />
                        <div className='row'>
                            <label htmlFor="nombre">Nombre</label>
                            <input className={errNombre ? "inputError" : "rowInput"} type="text" value={nombre} name="nombre" onChange={(e) => validarNombre(e)} />
                            <span htmlFor="nombre">{errNombre}</span>
                        </div>
                        <div className='row'>
                            <label htmlFor="descripcion">Descripcion:</label>
                            <textarea className={errDescripcion ? "inputError" : "rowInput"} maxLength="140" value={descripcion} name="descripcion" onChange={(e) => validarDescripcion(e)} />
                            <span htmlFor="descripcion">{errDescripcion}</span>
                        </div>
                        <div className="row">
                            <label htmlFor="imagenCat">imagen:</label>
                            <div className='d-flex flex-row'>
                            <input className="rowInput" type="file" name="imagenCat" onChange={(e) => validarImagen(e)} />
                            <img className="imgCat" alt={nombre} src={imagenCat} />
                            </div>                  
                            <span htmlFor="imagenCat"></span>
                        </div>
                        <div className='row'>
                            <button disabled={errNombre || errDescripcion ? true : false} className='submit' type="submit">Confirmar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default EditCategoria