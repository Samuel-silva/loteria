import { useEffect, useState } from "react";

import axios from 'axios';

const baseUrl = "https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena/"

function useFetch() {
  const [data, setData] = useState([]);
  const [erro, setErro] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(baseUrl)
      setData(resp.data);
    } catch {
      setErro(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(function() {
    fetchData();
  }, [])

  return { data, erro, loading }
}

export { useFetch };
