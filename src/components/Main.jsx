import React, { Fragment, useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, Auth } from "../firebase/fireConfig";
import CardCat from "./CardCat";
import CardList from "./CardList";
import CardShort from "./CardShort";
import EditProducto from "./EditProducto";
import EditCategoria from "./EditCategoria";
import { ContextData } from "../context/ContextData";
import DetalleProducto from "./DetalleProducto";

function Main() {
  let {
    editModal,
    setEditModal,
    detalleProducto,
    setDetalleProducto,
    producto,
    setProducto,
    categoria,
    setCategoria,
  } = useContext(ContextData);
  const [listaProd, setListaProd] = useState([]);
  const [listaCat, setListaCat] = useState([]);
  const [usuario, setUsuario] = useState(null);
  /*     const [producto, setProducto] = useState(null)
    const [categoria, setCategoria] = useState(null)
    const [modal, setModal] = useState(false); */

  useEffect(() => {
    Auth.onAuthStateChanged((user) => {
      if (user) {
        setUsuario(user.email);
      }
    });
    getProductos();
    getCategorias();
  }, []);

  useEffect(() => {
    Auth.onAuthStateChanged((user) => {
      if (user) {
        setUsuario(user.email);
      }
    });
    getProductos();
    getCategorias();
    console.log("tirri");
  }, [categoria]);

  const cerrarSesion = (e) => {
    e.preventDefault();
    Auth.signOut();
    setUsuario(null);
  };

  /* const setEditarProd = (e) => {
    setModal(true);
    const producto = {
      id: e.id,
      nombre: e.nombre,
      descripcion: e.descripcion,
      tipoAroma: e.tipoAroma,
      tipoProducto: e.tipoProducto,
      publicado: e.publicado,
    };
    setProducto(producto);
  }; */

  /*  const setMostrarDetalles = (e) => {
    setDetalle(true);
    const producto = {
      id: e.id,
      nombre: e.nombre,
      descripcion: e.descripcion,
      tipoAroma: e.tipoAroma,
      tipoProducto: e.tipoProducto,
      publicado: e.publicado,
    };
    setProducto(producto);
  }; */
  /* 
  const setEditarCat = (e) => {
    setModal(true);
    const categoria = {
      id: e.id,
      nombre: e.nombre,
      descripcion: e.descripcion,
      tipoCategoria: e.tipoCategoria,
      imagen: e.imagen,
    };
    setCategoria(categoria);
  }; */

  /*   const cancelModal = (e) => {
    return e.target == e.currentTarget
      ? (setModal(false),
        setTimeout(() => {
          return setProducto(null), setCategoria(null);
        }, 1000))
      : "";
  }; */

  const getProductos = async () => {
    const documentos = await getDocs(collection(db, "productoBelie"));
    const nuevoArray = [];
    documentos.forEach((e) => {
      const producto = {
        id: e.id,
        nombre: e.data().nombre,
        descripcion: e.data().descripcion,
        descripcionLarga: e.data().descripcionLarga,
        tipoAroma: e.data().tipoAroma,
        tipoProducto: e.data().tipoProducto,
        idealPara: e.data().idealPara,
        publicado: e.data().publicado,
      };
      nuevoArray.push(producto);
    });
    setListaProd(
      nuevoArray.sort(function (a, b) {
        var textA = a.nombre;
        var textB = b.nombre;
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      })
    );
  };

  const getCategorias = async () => {
    const documentos = await getDocs(collection(db, "categoriaBelie"));
    const nuevoArray = [];
    documentos.forEach((e) => {
      const categoria = {
        id: e.id,
        nombre: e.data().nombre,
        descripcion: e.data().descripcion,
        imagen: e.data().imagen,
        tipoCategoria: e.data().tipoCategoria,
      };
      nuevoArray.push(categoria);
    });
    setListaCat(
      nuevoArray.sort(function (a, b) {
        var textA = a.nombre.toUpperCase();
        var textB = b.nombre.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      })
    );
  };

  return (
    <Fragment>
      {editModal && producto ? <EditProducto /> : ""}
      {detalleProducto && producto ? <DetalleProducto /> : ""}
      {editModal && categoria ? <EditCategoria categoria={categoria} /> : ""}
      <header>
        <nav>
          <h1>Catalogo Belie 2022</h1>
          <ul className="links">
            <li>
              <a href="#Categorias" className="link">
                Catalogo
              </a>
            </li>
            <li>
              <a href="https://beliearomas.com" className="link link_active">
                Ir a la Tienda
              </a>
            </li>
            {usuario ? (
              <li>
                <a href="/" onClick={(e) => cerrarSesion(e)} className="link">
                  Cerrar Sesión
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </nav>
        <div className="header_banner">
          <video src="./video/bannerBelie.mp4" autoPlay muted loop></video>
          <img src="./img/imgBannerBelie.jpg" alt="banner" />
          <div className="header_banner_textos">
            <h1>
              Estás a un <span className="highlight">CLICK</span>
            </h1>
            <p>
              de descubrir tu nueva{" "}
              <span className="highlight">fragancia favorita.</span>
            </p>
          </div>
        </div>
      </header>

      <section className="wrapper vh100 renovation">
        <div className="renovation_textos">
          <h1>¡Nos Renovamos!</h1>
          <p>
            A veces los cambios nos dan miedo, puesto que requieren esfuerzo y
            la incertidumbre nos puede abrumar. En Belié creemos que los cambios
            son necesarios ya que representan oportunidades de mejora y
            crecimiento. Por eso rediseñamos nuestra imagen, agregando tambien
            muchos nuevos productos, mejorando su calidad y manteniendo nuestra
            identidad y valores.
          </p>
          <div className="renovation_Logo">
            <img src="./img/logoWord.png"></img>
          </div>
        </div>
      </section>
      <section id="Categorias" className="wrapper mb4 circlepath">
        <div className="container w80">
          <div className="catalogo_textos">
            <h1>Nuestro Catalogo</h1>
            <p>
              {" "}
              Desde difusores para tus ambientes hasta productos pensados para
              tus momentos de relax o cuidado de tu piel. Recorré nuestro
              catálogo y conocé todos nuestros nuevos aromas cuidadosamente
              seleccionados para esta nueva etapa.
            </p>
          </div>
        </div>
        <div className="container w80 space_around" data-aos="fade-up">
          {
            // ----------------------- RENDER DE CATEGORIAS ----------------------------//
            listaCat.map((item) => (
              <CardCat
                key={item.id}
                categoria={item}
                editar={usuario ? true : false}
              />
            ))
          }
        </div>
      </section>

      <section id="Perfuminas" className="bg_blob_violeta">
        <div className="section_bar bg_violeta h3rem"></div>
        <div className="container w100 space_center">
          <div className="catalogo_textos">
            <h1>Perfumes Textiles</h1>
            <p>
              Encontrá la fragancia perfecta para vos y tus prendas. Hay más de
              30 blends para elegir! con aromas que van desde lo cítrico hasta
              lo gourmand. Desarrollos armónicos intensos, para las narices más
              exigentes. Con combinaciones olfativas clásicas para los que ya
              saben lo que les gusta así como también notas exóticas para los
              que buscan algo nuevo.
            </p>
          </div>
        </div>
        <div className="container w100 space_evenly">
          {
            // ----------------------- RENDER DE PERFUMINAS ----------------------------//
            listaProd.map((item) =>
              item.tipoProducto === "Perfumina" ? (
                <CardList
                  key={item.id}
                  color="bg_violeta"
                  imagen="./img/RosaCardVioleta.png"
                  editar={usuario ? true : false}
                  producto={item}
                />
              ) : (
                ""
              )
            )
          }
        </div>
        <div className="d-flex space_end p2">
          <a href="#Categorias" className="backToCat">
            Volver arriba.
          </a>
        </div>
      </section>

      <section id="Difusores" className="bg_blob_rosa">
        <div className="section_bar bg_rosa h3rem"></div>
        <div className="container W100 space_center">
          <div className="catalogo_textos">
            <h1>Difusores de Varillas</h1>
            <p>
              Con varillas de rattan que gracias a los canales huecos que posee
              la madera dentro del tallo, brindan una mejor absorción y
              optimizan la dispersión del aroma. Como todo producto en Belié,
              sus aromas fueron estrictamente seleccionados en base a su
              rendimiento, calidad y armonía. Descubrí tu favorito entre
              nuestros nuevos blends.
            </p>
          </div>
        </div>
        <div className="container space_evenly">
          {
            // ----------------------- RENDER DE DIFUSORES ----------------------------//
            listaProd.map((item) =>
              item.tipoProducto === "Difusor" ? (
                <CardList
                  key={item.id}
                  color="bg_rosa"
                  imagen="./img/RosaCardRosa.png"
                  editar={usuario ? true : false}
                  producto={item}
                />
              ) : (
                ""
              )
            )
          }
        </div>
        <div className="d-flex space_end p2">
          <a href="#Categorias" className="backToCat">
            Volver arriba.
          </a>
        </div>
      </section>

      <section id="Velas" className="bg_blob_amarillo">
        <div className="section_bar bg_amarillo h3rem"></div>
        <div className="container W100 space_center">
          <div className="catalogo_textos">
            <h1>Velas de soja aromáticas.</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              animi assumenda, odio porro unde rem placeat cumque, quibusdam
              sint nobis debitis quis! Nam neque dolorem aliquid illum suscipit
              laborum quidem.
            </p>
          </div>
        </div>
        <div className="container space_evenly">
          {
            // ----------------------- RENDER DE VELAS ----------------------------//
            listaProd.map((item) =>
              item.tipoProducto === "Vela" ? (
                <CardShort
                  key={item.id}
                  imagen="./img/RosaCardNaranja.png"
                  editar={usuario ? true : false}
                  producto={item}
                />
              ) : (
                ""
              )
            )
          }
        </div>
        <div className="d-flex space_end p2">
          <a href="#Categorias" className="backToCat">
            Volver arriba.
          </a>
        </div>
      </section>

      <section id="OleosCremas" className="bg_blob_nude">
        <div className="section_bar bg_nude h3rem"></div>
        <div className="container W100 space_center">
          <div className="catalogo_textos">
            <h1>Oleos Corporales.</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              animi assumenda, odio porro unde rem placeat cumque, quibusdam
              sint nobis debitis quis! Nam neque dolorem aliquid illum suscipit
              laborum quidem.
            </p>
          </div>
        </div>
        <div className="container space_evenly">
          {
            // ----------------------- RENDER DE OLEOS ----------------------------//
            listaProd.map((item) =>
              item.tipoProducto === "Oleo" ? (
                <CardShort
                  key={item.id}
                  imagen="./img/RosaCardNude.png"
                  editar={usuario ? true : false}
                  producto={item}
                />
              ) : (
                ""
              )
            )
          }
        </div>
        <div className="d-flex space_end p2">
          <a href="#Categorias" className="backToCat">
            Volver arriba.
          </a>
        </div>
      </section>

      <section id="BathTime" className="bg_blob_azul">
        <div className="section_bar bg_azul h3rem"></div>
        <div className="container W100 space_center">
          <div className="catalogo_textos">
            <h1>Espumas de Baño</h1>
            <p>
              Ponele onda a tus baños de inmersión con espuma aromática. Un baño
              de burbujas con aromas pensados para acompañar tus momentos de
              relax.
            </p>
          </div>
        </div>
        <div className="container space_evenly">
          {
            // ----------------------- RENDER DE ESPUMAS ----------------------------//
            listaProd.map((item) =>
              item.tipoProducto === "Espuma" ? (
                <CardShort
                  key={item.id}
                  imagen="./img/RosaCardAzul.png"
                  editar={usuario ? true : false}
                  producto={item}
                />
              ) : (
                ""
              )
            )
          }
        </div>
        <div className="d-flex space_end p2">
          <a href="#Categorias" className="backToCat">
            Volver arriba.
          </a>
        </div>
        <div className="container W100 space_center">
          <div className="catalogo_textos">
            <h1>Sales de Baño</h1>
            <p>
              Los minerales y los oligoelementos presentes en la sal ayudan a tu
              piel a liberar las toxinas mejorando tu bienestar en general. Los
              aromas de nuestras sales fueron desarrollados con el objetivo de
              reforzar la experiencia detox aportando relajación, energía y
              renovación dependiendo de cual sea tu necesidad.
            </p>
          </div>
        </div>
        <div className="container space_evenly">
          {
            // ----------------------- RENDER DE SALES ----------------------------//
            listaProd.map((item) =>
              item.tipoProducto === "Sal de Baño" ? (
                <CardShort
                  key={item.id}
                  imagen="./img/RosaCardAzul.png"
                  editar={usuario ? true : false}
                  producto={item}
                />
              ) : (
                ""
              )
            )
          }
        </div>
        <div className="d-flex space_end p2">
          <a href="#Categorias" className="backToCat">
            Volver arriba.
          </a>
        </div>
        <div className="container W100 space_center">
          <div className="catalogo_textos">
            <h1>Jabónes Líquidos</h1>
            <p>
              Dale un mimo a tus manos al mismo tiempo que las cuidás. Los
              jabones liquidos Belie poseen ingredientes hidratantes y poseen un aroma suave que dejan tus manos
              limpias y radiantes con cada uso.  
            </p>
          </div>
        </div>
        <div className="container space_evenly">
          {
            // ----------------------- RENDER DE JABON LIQUIDO ----------------------------//
            listaProd.map((item) =>
              item.tipoProducto === "Jabón Líquido" ? (
                <CardShort
                  key={item.id}
                  imagen="./img/RosaCardAzul.png"
                  editar={usuario ? true : false}
                  producto={item}
                />
              ) : (
                ""
              )
            )
          }
        </div>
        <div className="d-flex space_end p2">
          <a href="#Categorias" className="backToCat">
            Volver arriba.
          </a>
        </div>
      </section>
    </Fragment>
  );
}

export default Main;
