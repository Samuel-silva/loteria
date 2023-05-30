import './History.css';
import { useEffect, useState } from "react";

function History(params) {
  const { numbers } = params;

  const [list, setList] = useState();

  const title = <p className="history__title">Seus últimos 7 números:</p>;

  function generateList() {
    const listLocale = numbers.map((item, index) => {
      return (
        <ul key={index} className="numbers__list numbers__list--history">{item}</ul>
      )
    })
    setList(listLocale.reverse());
  };

  useEffect(function() {
    if (numbers.length > 0) {
      generateList();
    }
    // eslint-disable-next-line
  }, [numbers]);

  return (
    <>
      <div className="history">
        { numbers.length > 0 ? title : null }
        { list }
      </div>
    </>
  )
}

export default History;