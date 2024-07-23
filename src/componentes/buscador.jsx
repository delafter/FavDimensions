import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/buscador.css";
import useStore from "../store/store";
import { FaRegMoon } from "react-icons/fa";
import Navbar from "./navbar";
import { FaRegHeart } from "react-icons/fa";

export const Buscador = () => {
  const navigate = useNavigate();

  const [color, setColor] = useState("white");
  const [colorLetras, setColorLetras] = useState("black");
  const [boxShadow, setBoxShadow] = useState("0px 0px 10px 0px black");

  const cambiarColorLetras = () => {
    setColorLetras(colorLetras === "black" ? "white" : "black");
  };

  const cambiarColor = () => {
    setColor(color === "white" ? "black" : "white");
  };

  const cambiarBoxShadow = () => {
    setBoxShadow(
      boxShadow === "0px 0px 10px 0px black"
        ? "0px 0px 10px 3px white"
        : "0px 0px 10px 0px black"
    );
  };

  const [corazonAnimado, setCorazonAnimado] = useState(null);

  const handleCorazon = (id) => {
    setCorazonAnimado(id);
    setTimeout(() => {
      setCorazonAnimado("");
    }, 1000);
  };

  const {
    getEliminarFavoritos,

    userId,
    id,
    getTraerFavoritos,
    favoritos,
    getGuardarFavoritos,
    getTraerUsuario,
    personajes,
    resultadosBusqueda,
    getTraerPersonajes,
    getBuscarPersonaje,
  } = useStore((state) => ({
    id: state.id,
    getEliminarFavoritos: state.getEliminarFavoritos,
    usuario_id: state.usuario_id,
    usuario: state.usuario,
    userId: state.userId,
    personajeFavorito: state.personajeFavorito,
    getTraerFavoritos: state.getTraerFavoritos,
    favoritos: state.favoritos,
    getGuardarFavoritos: state.getGuardarFavoritos,
    getTraerUsuario: state.getTraerUsuario,
    personajes: state.personajes,
    resultadosBusqueda: state.resultadosBusqueda,
    getTraerPersonajes: state.getTraerPersonajes,
    getBuscarPersonaje: state.getBuscarPersonaje,
  }));

  const [busqueda, setBusqueda] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setBusqueda(value);
    getBuscarPersonaje(value);
  };

  const traerPersonajes = () => {
    window.location.reload();
    getTraerFavoritos(userId);
  };

  const [favorito, setFavorito] = useState([]);

  const handleFavorito = (name, id) => {
    console.log("userId:", userId);
    console.log("favorito:", favorito);

    const updatedFavorito = [...favorito];
    const index = updatedFavorito.indexOf(name, id);

    if (index > -1) {
      updatedFavorito.splice(index, 1);
    } else {
      updatedFavorito.push(name, id, userId);
    }

    setFavorito(updatedFavorito);
    getGuardarFavoritos(name, id, userId); // Asegúrate de pasar userId aquí
  };

  useEffect(() => {
    getTraerPersonajes();
  }, [getTraerPersonajes, getTraerFavoritos]);

  useEffect(() => {
    getGuardarFavoritos();
    getTraerUsuario();
  }, []);

  useEffect(() => {
    if (userId) {
      getTraerFavoritos(userId); // Pasa userId aquí
    }
  }, [userId, getTraerFavoritos]);

  return (
    <div>
      <Navbar />
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Offcanvas
          </h5>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div>
            <h6>P E R S O N A J E S F A V O R I T O S</h6>
          </div>
          <div className="dropdown mt-3">
            <div>
              {favoritos && favoritos.length > 0 ? (
                favoritos.map((favorito) => (
                  <div key={favorito.id}>
                    <h6
                      style={{ cursor: "pointer", backgroundColor: "red", display: "flex", justifyContent: "center" }}
                      onClick={() => navigate(`/personajes/${favorito.id}`)}
                    >
                      {favorito.name}{" "}
                     
                    </h6>
                    <button 
                        className="botonEliminar"
                        style={{ marginLeft: "20px" }}
                        onClick={() => {
                          getEliminarFavoritos(favorito.id, userId);
                          console.log("eliminado a", favorito.name);
                          getTraerFavoritos(userId);
                        }}
                      >
                        eliminar
                      </button>
                  </div>
                ))
              ) : (
                <h6>No tienes personajes favoritos.</h6>
              )}
            </div>
          </div>
        </div>
      </div>{" "}
      <div style={{ "--background-color": color }} className="containerColor">
        <button
          style={{ marginTop: "30px", "--text-color": colorLetras }}
          className="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          Favoritos {favoritos.length > 0 ? `${favoritos.length}` : ""}
        </button>{" "}
        <div className="row flex-row flex-nowrap overflow-auto">
          {resultadosBusqueda.length > 0
            ? resultadosBusqueda.map((personaje) => (
                <div className="col-md-2" key={personaje.id}>
                  <h6
                    style={{ marginTop: "30px", "--text-color": colorLetras }}
                  >
                    {personaje.name}{" "}
                    <FaRegHeart
                      onClick={() => {
                        handleFavorito(personaje.name, personaje.id);
                        handleCorazon(personaje.id);
                      }}
                      className={
                        corazonAnimado === personaje.id
                          ? "animate__animated animate__flip"
                          : ""
                      }
                    />
                  </h6>
                  <img
                    style={{ marginBottom: "40px", "--box-shadow": boxShadow }}
                    className="imagen"
                    src={personaje.image}
                    onClick={() => navigate(`/personajes/${personaje.id}`)}
                    alt={personaje.name}
                  />
                </div>
              ))
            : personajes.map((personaje) => (
                <div className="col-md-2" key={personaje.id}>
                  <h6
                    style={{ marginTop: "30px", "--text-color": colorLetras }}
                  >
                    {personaje.name}{" "}
                    <FaRegHeart
                      onClick={() => {
                        handleFavorito(personaje.name, personaje.id);
                        handleCorazon(personaje.id);
                      }}
                      className={
                        corazonAnimado === personaje.id
                          ? "animate__animated animate__flip"
                          : ""
                      }
                    />
                  </h6>
                  <img
                    style={{ marginBottom: "40px", "--box-shadow": boxShadow }}
                    className="imagen"
                    src={personaje.image}
                    onClick={() => navigate(`/personajes/${personaje.id}`)}
                    alt={personaje.name}
                  />
                </div>
              ))}
        </div>
        <div className="container">
          <div className="buscador">
            <h1 style={{ "--text-color": colorLetras }}>
              Buscador de personajes
            </h1>
            <div className="linea"></div>
            <input
              className="inputBuscador"
              style={{ "--text-color": colorLetras }}
              onChange={handleInputChange}
              value={busqueda}
              type="text"
              placeholder="Búsqueda por nombre"
            />
            <button
              style={{
                width: "200px",
                marginTop: "10px",
                "--text-color": colorLetras,
              }}
              className="bontonTraer"
              onClick={traerPersonajes}
            >
              {" "}
              Traer personajes
            </button>
          </div>
        </div>
        <div className="containerIcono">
          <FaRegMoon
            className="icono"
            style={{
              "--text-color": colorLetras,
              height: "30px",
              width: "30px",
            }}
            onClick={() => {
              cambiarColor();
              cambiarColorLetras();
              cambiarBoxShadow();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Buscador;
