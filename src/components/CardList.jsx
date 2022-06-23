import React from 'react'

function Card(props) {

    const {nombre, descripcion, tipoAroma, color, publicado} = props;

    return (
        <div className={`cardList ${publicado ? "" : "proximamente"}`}>
            <div class={`cardList_header ${color}`}> </div>
            <div class="cardList_body">
                <div class="cardList_body_imagen">
                    <img src="" alt="" />
                </div>
                <h1>{nombre}</h1>
                <p class="centroT">
                    {descripcion}
                </p>
                <h3 class="centroT">{tipoAroma}</h3>
            </div>
            <div class={`cardList_footer ${color}`}></div>
        </div>
    )
}

export default Card