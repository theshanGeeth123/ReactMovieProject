import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {

    const [favorites,setFavourites] = useState([]);

    useEffect(()=>{

        const storedFavs = localStorage.getItem("favourites");

        if(storedFavs) setFavourites(JSON.parse(storedFavs));  
        

    },[]);


    useEffect(()=>{

        localStorage.setItem("favourites",JSON.stringify(favorites));

    },[favorites]);

    const addToFavourites = (movie)=>{  

        setFavourites(prev => [...prev,movie]);
    };

    const removeFromFavourites = (movieId) =>{

        setFavourites(prev => prev.filter(movie=>movie.id !== movieId))

    };

    const isFavourite = (movieId) =>{
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {

        favorites,
        addToFavourites,
        removeFromFavourites,
        isFavourite

    }


  return <MovieContext.Provider value={value}>
    {children}
    </MovieContext.Provider>;
};

