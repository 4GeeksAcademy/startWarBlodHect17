import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; 

export const Navbar = () => {
    
    const { store } = useGlobalReducer(); 

    const totalFavoritos = store?.todos?.filter(t => t.background === "gold").length || 0;

    return (
        <nav className="navbar navbar-dark bg-dark mb-3 px-5 border-bottom border-warning">
            <Link to="/">
                <span className="navbar-brand mb-0 h1 text-warning font-monospace">STAR WARS</span>
            </Link>
            <div className="ml-auto">
                <button className="btn btn-warning dropdown-toggle">
                    Favorites <span className="badge bg-dark text-white ms-2">{totalFavoritos}</span>
                </button>
            </div>
        </nav>
    );
};