import React from 'react'
import './css/CardList.css'

function CardList(props) {

    const { nombre, descripcion, tipoAroma, publicado } = props.producto;
    const { color, imagen, editar, click } = props

    return (
        <div className={`cardList ${publicado == 1 ? "" : "proximamente"}`}>
            <div className={`cardList_header ${color}`}> </div>
            <div className="cardList_body">
                <div className="cardList_body_imagen">
                    <img src={imagen} alt={tipoAroma} />
                </div>
                <div className="cardList_body_textos">
                    <h1 className="centroT">
                        {publicado == 1 ? nombre : "Proximamente"}
                    </h1>
                    <p className="centroT">
                        {publicado == 1 ? descripcion : "Dentro de muy poco lanzaremos este aroma. Seguinos en las redes para estar al tanto!"}
                    </p>
                </div>
                <h3 className="centroT">{tipoAroma}</h3>
                {editar ? <button onClick={click} className='cardEdit'><i className="fa fa-pencil fa-4x"></i></button> : ""}
            </div>
            <div className={`cardList_footer ${color}`}></div>
        </div>
    )
}

export default CardList