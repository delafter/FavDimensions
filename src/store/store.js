import { create } from 'zustand'

const useStore = create((set) => ({
    //variables aqui
    personajes: [],
    personaje: {},
    resultadosBusqueda: [],
   
    
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

     getPrueba: async () => {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      await fetch("http://localhost:3000/users/test", requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    },
    
    
    


   
 
}))
export default useStore;