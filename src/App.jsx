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
    const numeros = gerarNumerosMega(qtd || amount)
    const lista = numeros.map(numero => {
      return (
        <li key={numero} className="lista__item">{numero}</li>
      )
    })

    return lista;
  }

  const  [amount, setAmount] = useState(6)
  const  [listaNumeros, setListaNumeros] = useState(gerarLista)

  return (
    <div className="App">
      <header className="header">
        <div className="wrapper">
          <h1 className="header__title">Números Mega-Sena</h1>
        </div>
      </header>

      <main className="main">
        <div className="wrapper">
          <div className="amount">
            <label
              className='amount__label'
              htmlFor="amount"
            >
              Quantidade de números:
            </label>
            <input
              className='amount__input'
              id="amount"
              min="6"
              max="20"
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(+e.target.value)
                setListaNumeros(gerarLista(+e.target.value))
              }}
            />
          </div>
          <div>
            <p>Seus números</p>
            <ul className='lista'>
              {listaNumeros}
            </ul>
          </div>

          <div className="ta-c mt">
            <button className="btn btn-success" onClick={_ => setListaNumeros(gerarLista(amount))}>Gerar novos números</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
