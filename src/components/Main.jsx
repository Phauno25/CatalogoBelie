import React, { Fragment, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db, Auth } from '../firebase/fireConfig'
import CardCat from './CardCat'
import CardList from './CardList'
import CardShort from './CardShort'
import EditProducto from './EditProducto'
import EditCategoria from './EditCategoria'

function Main() {

    const [listaCat, setListaCat] = useState([])
    const [listaProd, setListaProd] = useState([])
    const [usuario, setUsuario] = useState(null)
    const [producto, setProducto] = useState(null)
    const [categoria, setCategoria] = useState(null)
    const [modal, setModal] = useState(false);

    useEffect(() => {
        Auth.onAuthStateChanged((user) => {
            if (user) {
                setUsuario(user.email)
            }
        })
        getProductos();
        getCategorias();

    }, [])

    const cerrarSesion = (e) => {
        e.preventDefault();
        Auth.signOut();
        setUsuario(null);
    }

    const setEditarProd = (e) => {
        setModal(true);
        const producto = {
            id: e.id,
            nombre: e.nombre,
            descripcion: e.descripcion,
            tipoAroma: e.tipoAroma,
            tipoProducto: e.tipoProducto,
            publicado: e.publicado,
        }
        setProducto(producto);
    }

    const setEditarCat = (e) => {
        setModal(true);
        const categoria = {
            id: e.id,
            nombre: e.nombre,
            descripcion: e.descripcion,
            tipoCategoria: e.tipoCategoria,
            imagen: e.imagen,
        }
        setCategoria(categoria);
    }

    const cancelModal = (e) => {

        return e.target == e.currentTarget ?
            (
                setModal(false),
                setTimeout(() => { return (setProducto(null), setCategoria(null)) }, 1000)
            ) : "";
    }

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

    const getCategorias = async () => {
        const documentos = await getDocs(collection(db, 'categoriaBelie'))
        const nuevoArray = []
        documentos.forEach(e => {
            const categoria = {
                id: e.id,
                nombre: e.data().nombre,
                descripcion: e.data().descripcion,
                imagen: e.data().imagen,
                tipoCategoria: e.data().tipoCategoria,
            }
            nuevoArray.push(categoria)
        })
        setListaCat(nuevoArray.sort(function (a, b) {
            var textA = a.nombre.toUpperCase();
            var textB = b.nombre.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }))

    }
    const finishProd = () => {
        getProductos();
        setProducto(null)
    }
    const finishCat = () => {
        getCategorias();
        setCategoria(null)
    }



    return (
        <Fragment>
            {
                producto ? <EditProducto producto={producto} modal={modal} clickCancel={e => cancelModal(e)} finish={() => finishProd()} /> : ""
            }
            {
                categoria ? <EditCategoria categoria={categoria} modal={modal} clickCancel={e => cancelModal(e)} finish={() => finishCat()} /> : ""
            }
            <header>
                <nav>
                    <h1>Catalogo Belie 2022</h1>
                    <ul className="links">
                        <li><a href="#Categorias" className="link">Catalogo</a></li>
                        <li><a href="https://beliearomas.com" className="link link_active">Ir a la Tienda</a></li>
                        {usuario ? <li><a href="/" onClick={(e) => cerrarSesion(e)} className="link">Cerrar Sesi??n</a></li> : ""}
                    </ul>
                </nav>
                <div className="header_banner">
                    <video src='./video/bannerBelie.mp4' autoPlay muted loop></video>
                    <img src="./img/imgBannerBelie.jpg" alt="banner" />
                    <div className="header_banner_textos">
                        <h1>Est??s a un <span className="highlight">CLICK</span></h1>
                        <p>de descubrir tu nueva <span className="highlight">fragancia favorita.</span></p>
                    </div>
                </div>
            </header>

            <section className="wrapper vh100 renovation_textos">

                <div>
                    <h1>??Nos Renovamos!</h1>
                </div>
            </section>

            <section id="Categorias" className="wrapper mb4 circlepath">
                <div className="section_bar bg_nude h3rem"></div>
                <div className="container w80">
                    <div className="catalogo_textos">
                        <h1>Nuestro Catalogo</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente animi assumenda, odio porro unde
                            rem placeat cumque, quibusdam sint nobis debitis quis! Nam neque dolorem aliquid illum suscipit
                            laborum quidem.
                        </p>
                    </div>

                </div>
                <div className="container w80 space_around" data-aos="fade-up">

                    {    // ----------------------- RENDER DE CATEGORIAS ----------------------------//
                        listaCat.map(item =>
                            <CardCat
                                key={item.id}
                                categoria={item}
                                editar={usuario ? true : false}
                                click={() => setEditarCat(item)}
                            />
                        )
                    }

                </div>
            </section>

            <section id="Perfuminas" className="bg_blob_violeta">
                <div className="section_bar bg_violeta h3rem"></div>
                <div className="container w100 space_center">
                    <div className="catalogo_textos">
                        <h1>Perfumes Textiles</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente animi assumenda, odio porro unde
                            rem placeat cumque, quibusdam sint nobis debitis quis! Nam neque dolorem aliquid illum suscipit
                            laborum quidem.
                        </p>
                    </div>
                </div>
                <div className="container w100 space_evenly">

                    {     // ----------------------- RENDER DE PERFUMINAS ----------------------------//
                        listaProd.map(item =>
                            item.tipoProducto === "Perfumina" ?
                                <CardList
                                    key={item.id}
                                    color="bg_violeta" imagen="./img/RosaCardVioleta.png"
                                    editar={usuario ? true : false}
                                    producto={item} click={() => setEditarProd(item)}
                                />
                                : ""
                        )
                    }

                </div>
                <div className='d-flex space_end p2'>
                    <a href='#Categorias' className='backToCat'>Volver arriba.</a>
                </div>
            </section>

            <section id="Difusores" className="bg_blob_rosa">
                <div className="section_bar bg_rosa h3rem"></div>
                <div className="container W100 space_center">
                    <div className="catalogo_textos">
                        <h1>Difusores de Varillas</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente animi assumenda, odio porro unde
                            rem placeat cumque, quibusdam sint nobis debitis quis! Nam neque dolorem aliquid illum suscipit
                            laborum quidem.
                        </p>
                    </div>
                </div>
                <div className="container space_evenly">

                    {  // ----------------------- RENDER DE DIFUSORES ----------------------------//
                        listaProd.map(item =>
                            item.tipoProducto === "Difusor" ?
                                <CardList key={item.id}
                                    color="bg_rosa" imagen="./img/RosaCardRosa.png"
                                    editar={usuario ? true : false}
                                    producto={item} click={() => setEditarProd(item)}
                                />
                                : ""
                        )
                    }

                </div>
                <div className='d-flex space_end p2'>
                    <a href='#Categorias' className='backToCat'>Volver arriba.</a>
                </div>
            </section>

            <section id="Velas" className="bg_blob_amarillo">
                <div className="section_bar bg_amarillo h3rem"></div>
                <div className="container W100 space_center">
                    <div className="catalogo_textos">
                        <h1>Velas de soja arom??ticas.</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente animi assumenda, odio porro unde
                            rem placeat cumque, quibusdam sint nobis debitis quis! Nam neque dolorem aliquid illum suscipit
                            laborum quidem.
                        </p>
                    </div>
                </div>
                <div className="container space_evenly bg_blob_amarillo">

                    {   // ----------------------- RENDER DE VELAS ----------------------------//
                        listaProd.map(item =>
                            item.tipoProducto === "Vela" ?
                                <CardShort key={item.id} nombre={item.nombre} descripcion={item.descripcion}
                                    publicado={item.publicado} imagen="./img/RosaCardAmarillo.png"
                                    editar={usuario ? true : false} producto={item} click={() => setEditarProd(item)}
                                />
                                : ""
                        )
                    }

                </div>
                <div className='d-flex space_end p2'>
                    <a href='#Categorias' className='backToCat'>Volver arriba.</a>
                </div>


            </section>

            <section id="BathTime" className="bg_blob_azul">
                <div className="section_bar bg_azul h3rem"></div>
                <div className="container W100 space_center">
                    <div className="catalogo_textos">
                        <h1>Espumas de Ba??o</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente animi assumenda, odio porro unde
                            rem placeat cumque, quibusdam sint nobis debitis quis! Nam neque dolorem aliquid illum suscipit
                            laborum quidem.
                        </p>
                    </div>
                </div>
                <div className="container space_evenly">

                    {   // ----------------------- RENDER DE ESPUMAS ----------------------------//
                        listaProd.map(item =>
                            item.tipoProducto === "Espuma" ?
                                <CardShort key={item.id} nombre={item.nombre} descripcion={item.descripcion}
                                    publicado={item.publicado} imagen="./img/RosaCardAzul.png"
                                    editar={usuario ? true : false} producto={item} click={() => setEditarProd(item)} />
                                : ""

                        )
                    }

                </div>
                <div className='d-flex space_end p2'>
                    <a href='#Categorias' className='backToCat'>Volver arriba.</a>
                </div>
            </section>
        </Fragment>
    )

}

export default Main