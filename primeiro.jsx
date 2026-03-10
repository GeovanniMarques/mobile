// 3 conceitos principais

// 1. Componentes -> basicamente, são funções com render
// 2. useState -> para criar ideia de variáveis
// 3. props -> passagem de parâmetros

import React, { useState } from "react";

// Arrow function, como no JavaScript
const HelloWorld = () => {
    return (
        <h1>Hello World React</h1>
    )
}

// Uso antigo para essa parte de "comida" seria props, um JSON fechado
const Contador = ({ comida }) => {
    const [count, setCount] = useState(0)

    function aumentar() {
        setCount(count + 1)
    }

    function diminuir() {
        if (count > 0) {
            setCount(count - 1)
        } else {
            setCount(0)
        }

    }

    return (
        <div>
            <h2>{comida}</h2>
            <h3>Contador: {count}</h3>
            <button onClick={aumentar}>+1</button>
            <button onClick={diminuir}>-1</button>
        </div>
    )
}

// Uso antigo para essa parte de "comida" seria props.alguma_coisa
// Também poderia setar um início específico para a variável, como abaixo:

// <Contador comida="Fricassê" inicio={0}

// Sendo que na variavel "const [count, setCount] = useState(0)" deve ser instanciado como:

// const [count, setCount] = useState(props.inicio)
export default function App() {
    return (
        <>
            <Contador comida="Lasanha" />
            <Contador comida="Empadão" />
            <Contador comida="Strogonoff" />
        </>
    )
}