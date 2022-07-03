import React from 'react'
import "./css/CardCat.css"

function CardCat(props) {

    const { nombre, descripcion, imagen,tipoCategoria } = props.categoria;
    const {click,editar} = props;
    
    
    return (
        <div className="cardCat">
            <img src={imagen} alt={nombre} />
            <div className='cardCat_body'>
                <div>
                <h1>{nombre}</h1>
                <p>{descripcion}</p>
                </div>
                <a href={`#${tipoCategoria}`} className='cardCatBtn'>Quiero ver!</a>
            </div>
            {editar ? <button onClick={click} className='cardEdit'><i className="fa fa-pencil fa-4x"></i></button> : ""}
        </div>
    )
}

export default CardCat