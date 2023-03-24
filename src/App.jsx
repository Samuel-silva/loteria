import './App.css';
import React, { useState } from "react";

function App() {

  function generateUniqueNumbers(min, max, array) {
    const random = parseInt(Math.random() * (max + 1 - min)) + min

    return array.includes(random) ?
      generateUniqueNumbers(min, max, array) :
      random
  }

  function generateNumbersMega(amount) {
    const numbers = Array(amount)
      .fill(0)
      .reduce((nums) => {
        const newNumbers = generateUniqueNumbers(1, 60, nums)
        return [...nums, newNumbers]
      }, [])
      .sort((a, b) => a - b)

    return numbers
  }

  function generateList(amountLocale) {
    const numbers = generateNumbersMega(amountLocale || amount)
    const list = numbers.map(number => {
      return (
        <li key={number} className="numbers__item">{number}</li>
      )
    })

    return list;
  }

  const  [amount, setAmount] = useState(6)
  const  [numbersList, setNumbersList] = useState(generateList)

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
                setNumbersList(generateList(+e.target.value))
              }}
            />
          </div>
          <div className="numbers">
            <h2 className="numbers__title">Seus números da sorte</h2>

            <ul className='numbers__list'>
              {numbersList}
            </ul>
          </div>

          <div className="button">
            <button className="btn btn-primary" onClick={_ => setNumbersList(generateList(amount))}>Gerar novos números</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
