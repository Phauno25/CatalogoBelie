import React from 'react'

function CardShort(props) {

    const {nombre, descripcion, publicado} = props

    return (
        <div className={`cardShort ${publicado ? "" : "proximamente"}`}>
            <div className="cardShort_header">
                <img src="./img/rosaTest.jpg" alt="" />
            </div>
            <div className="cardShort_body">
                <h1>{nombre}</h1>
                <hr />
                <p>{descripcion}</p>
            </div>
        </div>
    )

}

export default CardShort