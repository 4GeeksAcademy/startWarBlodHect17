import React from "react";
import fotoStarWa from "../assets/img/starWar.jpg";
import { Link } from "react-router-dom";

export const Planeta = (props) => {
    
    const { store, dispatch, id, planet, type } = props;

   
    const todoAsociado = store?.todos?.find(t => t.id === id);
    const colorActual = todoAsociado ? todoAsociado.background : null;

    
    const esFavorito = colorActual === "gold";

    const manejarFavorito = () => {
        
        dispatch({
            type: 'add_task',
            payload: {
                id: id,
                
                color: esFavorito ? null : "gold" 
            }
        });
    };

    return (
        <div className="card bg-dark text-white me-3" style={{ minWidth: "18rem", maxWidth: "18rem" }}>
            <img src={fotoStarWa} className="card-img-top" alt="Planeta" />
            <div className="card-body border-top border-warning">
                <h5 className="card-title">{planet}</h5>
                <p className="card-text small text-secondary">
                    ID asignado en el store: {id} <br />
                    {esFavorito ? "⭐ ¡Planeta en favoritos!" : "Añádelo a tus favoritos."}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                    
                    <Link 
                        to={`/details/${type}/${id}`} 
                        className="btn btn-outline-primary"
                    >
                        Learn more!
                    </Link>
                    
                    
                    <button 
                        className={`btn ${esFavorito ? "btn-warning" : "btn-outline-warning"} btn-sm`} 
                        onClick={manejarFavorito}
                    >
                        <i className={esFavorito ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};