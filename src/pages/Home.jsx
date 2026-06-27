import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; 
import { Card } from "../components/Card.jsx";
import { Planeta } from "../components/Planeta.jsx";


export const Home = () => {
    
    const {store, dispatch} = useGlobalReducer();
    
    const [infoModal, setInfoModal] = useState({ title: "", text: "" });

    const Characters = [
        { nombre: 'Luke Skywalker', id: 1, planet: 'Tatooine' }, 
        { nombre: 'C-3PO', id: 2, planet: 'Alderaan'},         
        { nombre: 'R2-D2', id: 3, planet: 'Yavin IV' },             
        { nombre: 'Darth Vader', id: 4, planet: 'Hoth' },    
        { nombre: 'Leia Organa', id: 5, planet: 'Dagobah' },    
        { nombre: 'Owen Lars', id: 6, planet: 'Bespin' },
    ];

const todosSeguros = Characters.map(char => {
        const existente = store?.todos?.find(t => t.id === char.id);
        return existente || { id: char.id, title: char.nombre, background: null };
    });


    const storeOptimizado = {
        ...store,
        todos: todosSeguros
    };

    return ( 
        <>
            <div className="container mt-5">
                <h1 className="mb-5">Characters</h1>
                <div className="d-flex flex-row overflow-scroll pb-3 shadow-sm" style={{ scrollbarWidth: "thin" }}>
                    {Characters.map((item, index) => {
                        const todoAsociado = storeOptimizado.todos.find(t => t.id === item.id);
                        const colorActual = todoAsociado ? todoAsociado.background : null;

                        return (
                            <Card 
                                key={"char-" + index} 
                                nombre={item.nombre} 
                                id={item.id} 
                                type="people"
                                setModal={setInfoModal}
                                colorBackground={colorActual}
                                dispatch={dispatch}
                                store={storeOptimizado} // 👈 Pasamos el store optimizado con todos los IDs
                            />
                        );
                    })}
                </div>
            </div>

            <div className="container mt-5">
                <h1 className="mb-5">Planets</h1>
                <div className="d-flex flex-row overflow-scroll pb-3 shadow-sm" style={{ scrollbarWidth: "thin" }}>
                    {Characters.map((item, index) => {
                        const todoAsociado = storeOptimizado.todos.find(t => t.id === item.id);
                        const colorActual = todoAsociado ? todoAsociado.background : null;

                        return (
                            <Planeta 
                                key={"planet-" + index} 
                                planet={item.planet} 
                                id={item.id} 
                                type="planets"
                                colorBackground={colorActual}
                                dispatch={dispatch}
                                store={storeOptimizado} // 👈 Pasamos el store optimizado con todos los IDs
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};