import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; 

export const Navbar = () => {
    const { store } = useGlobalReducer(); 

    const [listaFavoritos, setListaFavoritos] = useState([]);

    const actualizarFavoritos = () => {
        
        const tarjetasActivas = document.querySelectorAll(".card");
        const favoritosDetectados = [];

        tarjetasActivas.forEach((tarjeta) => {
            const botonCorazon = tarjeta.querySelector(".btn-warning");
            
            
            if (botonCorazon) {
                const titulo = tarjeta.querySelector(".card-title")?.textContent || "Elemento";
                
                const enlace = tarjeta.querySelector("a")?.getAttribute("href") || "";
                const partesRuta = enlace.split("/"); 
                const type = partesRuta[2] || "unknown";
                const id = partesRuta[3] || "0";

                favoritosDetectados.push({
                    id: id,
                    nombre: titulo,
                    type: type,
                    botonRef: botonCorazon 
                });
            }
        });

        setListaFavoritos(favoritosDetectados);
    };

    useEffect(() => {
        actualizarFavoritos();
        
        document.addEventListener("click", actualizarFavoritos);
        return () => document.removeEventListener("click", actualizarFavoritos);
    }, [store]);

    const eliminarFavorito = (e, botonRef) => {
        
        e.stopPropagation(); 
        
        if (botonRef) {
            botonRef.click(); 
        }
    };

    return (
        <nav className="navbar navbar-dark bg-dark mb-3 px-5 border-bottom border-warning">
            <Link to="/">
                <span className="navbar-brand mb-0 h1 text-warning font-monospace">STAR WARS</span>
            </Link>
            
            <div className="ml-auto dropdown">
                
                <button 
                    className="btn btn-warning dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                >
                    Favorites <span className="badge bg-dark text-white ms-2">{listaFavoritos.length}</span>
                </button>
                
                
                <ul 
                    className="dropdown-menu dropdown-menu-end bg-dark border-warning" 
                    aria-labelledby="dropdownMenuButton" 
                    style={{ minWidth: "220px" }}
                    onClick={(e) => e.stopPropagation()} 
                >
                    {listaFavoritos.length === 0 ? (
                        <li><span className="dropdown-item text-muted text-center">(Empty)</span></li>
                    ) : (
                        listaFavoritos.map((fav, index) => (
                            <li key={index} className="d-flex justify-content-between align-items-center px-3 py-1">
                                
                                <Link to={`/details/${fav.type}/${fav.id}`} className="text-warning text-decoration-none text-truncate me-2" style={{ maxWidth: "150px" }}>
                                    {fav.nombre}
                                </Link>
                                
                                
                                <button 
                                    className="btn btn-sm text-danger p-0 border-0" 
                                    onClick={(e) => eliminarFavorito(e, fav.botonRef)} 
                                    title="Remove"
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </nav>
    );
};