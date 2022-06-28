import React from 'react'

function CardShort(props) {

    const { nombre, descripcion, publicado,imagen,editar,click } = props


    return (
        <div className={`cardShort ${publicado ? "" : "proximamente"}`}>
            <div className="cardShort_header">
                <img src={imagen} alt={nombre} />
            </div>
            <div className="cardShort_body">
                <h2>{nombre}</h2>
                <hr />
                <p>{descripcion}</p>
            </div>
            {editar ? <button onClick={click} className='cardEdit'><i className="fa fa-pencil fa-4x"></i></button> : ""}
        </div>
    )

}

export default CardShort