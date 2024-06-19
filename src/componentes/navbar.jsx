import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import "animate.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [estilo, setEstilo] = useState("");
  const currentPath = window.location.pathname;


  const handleNavigate = () => {
    setEstilo("animate__animated animate__rubberBand");
    setTimeout(() => {
      setEstilo("");
      navigate("/");
    }, 1000);
  };

  return (
    <nav className="navbar w-100 bg-body-tertiary" style={{ padding: 0 }}>
      
      <form
        style={{ backgroundColor: "black", margin: 0, padding: "10px" }}
        className="container-fluid justify-content-start "
      >
        <img
          className={estilo}
          style={{
            width: "100px",
            height: "100px",
            cursor: "pointer",
            borderRadius: "50%",
          }}
          src="https://preview.redd.it/x498howiltl71.gif?format=png8&s=d1c048cf6e8e9863f60e390f628a75fffd592e08"
          onClick={handleNavigate}
        />

        {currentPath !== "/" && (
          <img
            src="https://playbyplaytoys.es/wp-content/uploads/2021/01/rickymorty_bleed.png"
            style={{
              width: "18%",
              height: "18%",
              margin: "0 auto",
              marginRight: "40%",
            }}
            alt="rick y morty"
          />
        )}
{/* 
        {currentPath!== "/buscador" && (
           <img
           
            style={{backgroundImage:"url('https://e1.pxfuel.com/desktop-wallpaper/873/692/desktop-wallpaper-interdimensional-rss-the-rick-and-morty-podcast-rick-and-morty-outer-space.jpg')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
              }}
           alt="rick y morty"
         />
       )}
 */}
       
      </form>
    </nav>
  );
};

export default Navbar;
