import './App.css';
import React, { useState } from "react";

function App() {
  function gerarNumerosUnicos(min, max, array) {
    const aleatorio = parseInt(Math.random() * (max + 1 - min)) + min

    return array.includes(aleatorio) ?
      gerarNumerosUnicos(min, max, array) :
      aleatorio
  }

  function gerarNumerosMega(qtd) {
    const numeros = Array(qtd)
      .fill(0)
      .reduce((nums) => {
        const novoNumero = gerarNumerosUnicos(1, 60, nums)
        return [...nums, novoNumero]
      }, [])
      .sort((a, b) => a - b)

    return numeros
  }

  function gerarLista(qtd) {
    const numeros = gerarNumerosMega(qtd || qtdNumeros)
    const lista = numeros.map(numero => {
      return (
        <li key={numero} className="lista__item">{numero}</li>
      )
    })

    return lista;
  }

  const  [qtdNumeros, setQtdNumeros] = useState(6)
  const  [listaNumeros, setListaNumeros] = useState(gerarLista)

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">Números Mega-sena</h1>
      </header>

      <main>
        <p className="ta-c">Quantidade de números:</p>
        <div className="ta-c">
          <label htmlFor="qtdNumeros">
            <input
              className='input mb'
              id="qtdNumeros"
              min="6"
              max="15"
              type="number"
              value={qtdNumeros}
              onChange={(e) => {
                setQtdNumeros(+e.target.value)
                setListaNumeros(gerarLista(+e.target.value))
              }}
            />
          </label>
        </div>
        <ul className='lista'>
          {listaNumeros}
        </ul>

        <div className="ta-c mt">
          <button className="btn btn-success" onClick={_ => setListaNumeros(gerarLista(qtdNumeros))}>Gerar novos números</button>
        </div>
      </main>
    </div>
  );
}

export default App;
