import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import "../style/home.css";
import Navbar from "./navbar";

export const Home = () => {
  const { personajes, getTraerPersonajes, crearUsuario } = useStore(
    (state) => ({
      crearUsuario: state.getCrearUsuario,
      personajes: state.personajes,
      getTraerPersonajes: state.getTraerPersonajes,
    })
  );

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    getTraerPersonajes();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const personajeNumero19 = personajes[18];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleCrearUsuario = () => {
    crearUsuario(email, password);
  };

  console.log(email, password);

  return (
    <div>
      <Navbar />
      {
        <Modal show={show} onHide={handleClose}>
          <Modal.Header
            className="fondoModal"
            style={{ backgroundColor: "#468B97", margin: 0 }}
            closeButton
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Modal.Title style={{ color: "white" }}>
                Iniciar sesion
              </Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body className="fondoModal" style={{ margin: 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                paddingLeft: "100px",
              }}
            >
              <input
                value={email}
                onChange={handleEmail}
                type="text"
                placeholder="Usuario"
                style={{
                  width: "70%",
                  marginBottom: "10px",
                  backgroundColor: "transparent",
                  color: "white",
                }}
              />
              <input
                value={password}
                onChange={handlePassword}
                type="password"
                placeholder="Contraseña"
                style={{
                  width: "70%",
                  backgroundColor: "transparent",
                  color: "white",
                }}
              />
            </div>
          </Modal.Body>

          <Modal.Footer
            className="fondoModal"
            style={{
              backgroundColor: "#468B97",
              display: "flex",
              justifyContent: "center",
              margin: 0,
              width: "100%",
              padding: 10,
            }}
          >
            <Button
              variant="primary" 
              onClick={() => {
                handleClose();
                handleCrearUsuario();
              }}
            >
              Crear usuario
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      }

      <div className="App">
        <img
          onClick={() => navigate("/buscador")}
          src="https://playbyplaytoys.es/wp-content/uploads/2021/01/rickymorty_bleed.png"
          alt="rick y morty"
        />
        {personajeNumero19 && (
          <div key={personajeNumero19.id}>
            <img
              onClick={handleShow}
              className="numero19"
              src={personajeNumero19.image}
              alt={personajeNumero19.name}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
