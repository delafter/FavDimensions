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
    usuarios,
    getTraerUsuarios,
    personajes,
    resultadosBusqueda,
    getTraerPersonajes,
    getBuscarPersonaje,
  } = useStore((state) => ({
    usuarios: state.usuarios,
    getTraerUsuarios: state.getTraerUsuarios,
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
  };

  const [favorito, setFavorito] = useState([]);

  const handleFavorito = (name) => {
    setFavorito([favorito, name]);
    if (favorito.includes(name)) {
      favorito.splice(favorito.indexOf(name), 1);
    }
  };

  useEffect(() => {
    getTraerPersonajes();
  }, [getTraerPersonajes]);

  useEffect(() => {
    getTraerUsuarios();
  }, []);
 
 
  return (
    <div>
      <Navbar />
      <div style={{ "--background-color": color }} className="containerColor">
        <div>favorito: {favorito}</div>
        <div className="row flex-row flex-nowrap overflow-auto">
          {resultadosBusqueda.length > 0
            ? resultadosBusqueda.map((personaje) => (
                <div className="col-md-2" key={personaje.id}>
                  <h6
                    style={{ marginTop: "30px", "--text-color": colorLetras }}
                  >
                    {personaje.name}
                    {" "}
                    <FaRegHeart
                      onClick={() =>{
                        handleFavorito(personaje.name);
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
                        handleFavorito(personaje.name);
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
