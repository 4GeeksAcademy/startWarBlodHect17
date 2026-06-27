import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Card = (props) => {
    
    const { dispatch, id, nombre, type } = props;
    
    
    const [marcado, setMarcado] = useState(false);

    const manejarFavorito = () => {
        setMarcado(!marcado);
        
        
        if (dispatch) {
            dispatch({
                type: 'add_task',
                payload: {
                    id: id,
                    color: !marcado ? "gold" : null 
                }
            });
        }
    };

    return (
        <div className="card m-2 shadow-sm" style={{ minWidth: "18rem", maxWidth: "18rem", flexShrink: 0 }}>
            <img src="https://placeholder.pics/svg/300x200" className="card-img-top" alt={nombre} />
            <div className="card-body d-flex flex-column justify-content-between">
                <div>
                    <h5 className="card-title text-dark">{nombre}</h5>
                    <p className="card-text text-muted">ID: {id}</p>
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <Link to={`/details/${type}/${id}`} className="btn btn-outline-primary btn-sm">
                        Learn more!
                    </Link>
                    <button 
                        className={`btn ${marcado ? "btn-warning" : "btn-outline-warning"} btn-sm`} 
                        onClick={manejarFavorito}
                    >
                        <i className={marcado ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};