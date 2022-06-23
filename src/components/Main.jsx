import React, { Fragment, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/fireConfig'
import CardList from './CardList'
import CardShort from './CardShort'


function Main() {

    const [listaProd, setListaProd] = useState([])

    useEffect(() => {
        const getProductos = async () => {
            const documentos = await getDocs(collection(db, 'productoBelie'))
            const nuevoArray = []
            documentos.forEach(e => {
                const producto = {
                    id: e.id,
                    nombre: e.data().nombre,
                    descripcion: e.data().descripcion,
                    tipoAroma: e.data().tipoAroma,
                    tipoProducto: e.data().tipoProducto,
                    publicado: e.data().publicado
                }
                nuevoArray.push(producto)

            })
            setListaProd(nuevoArray.sort(function (a, b) {
                var textA = a.nombre.toUpperCase();
                var textB = b.nombre.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }))
        }
        getProductos();

    }, [])


    return (
        <Fragment>
            <header>
                <nav>
                    <h1>Catalogo Belie 2022</h1>
                    <ul className="links">
                        <li><a href="/" className="link">Inicio</a></li>
                        <li><a href="/" className="link">Catalogo</a></li>
                    </ul>
                </nav>
                <div className="header_banner">
                    <video src="./img/bannerBelie.mp4" muted autoPlay loop></video>
                    <img src="./img/imgBannerBelie.jpg" alt="banner" />
                    <div className="header_banner_textos">
                        <h1>Estás a un <span className="highlight">CLICK</span></h1>
                        <p>de descubrir tu nueva <span className="highlight">fragancia favorita.</span></p>
                    </div>
                </div>
            </header>
            <section className="wrapper vh100">

                <h1>¡Nos Renovamos!</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam laboriosam, ratione eum adipisci
                    illo assumenda, cupiditate non reprehenderit vitae magni reiciendis recusandae maxime laudantium
                    debitis praesentium at accusamus mollitia sit.</p>


            </section>
            <section id="categorias" className="wrapper mb4 circlepath">
                <div className="section_bar bg_nude h3rem"></div>
                <div className="container w80">
                    <div className="catalogo_textos">
                        <h1>Nuestro Catalogo</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente animi assumenda, odio porro unde
                            rem placeat cumque, quibusdam sint nobis debitis quis! Nam neque dolorem aliquid illum suscipit
                            laborum quidem.</p>
                    </div>

                </div>
                <div className="container w80 space_around  ">

                    <div className="cardCat">
                        <div className="cardCat_header">
                            <div className="cardCat_header_img">
                                <img src="./img/CatPerfumina.png" alt="Perfume Textil" />
                            </div>
                            <div className="cardCat_header_info">
                                <div>
                                    <h2>Perfume Textil</h2>
                                    <p>Para que tus prendas lleven todo el aroma de Belie durante todo el dia.</p>
                                </div>


                                <a href="">¡Quiero ver!</a>
                            </div>
                        </div>
                    </div>

                    <div class="cardCat">
                        <div class="cardCat_header">
                            <div class="cardCat_header_img">
                                <img src="./img/CatPerfumina.png" alt="Perfume Textil" />
                            </div>
                            <div class="cardCat_header_info">
                                <div>
                                    <h2>Difusores</h2>
                                    <p>Difusores de varilla de bamboo para todos los ambientes.</p>
                                </div>


                                <a href="">¡Quiero ver!</a>
                            </div>
                        </div>
                    </div>

                    <div class="cardCat">
                        <div class="cardCat_header">
                            <div class="cardCat_header_img">
                                <img src="./img/CatPerfumina.png" alt="Perfume Textil" />
                            </div>
                            <div class="cardCat_header_info">
                                <div>
                                    <h2>Velas de Soja</h2>
                                    <p>Velas aromáticas naturales sin aditivos ni parafina.</p>
                                </div>


                                <a href="">¡Quiero ver!</a>
                            </div>
                        </div>
                    </div>

                    <div class="cardCat">
                        <div class="cardCat_header">
                            <div class="cardCat_header_img">
                                <img src="./img/CatPerfumina.png" alt="Perfume Textil" />
                            </div>
                            <div class="cardCat_header_info">
                                <div>
                                    <h2>Bath Time</h2>
                                    <p>Productos con aromas relajantes para tus momentos de relax.</p>
                                </div>


                                <a href="">¡Quiero ver!</a>
                            </div>
                        </div>
                    </div>

                    <div class="cardCat">
                        <div class="cardCat_header">
                            <div class="cardCat_header_img">
                                <img src="./img/CatPerfumina.png" alt="Perfume Textil" />
                            </div>
                            <div class="cardCat_header_info">
                                <div>
                                    <h2>Oleos &amp; Cremas</h2>
                                    <p>Combiná el cuidado de tu piel con aromas suaves y armónicos.</p>
                                </div>


                                <a href="">¡Quiero ver!</a>
                            </div>
                        </div>
                    </div>

                    <div class="cardCat">
                        <div class="cardCat_header">
                            <div class="cardCat_header_img">
                                <img src="./img/CatPerfumina.png" alt="Perfume Textil" />
                            </div>
                            <div class="cardCat_header_info">
                                <div>
                                    <h2>Sahumerios</h2>
                                    <p>Inciensos de doble empaste para limpieza o aromatización.</p>
                                </div>


                                <a href="">¡Quiero ver!</a>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section class="bg_blob_violeta">
                <div class="section_bar bg_violeta h3rem"></div>
                <div class="container w100 space_center">
                    <div class="catalogo_textos w50">
                        <h1>Perfumes Textiles</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente animi assumenda, odio porro unde
                            rem placeat cumque, quibusdam sint nobis debitis quis! Nam neque dolorem aliquid illum suscipit
                            laborum quidem.</p>
                    </div>

                </div>
                <div id="perfuminas" class="container w100 space_evenly">

                    {    // ------- RENDER DE PERFUMINAS ---------//
                        listaProd.map(item =>
                            item.tipoProducto === "Perfumina" ?
                                <CardList key={item.id} nombre={item.nombre} descripcion={item.descripcion} color="bg_violeta"
                                    publicado={item.publicado} tipoAroma={item.tipoAroma} />
                                : ""
                        )
                    }

                </div>


            </section>
            <section class="bg_blob_rosa">
                <div class="section_bar bg_rosa h3rem"></div>
                <div class="container W100 space_center">
                    <div class="catalogo_textos w50">
                        <h1>Difusores de Varillas</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente animi assumenda, odio porro unde
                            rem placeat cumque, quibusdam sint nobis debitis quis! Nam neque dolorem aliquid illum suscipit
                            laborum quidem.</p>
                    </div>

                </div>
                <div id="difusores" class="container space_evenly">

                    {  // ------- RENDER DE DIFUSORES ---------//
                        listaProd.map(item =>
                            item.tipoProducto === "Difusor" ?
                                <CardList key={item.id} nombre={item.nombre} descripcion={item.descripcion} color="bg_rosa"
                                    publicado={item.publicado} tipoAroma={item.tipoAroma} />
                                : ""

                        )
                    }

                </div>

            </section>
            <section class="bg_blob_amarillo">
                <div class="section_bar bg_amarillo h3rem"></div>
                <div class="container W100 space_center">
                    <div class="catalogo_textos w50">
                        <h1>Velas de soja aromáticas.</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente animi assumenda, odio porro unde
                            rem placeat cumque, quibusdam sint nobis debitis quis! Nam neque dolorem aliquid illum suscipit
                            laborum quidem.</p>
                    </div>

                </div>
                <div id="velas" class="container space_evenly bg_blob_amarillo">

                    {  // ------- RENDER DE VELAS ---------//
                        listaProd.map(item =>
                            item.tipoProducto === "Vela" ?
                                <CardShort key={item.id} nombre={item.nombre} descripcion={item.descripcion}
                                    publicado={item.publicado} />
                                : ""

                        )
                    }

                </div>

            </section>
            <section class="bg_blob_azul">
                <div class="section_bar bg_azul h3rem"></div>
                <div class="container W100 space_center">
                    <div class="catalogo_textos w50">
                        <h1>Espumas de Baño</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente animi assumenda, odio porro unde
                            rem placeat cumque, quibusdam sint nobis debitis quis! Nam neque dolorem aliquid illum suscipit
                            laborum quidem.</p>
                    </div>

                </div>
                <div id="bath" class="container space_evenly">

                    {  // ------- RENDER DE ESPUMAS ---------//
                        listaProd.map(item =>
                            item.tipoProducto === "Espuma" ?
                                <CardShort key={item.id} nombre={item.nombre} descripcion={item.descripcion}
                                    publicado={item.publicado} />
                                : ""

                        )
                    }
                </div>

            </section>
        </Fragment>
    )

}

export default Main