import History from './History';
import Info from './Info';
import './Main.css';
import React, { useState } from "react";

function Main() {
  const [amount, setAmount] = useState(6);
  const [history, setHistory] = useState([]);
  const [tens, setTens] = useState([[], [], [], [], [], [], []])
  const [currentNumber, setCurrentNumber] = useState([]);
  const [numbersList, setNumbersList] = useState(generateList);

  function generateUniqueNumbers(min, max, array) {
    const random = parseInt(Math.random() * (max + 1 - min)) + min

    const uniqueNumber = array.includes(random);
    const exceededConsecutive = amount === 6 ? exceedsMaxConsecutive(array, random) : false;
    const exceededTens = amount < 9 ? exceedsMaxTens(random) : false;

    return uniqueNumber || exceededConsecutive || exceededTens ?
      generateUniqueNumbers(min, max, array) :
      random;
  }

  function exceedsMaxTens(num, maxTens = 3) {
    const ten = Math.floor(num / 10);
    return tens[ten].length >= maxTens;
  }

  function pushTens(num, clear = false) {
    const ten = Math.floor(num / 10);
    const localtens = clear ? [[], [], [], [], [], [], []] : tens;

    if (!clear) {
      localtens[ten].push(num);
    }
    setTens(localtens);
  }

  function exceedsMaxConsecutive(arr, num, maxConsecutive = 2) {
    const n = arr.length;
    if (n <= maxConsecutive) return false;
    let count = 0;

    for (let i = 1; i <= maxConsecutive; i++) {
      if (arr.includes(num - i)) count++;
      if (arr.includes(num + i)) count++;
    }
    return count >= maxConsecutive;
  }

  function generateNumbersMega(amount) {
    const numbers = Array(amount)
      .fill(0)
      .reduce((nums) => {
        const newNumbers = generateUniqueNumbers(1, 60, nums);
        pushTens(newNumbers);
        return [...nums, newNumbers];
      }, [])
      .sort((a, b) => a - b);

    pushTens(0, true);
    console.log(JSON.stringify(numbers.map(num => String(num).padStart(2, "0"))))
    return numbers;
  }

  function generateList(amountLocale) {
    const numbers = generateNumbersMega(amountLocale || amount)
    const list = numbers.map(number => {
      return (
        <li key={number} className="numbers__item">{String(number).padStart(2, "0")}</li>
      )
    })
    setCurrentNumber([list]);

    return list;
  }

  function regenerateNumbers(newAmount = null) {
    if (newAmount) {
      setAmount(newAmount)
    }
    if (history.length > 6) {
      history.shift();
    }
    setHistory([...history, currentNumber]);
    setNumbersList(generateList(newAmount || amount));
  }

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
              onChange={(e) => regenerateNumbers(+e.target.value)}
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
            <button className="btn btn-primary" onClick={_ => regenerateNumbers()}>Gerar novos números</button>
          </div>
          <History numbers={history} />
          <Info />
        </div>
      </main>
    </>
  );
}

export default Main;
