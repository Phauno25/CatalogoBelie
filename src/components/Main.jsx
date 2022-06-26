import React, { Fragment, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db, Auth } from '../firebase/fireConfig'
import CardList from './CardList'
import CardShort from './CardShort'
import EditProducto from './EditProducto'


function Main() {

    const [listaProd, setListaProd] = useState([])
    const [usuario, setUsuario] = useState(null)
    const [producto, setProducto] = useState(null)
    const [modal, setModal] = useState(false);

    useEffect(() => {

       /*  const getProductos = async () => {
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
        } */
        Auth.onAuthStateChanged((user) => {
            if (user) {
                setUsuario(user.email)
            }
        })
        getProductos();

    }, [])

    const cerrarSesion = (e) => {
        e.preventDefault();
        Auth.signOut();
        setUsuario(null);
    }

    const setEditar = (e) => {
        const producto =  {
            id: e.id,
            nombre: e.nombre,
            descripcion: e.descripcion,
            tipoAroma: e.tipoAroma,
            tipoProducto: e.tipoProducto,
            publicado: e.publicado,

        } 
        setProducto(producto);
        setModal(true);
    }

    const cancelModal = (e)=>{
       
        return e.target == e.currentTarget ?  (
        setModal(false),
        setTimeout(()=>{setProducto(null)},1000)) : "";
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
    const finish = ()=>{
        getProductos();
        setProducto(null)
    }



    return (
        <Fragment>
            {
                producto ? <EditProducto producto={producto} modal={modal} clickCancel={e=>cancelModal(e)} finish={()=>finish()} /> : ""
            }
            <header>
                <nav>
                    <h1>Catalogo Belie 2022</h1>
                    <ul className="links">
                        <li><a href="/" className="link">Inicio</a></li>
                        <li><a href="/" className="link">Catalogo</a></li>
                        {usuario ? <li><a href="/" onClick={(e) => cerrarSesion(e)} className="link">Cerrar Sesión</a></li> : ""}
                    </ul>
                </nav>
                <div className="header_banner">
                    <video src='./video/bannerBelie.mp4' autoPlay muted loop></video>
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

                    <div className="cardCat">
                        <div className="cardCat_header">
                            <div className="cardCat_header_img">
                                <img src="./img/CatPerfumina.png" alt="Perfume Textil" />
                            </div>
                            <div className="cardCat_header_info">
                                <div>
                                    <h2>Difusores</h2>
                                    <p>Difusores de varilla de bamboo para todos los ambientes.</p>
                                </div>


                                <a href="">¡Quiero ver!</a>
                            </div>
                        </div>
                    </div>

                    <div className="cardCat">
                        <div className="cardCat_header">
                            <div className="cardCat_header_img">
                                <img src="./img/CatPerfumina.png" alt="Perfume Textil" />
                            </div>
                            <div className="cardCat_header_info">
                                <div>
                                    <h2>Velas de Soja</h2>
                                    <p>Velas aromáticas naturales sin aditivos ni parafina.</p>
                                </div>


                                <a href="">¡Quiero ver!</a>
                            </div>
                        </div>
                    </div>

                    <div className="cardCat">
                        <div className="cardCat_header">
                            <div className="cardCat_header_img">
                                <img src="./img/CatPerfumina.png" alt="Perfume Textil" />
                            </div>
                            <div className="cardCat_header_info">
                                <div>
                                    <h2>Bath Time</h2>
                                    <p>Productos con aromas relajantes para tus momentos de relax.</p>
                                </div>


                                <a href="">¡Quiero ver!</a>
                            </div>
                        </div>
                    </div>

                    <div className="cardCat">
                        <div className="cardCat_header">
                            <div className="cardCat_header_img">
                                <img src="./img/CatPerfumina.png" alt="Perfume Textil" />
                            </div>
                            <div className="cardCat_header_info">
                                <div>
                                    <h2>Oleos &amp; Cremas</h2>
                                    <p>Combiná el cuidado de tu piel con aromas suaves y armónicos.</p>
                                </div>


                                <a href="">¡Quiero ver!</a>
                            </div>
                        </div>
                    </div>

                    <div className="cardCat">
                        <div className="cardCat_header">
                            <div className="cardCat_header_img">
                                <img src="./img/CatPerfumina.png" alt="Perfume Textil" />
                            </div>
                            <div className="cardCat_header_info">
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

            <section className="bg_blob_violeta">
                <div className="section_bar bg_violeta h3rem"></div>
                <div className="container w100 space_center">
                    <div className="catalogo_textos w50">
                        <h1>Perfumes Textiles</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente animi assumenda, odio porro unde
                            rem placeat cumque, quibusdam sint nobis debitis quis! Nam neque dolorem aliquid illum suscipit
                            laborum quidem.</p>
                    </div>

                </div>
                <div id="perfuminas" className="container w100 space_evenly">

                    {    // ------- RENDER DE PERFUMINAS ---------//
                        listaProd.map(item =>
                            item.tipoProducto === "Perfumina" ?
                                <CardList
                                    key={item.id}
                                    color="bg_violeta" imagen="./img/RosaCardVioleta.png"
                                    editar={usuario ? true : false}
                                    producto={item} click={()=>setEditar(item)}/>
                                : ""
                        )
                    }

                </div>


            </section>
            <section className="bg_blob_rosa">
                <div className="section_bar bg_rosa h3rem"></div>
                <div className="container W100 space_center">
                    <div className="catalogo_textos w50">
                        <h1>Difusores de Varillas</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente animi assumenda, odio porro unde
                            rem placeat cumque, quibusdam sint nobis debitis quis! Nam neque dolorem aliquid illum suscipit
                            laborum quidem.</p>
                    </div>

                </div>
                <div id="difusores" className="container space_evenly">

                    {  // ------- RENDER DE DIFUSORES ---------//
                        listaProd.map(item =>
                            item.tipoProducto === "Difusor" ?
                                <CardList key={item.id}
                                    color="bg_rosa" imagen="./img/RosaCardRosa.png"
                                    editar={usuario ? true : false}
                                    producto={item} click={()=>setEditar(item)}/>
                                : ""

                        )
                    }

                </div>

            </section>
            <section className="bg_blob_amarillo">
                <div className="section_bar bg_amarillo h3rem"></div>
                <div className="container W100 space_center">
                    <div className="catalogo_textos w50">
                        <h1>Velas de soja aromáticas.</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente animi assumenda, odio porro unde
                            rem placeat cumque, quibusdam sint nobis debitis quis! Nam neque dolorem aliquid illum suscipit
                            laborum quidem.</p>
                    </div>

                </div>
                <div id="velas" className="container space_evenly bg_blob_amarillo">

                    {  // ------- RENDER DE VELAS ---------//
                        listaProd.map(item =>
                            item.tipoProducto === "Vela" ?
                                <CardShort key={item.id} nombre={item.nombre} descripcion={item.descripcion}
                                    publicado={item.publicado} imagen="./img/RosaCardAmarillo.png"
                                    editar={usuario ? true : false}   />
                                : ""

                        )
                    }

                </div>

            </section>
            <section className="bg_blob_azul">
                <div className="section_bar bg_azul h3rem"></div>
                <div className="container W100 space_center">
                    <div className="catalogo_textos w50">
                        <h1>Espumas de Baño</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente animi assumenda, odio porro unde
                            rem placeat cumque, quibusdam sint nobis debitis quis! Nam neque dolorem aliquid illum suscipit
                            laborum quidem.</p>
                    </div>

                </div>
                <div id="bath" className="container space_evenly">

                    {  // ------- RENDER DE ESPUMAS ---------//
                        listaProd.map(item =>
                            item.tipoProducto === "Espuma" ?
                                <CardShort key={item.id} nombre={item.nombre} descripcion={item.descripcion}
                                    publicado={item.publicado} imagen="./img/RosaCardAzul.png"
                                    editar={usuario ? true : false} />
                                : ""

                        )
                    }
                </div>

            </section>
        </Fragment>
    )

}

export default Main