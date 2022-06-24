
import React from 'react'
import {Link} from 'react-router-dom'
import './css/Portada.css'
function Portada() {
    return (
        <div className="portada">
            <video className='videoH' src="./video/beliePortadaH.mp4" autoPlay muted loop></video>
            <video className='videoV' src="./video/beliePortadaV.mp4" autoPlay muted loop></video>
            <div className="portada_textos">
                <h1>Belié tiene una <span className='portada_highlight'> gran sorpresa</span> para vos.</h1>
                <p>Falta muy poco para que te contemos todas las novedades! Mientras tanto 
                    podes  seguir viendo nuestro <span className='portada_highlight'>catálogo</span> hasta que tengamos todo listo.
                </p>
                <div>
                    <Link to={'/catalogo'} className='portada_btn_catalogo'>Ver Catálogo</Link>
                </div>
                
            </div>
        </div>
    )
  
}

export default Portada