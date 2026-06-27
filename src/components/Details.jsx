import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export const Details = () => {
    
    const { type, id } = useParams();
    const [elemento, setElemento] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        setCargando(true);
        
        fetch(`https://www.swapi.tech/api/${type}/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.result) {
                    setElemento(data.result.properties);
                }
                setCargando(false);
            })
            .catch((err) => {
                console.error("Error cargando detalles:", err);
                setCargando(false);
            });
    }, [type, id]);

    if (cargando) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!elemento) {
        return (
            <div className="container text-center mt-5 text-white">
                <h3>No se encontraron detalles para este elemento.</h3>
                <Link to="/" className="btn btn-warning mt-3">Volver al Inicio</Link>
            </div>
        );
    }

    return (
        <div className="container mt-5 text-white">
            <div className="card bg-dark border-secondary mb-3 shadow-lg p-4">
                <div className="row g-0 align-items-center">
                    <div className="col-md-4 text-center">
                        <img 
                            src="https://placeholder.pics/svg/400x400" 
                            className="img-fluid rounded border border-secondary" 
                            alt={elemento.name} 
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body px-4">
                            <h1 className="card-title text-warning font-monospace mb-4">{elemento.name}</h1>
                            <p className="card-text fs-5">
                                Aquí puedes ver toda la información detallada procedente de los archivos de la galaxia sobre este espécimen o localización del universo Star Wars.
                            </p>
                        </div>
                    </div>
                </div>

                <hr className="border-warning my-4" />

                
                <div className="row text-center font-monospace text-warning">
                    {type === "people" ? (
                        <>
                            <div className="col-6 col-md-2 mb-3"><strong>Height</strong><p className="text-white mt-1">{elemento.height} cm</p></div>
                            <div className="col-6 col-md-2 mb-3"><strong>Mass</strong><p className="text-white mt-1">{elemento.mass} kg</p></div>
                            <div className="col-6 col-md-2 mb-3"><strong>Hair Color</strong><p className="text-white mt-1">{elemento.hair_color}</p></div>
                            <div className="col-6 col-md-2 mb-3"><strong>Skin Color</strong><p className="text-white mt-1">{elemento.skin_color}</p></div>
                            <div className="col-6 col-md-2 mb-3"><strong>Eye Color</strong><p className="text-white mt-1">{elemento.eye_color}</p></div>
                            <div className="col-6 col-md-2 mb-3"><strong>Birth Year</strong><p className="text-white mt-1">{elemento.birth_year}</p></div>
                        </>
                    ) : (
                        <>
                            <div className="col-6 col-md-2 mb-3"><strong>Climate</strong><p className="text-white mt-1">{elemento.climate}</p></div>
                            <div className="col-6 col-md-2 mb-3"><strong>Population</strong><p className="text-white mt-1">{elemento.population}</p></div>
                            <div className="col-6 col-md-2 mb-3"><strong>Orbital Period</strong><p className="text-white mt-1">{elemento.orbital_period} days</p></div>
                            <div className="col-6 col-md-2 mb-3"><strong>Rotation Period</strong><p className="text-white mt-1">{elemento.rotation_period} hours</p></div>
                            <div className="col-6 col-md-2 mb-3"><strong>Diameter</strong><p className="text-white mt-1">{elemento.diameter} km</p></div>
                            <div className="col-6 col-md-2 mb-3"><strong>Terrain</strong><p className="text-white mt-1">{elemento.terrain}</p></div>
                        </>
                    )}
                </div>
                
                <div className="text-end mt-3">
                    <Link to="/" className="btn btn-outline-warning">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};