import './Info.css';
import { useEffect, useState } from "react";
import { useFetch } from "../api/useFetch";

function Info() {
  const [numbersList, setNumbersList] = useState([]);
  const {data, erro, loading} = useFetch();

  const txtAccumulated = <strong className="info__prize-value--txt3">(Acumulado)</strong>

  function generateList(numbers) {
    const list = numbers.map(number => {
    return (
      <li key={number} className="numbers__item">{String(number).padStart(2, "0")}</li>
      )
    });
    setNumbersList(list);
  }

  useEffect(function(){
    if (data?.acumulado) {
      generateList(data.listaDezenas);
    }
  },[data]);

  if (!erro && !loading && data?.acumulado) {
    const currencyFormat = data.valorEstimadoProximoConcurso.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    return (
      <section className="info">
        <p className="info__prize-value">
          <span className="info__prize-value--txt1 info__text">Estimativa do prêmio:</span>
          <span className="numbers__title info__prize-value--txt2">{ currencyFormat }</span>
          {data.acumulado ? txtAccumulated : null}
        </p>
        <p className="info__next-date info__text">Data próximo sorteio: <strong>{ data.dataProximoConcurso }</strong></p>
        <div className="info__last-numbers">
          <p className="info__last-numbers__title info__text">Números do último sorteio:</p>
          <ul className='numbers__list numbers__list--last'>
            {numbersList}
          </ul>
        </div>
      </section>
    )
  }
}

export default Info;