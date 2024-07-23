import { create } from "zustand";

const useStore = create((set) => ({
  //variables aqui
  personajes: [],
  personaje: {},
  resultadosBusqueda: [],
  usuarios: [],
  usuario: {},
  usuario_id: "",
  userId: "",
  token: "",
  favoritos: [],
  personajeFavorito: [],
  id: "",

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
      .then((result) =>
        set({
          usuario: result,
          usuario_id: result.data._id,
          token: result.token,
          userId: result.data._id,
          // llamar a la funcion traer favoritos para que se ejecute al loguear
          
        })
      )

      .catch((error) => console.error(error));
  },
  // traer usuario

  getTraerUsuario: async (id) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(`http://localhost:3000/api/usuarios/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => set({ usuario: data }))
      .catch((error) => console.log("error", error));
  },

  


  // guardar favoritos de un usuario

  getGuardarFavoritos: async (name, id, userId) => {
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, userId }),
      redirect: "follow",
    };
  
    try {
      const response = await fetch(`http://localhost:3000/api/favoritos/${userId}`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
  
      const result = await response.json();
      set((state) => ({
        favoritos: [...state.favoritos, result.data],
      }));
    } catch (error) {
      console.error('Error:', error);
    }
  },
  
  

  // traer favoritos de un usuario

  getTraerFavoritos: async (userId) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
  
    try {
      const response = await fetch(`http://localhost:3000/api/favoritos/${userId}`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      set({ favoritos: data.data || [] }); // Asegúrate de que favoritos sea un arreglo
    } catch (error) {
      console.log("Error al obtener favoritos:", error);
    }
  },

  //eliminar favoritos de un usuario

  getEliminarFavoritos: async (id, userId) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    try {
      const response = await fetch(`http://localhost:3000/api/favoritos/${userId}/${id}`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const result = await response.json();
      set((state) => ({
        favoritos: state.favoritos.filter((favorito) => favorito._id !== id),
      }));
    } catch (error) {
      console.error('Error:', error);
    }
  },
  
  

}));
export default useStore;
