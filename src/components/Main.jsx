import './Main.css';
import React, { useState } from "react";

function Main() {

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
    <>
      <main className="main">
        <div className="wrapper">
          <div className="amount">
            <label
              className='amount__label'
              htmlFor="amount"
            >
              Quantidade de números:
            </label>
            <select
              name="amount"
              id="amount"
              className='amount__input'
              onChange={(e) => {
                setAmount(+e.target.value)
                setNumbersList(generateList(+e.target.value))
              }}
            >
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </select>
          </div>
          <div className="numbers">
            <h2 className="numbers__title">Seus números da sorte são:</h2>

            <ul className='numbers__list'>
              {numbersList}
            </ul>
          </div>

          <div className="button">
            <button className="btn btn-primary" onClick={_ => setNumbersList(generateList(amount))}>Gerar novos números</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
