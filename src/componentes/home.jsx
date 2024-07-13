import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import "../style/home.css";
import Navbar from "./navbar";

export const Home = () => {
  const { personajes, getTraerPersonajes, crearUsuario, loginUsuario, loguearUsuario, usuario_id, token } = useStore(
    (state) => ({
      token: state.token,
      usuario_id: state.usuario_id,
      loguearUsuario: state.getLoguearUsuario,
      loginUsuario: state.getLoginUsuario,
      crearUsuario: state.getCrearUsuario,
      personajes: state.personajes,
      getTraerPersonajes: state.getTraerPersonajes,
    })
  );

  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    getTraerPersonajes();
  }, []);

  const handleCloseSignUp = () => setShowSignUp(false);
  const handleShowSignUp = () => setShowSignUp(true);
  
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const personajeNumero19 = personajes[18];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginEmail = (e) => {
    setLoginEmail(e.target.value);
  };

  const handleLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  };

  const handleCrearUsuario = () => {
    crearUsuario(email, password);
   
  };

  const handleLoginUsuario = () => {
    loginUsuario(loginEmail, loginPassword);
    /* (navigate("/buscador")); */
  };
  
  console.log("usuario_id:", usuario_id, "token:", token);
  
  return (
    <div>
      <Navbar />
      {
        <Modal show={showSignUp} onHide={handleCloseSignUp}>
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
                SIGN UP
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
            <Button style={{ backgroundColor: "trasparent", color: "white" }}
              variant="primary"
              onClick={() => {
                handleCloseSignUp();
                handleCrearUsuario();
              
              }}
            >
              Sign up
            </Button>
            <Button 
            style={{ backgroundColor: "trasparent", color: "white", marginLeft: "40px" }}
            variant="secondary" 
            onClick={handleCloseSignUp}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      }

       

      {
        <Modal show={showLogin} onHide={handleCloseLogin}>
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
                LOGIN
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
                value={loginEmail}
                onChange={handleLoginEmail}
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
                value={loginPassword}
                onChange={handleLoginPassword}
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
              style={{ backgroundColor: "trasparent", color: "white" }}
              variant="primary"
              onClick={() => {
                handleCloseLogin();
                handleLoginUsuario();
              }}
            >
              Login
            </Button>
            <Button 
            style={{ backgroundColor: "trasparent", color: "white", border: "white", marginLeft: "40px"}}
            variant="secondary" 
            onClick={handleCloseLogin}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      }

      <div className="App">
        <img
          onClick={() => navigate("/buscador")}
          src="https://playbyplaytoys.es/wp-content/uploads/2021/01/rickymorty_bleed.png" // go to buscador
          alt="rick y morty"
        />
        {personajeNumero19 && (
          <div key={personajeNumero19.id}>
            <img
             
              className="numero19"
              src={personajeNumero19.image}
              alt={personajeNumero19.name}
            />
          </div>
        )}
        <div className="containerButtonsLogin">
          <div className="containerLogin">
            <button onClick={handleShowSignUp} className="buttonLogin">Sign Up</button>
          </div>
          <div className="containerSingUp">
            <button onClick={handleShowLogin} className="buttonSingUp">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
