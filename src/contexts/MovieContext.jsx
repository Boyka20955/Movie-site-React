// Import necessary React hooks
import { createContext, useState, useContext, useEffect } from "react"

// Create a new context for movie data
const MovieContext = createContext()

// Custom hook to easily use the MovieContext
export const useMovieContext = () => useContext(MovieContext)

// Provider component to wrap around any component tree that needs access to movie context
export const MovieProvider = ({ children }) => {
    // Declare state to store favorite movies
    const [favorites, setFavorites] = useState([])

    // Load favorites from localStorage when component mounts
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")
        
        // If favorites are found in localStorage, update the state
        if (storedFavs) setFavorites(JSON.parse(storedFavs))
    }, []) // Empty dependency array = run once on mount

    // Save favorites to localStorage whenever the `favorites` state changes
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites]) // Only run when `favorites` changes

    // Function to add a movie to the favorites list
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    // Function to remove a movie from favorites by its ID
    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }
    
    // Function to check if a movie is in the favorites list
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    // Value object that will be provided to context consumers
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    // Return the provider component with the value passed down
    return (
        <MovieContext.Provider value={value}>
            {children} {/* Render the children components */}
        </MovieContext.Provider>
    )
}
