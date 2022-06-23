import React, { useState } from 'react'

function Card(props) {

    const { nombre, descripcion, tipoAroma, color, publicado, imagen, editar } = props;


    return (
        <div className={`cardList ${publicado == 1 ? "" : "proximamente"}`}>
            <div className={`cardList_header ${color}`}> </div>
            <div className="cardList_body">
                <div className="cardList_body_imagen">
                    <img src={imagen} alt={tipoAroma} />
                </div>
                <div className="cardList_body_textos">
                    <h1 className="centroT">{nombre}</h1>
                    <p className="centroT">
                        {descripcion}
                    </p>
                </div>
                <h3 className="centroT">{tipoAroma}</h3>
                {editar ? <a href="https://google.com.ar" className='cardEdit'><i class="fa fa-pencil fa-4x"></i></a> : ""}
            </div>
            <div className={`cardList_footer ${color}`}></div>
        </div>
    )
}

export default Card