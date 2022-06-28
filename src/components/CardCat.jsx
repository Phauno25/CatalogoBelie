import React, { useState } from 'react'

function CardCat(props) {

    const { nombre, descripcion, imagen } = props.categoria;
    const {click,editar} = props

    return (
        <div className='cardCat'>
            <div className="cardCat_img">
            {editar ? <button onClick={click} className='cardEdit'><i className="fa fa-pencil fa-4x"></i>Editar</button> : ""}
                <img src={imagen} alt={nombre} />
            </div>
            <div className="cardCat_body">
                <div className='cardCat_textos'>
                    <h1>{nombre}</h1>
                    <p>{descripcion}</p>
                </div>
                <button>
                    Quiero Ver!
                </button>
            </div>


        </div>
    )
}

export default CardCat