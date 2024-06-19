import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import "../style/personajes.css";
import useStore from "../store/store";
import "animate.css";
import Navbar2 from "./navbar2";

export const Personajes = () => {
  const { getTrearUnPersonaje, personaje } = useStore((state) => ({
    personaje: state.personaje,
    getTrearUnPersonaje: state.getTrearUnPersonaje,
  }));

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getTrearUnPersonaje(id);
  }, []);

  console.log(personaje);
  return (
    <div>
       <Navbar2 />
      <div className="containerPersonajes">
   

        <div className="personajes">
          <div className="imagenPersonaje">
            <img
              style={{ height: "370px", borderRadius: "9px" }}
              src={personaje.image}
            ></img>
          </div>
          <div className="infoPersonaje">
            <h5 >Nombre:</h5>
            <p className="animate__animated animate__fadeIn">{personaje.name}</p>
            <div className="linea"></div>
            <h5>
              Estado:
              
            </h5>{" "}
            <p className="animate__animated animate__fadeIn">{personaje.status}</p>
            <div className="linea"></div>
            <h5>Especie:</h5>
            <p className="animate__animated animate__fadeIn">{personaje.species}</p>
            <div className="linea"></div>
            <h5 >Origen:</h5>
            <p className="animate__animated animate__fadeIn">{personaje?.origin?.name}</p>
          </div>
        </div>
        <button className="botonPersonaje" onClick={() => navigate("/buscador")}>Volver</button>
      </div>
    </div>
  );
};

export default Personajes;
