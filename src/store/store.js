import { create } from 'zustand'

const useStore = create((set) => ({
    //variables aqui
    personajes: [],
    personaje: {},
    resultadosBusqueda: [],
    usuarios: [],
    usuario: {},
    
   
    
    getTraerPersonajes: async () => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
         await fetch("https://rickandmortyapi.com/api/character", requestOptions)
            .then(response => response.json())
            .then(data => set({personajes: data.results}))
            .catch(error => console.log('error', error));
    },

   


    getTrearUnPersonaje: async (id) => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

          
          
          await fetch(`https://rickandmortyapi.com/api/character/${id}`, requestOptions)
            .then(response => response.json())
            
            .then(data => set({personaje: data}))
            .catch(error => console.log('error', error));
    },

    getBuscarPersonaje: async (name) => {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
  
      await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`, requestOptions)
        .then(response => response.json())
        .then(data => set({ resultadosBusqueda: data.results || [] }))
        .catch(error => {
          console.log('error', error);
          set({ resultadosBusqueda: [] });
        });
    },
  
    // Traer usuarios

    getTraerUsuarios: async () => {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
  
      await fetch('http://localhost:3000/api/usuarios', requestOptions)
        .then(response => response.json())
        .then(data => set({ usuarios: data }))
        .catch(error => console.log('error', error));
    },

    //crear usuario

    getCrearUsuario: async (email, password) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "email": email,
      "password": password,
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("http://localhost:3000/api/usuarios", requestOptions)
      .then((response) => response.json())
      .then((result) => set( {usuario: result}))
      .catch((error) => console.error(error));
    },
  
    
    
    


   
 
}))
export default useStore;