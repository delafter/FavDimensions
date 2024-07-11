import { create } from "zustand";

const useStore = create((set) => ({
  //variables aqui
  personajes: [],
  personaje: {},
  resultadosBusqueda: [],
  usuarios: [],
  usuario: {},
  usuario_id: "",
  token: "",
  favoritos: [],

 

  getTraerPersonajes: async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("https://rickandmortyapi.com/api/character", requestOptions)
      .then((response) => response.json())
      .then((data) => set({ personajes: data.results }))
      .catch((error) => console.log("error", error));
  },

  getTrearUnPersonaje: async (id) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      `https://rickandmortyapi.com/api/character/${id}`,
      requestOptions
    )
      .then((response) => response.json())

      .then((data) => set({ personaje: data }))
      .catch((error) => console.log("error", error));
  },

  getBuscarPersonaje: async (name) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      `https://rickandmortyapi.com/api/character/?name=${name}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => set({ resultadosBusqueda: data.results || [] }))
      .catch((error) => {
        console.log("error", error);
        set({ resultadosBusqueda: [] });
      });
  },

  // Traer usuarios

  getTraerUsuarios: async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("http://localhost:3000/api/usuarios", requestOptions)
      .then((response) => response.json())
      .then((data) => set({ usuarios: data }))
      .catch((error) => console.log("error", error));
  },

  //crear usuario

  getCrearUsuario: async (email, password) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        
      }),
      redirect: "follow",
    };

    fetch("http://localhost:3000/api/usuarios/signup", requestOptions)
      .then((response) => response.json())
      .then((result) => set({ usuarios: result }))
      .catch((error) => console.error(error));
  },

  //login usuario

  getLoginUsuario: async (email, password) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      redirect: "follow",
    };

    fetch("http://localhost:3000/api/usuarios/login", requestOptions)
      .then((response) => response.json())
      .then((result) => set({ 
        usuario: result,
        usuario_id: result.data._id, 
        token: result.token}))

      
      .catch((error) => console.error(error));
  },

  //logear usuario por id

  getLoguearUsuario: async (id, email, password) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
       
        email: email,
        password: password,
      }),


    };

    await fetch(`http://localhost:3000/api/usuarios/login/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => set({ usuario: data, usuario_id: id}))
      .catch((error) => console.log("error", error));
  },

  // guardar favoritos

  getGuardarFavoritos: async ( name) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        
        name: name,
      }),
      redirect: "follow",
    };

    fetch("http://localhost:3000/api/favoritos", requestOptions)
      .then((response) => response.json())
      .then((result) =>  /* set((state) => ({ favoritos: [...state.favoritos.resut, result] }))) */ set({ favoritos: result }))
      .catch((error) => console.error(error));
  }




}));
export default useStore;
