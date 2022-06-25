import React ,{ useState } from 'react'

function EditProducto(prop) {

const [nombre,setNombre] = useState(prop.nombre);
const [descripcion,setDescripcion] = useState(prop.descripcion);
const [tipoAroma,setTipoAroma] = useState(prop.tipoAroma);
const [tipoProducto,setTipoProducto] = useState(prop,tipoProducto);
const [publicado,setPublicado] = useState(prop.publicado);
const [errNombre,setErrNombre] = useState("");
const [errDescripcion,setErrDescripcion] = useState("");
const [errTipoAroma,setErrTipoAroma] = useState("");
const [errTipoProducto,setErrTipoProducto] = useState("");
const [errPublicado,setErrPublicado] = useState("");

const validarNombre = (e) =>{
    return e.trim() ? (setErrNombre(""),setNombre(e)) : setErrDescripcion("El nombre no puede quedar vacio")
}
const validarDescripcion = (e) =>{
    return e.trim() ? (setErrDescripcion(""),setDescripcion(e)) : setErrDescripcion("La descripción no puede quedar vacía")
}
const validarTipoAroma = (e) =>{
    return e.trim() ? (setErrTipoAroma(""),setTipoAroma(e)) : setErrTipoAroma("El tipo de aroma no puede quedar vacío")
}
const validarTipoProducto = (e) =>{
    return e.trim() ? (setErrTipoProducto(""),setTipoProducto(e)) : setErrTipoProducto("El tipo de producto no puede quedar vacío")
}
const validarPublicado = (e) =>{
    return errNombre || errDescripcion || errTipoAroma || errTipoProducto ? 
    setErrPublicado("No se puede realizar esta acción si otros campos tienen errores")  :
    (setErrPublicado(""),setPublicado(e))
}

    return (
        <div className='modalEdit'>
            <div className="modalContent">
                <div className="cardForm">
                    <form className='registerForm' method="post" onSubmit={(e) => editProducto(e)}>
                        <h1>Editar producto</h1>
                        <p>Escribe sobre los campos a editar.</p>
                        <hr />
                        <div className='row'>
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" name="nombre" onChange={(e) => validarNombre(e.target.value) }/>
                            <span htmlFor="nombre">{errNombre}</span>
                        </div>
                        <div className='row'>
                            <label htmlFor="descripcion">Descripcion:</label>
                            <textarea maxLength="140" name="descripcion" onChange={(e) => validarDescripcion(e.target.value) } />
                            <span htmlFor="descripcion">{errDescripcion}</span>
                        </div>
                        <div className='row'>
                            <label htmlFor="tipoAroma">TipoAroma:</label>
                            <input type="text" name="tipoAroma" onChange={(e) => validarTipoAroma(e.target.value)} />
                            <span htmlFor="tipoAroma">{errTipoAroma}</span>
                        </div>
                        <div className='row'>
                            <label htmlFor="pass">TipoProducto:</label>
                            <input type="text" name="pass" onChange={(e) => validarTipoProducto(e.target.value)} />
                            <span htmlFor="pass">{errTipoProducto}</span>
                        </div>
                        <div className='row'>
                            <label htmlFor="pass">Publicado:</label>
                            <input type="checkbox" name="pass" onChange={(e) => validarPublicado(e.target.value)} />
                            <span htmlFor="pass">{errPublicado}</span>
                        </div>
                        <div className='row'>
                            <button className='submit' type="submit">Iniciar Sesion</button>
                        </div>
                        <div className={errLog ? "logError" : ""}>
                            <span>{errLog}</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default EditProducto