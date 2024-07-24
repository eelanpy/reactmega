import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { FormControl } from "react-bootstrap";
// import 'react-json-pretty/themes/adventure_time.css'

import JSONPretty from "react-json-pretty";
var JSONPrettyMon = require("react-json-pretty/dist/monikai");

function ApiTester() {
  const [apiLink, setApiLink] = useState("");
  const [apiQuery, setApiQuery] = useState("");
  const [apiData, setApiData] = useState([]);

  function runApi(e) {
    async function fetchData() {
      var matched = [];

      var url2 = apiLink + apiQuery;

      try {
        const response2 = await fetch(url2);
        console.log(response2);
        const data2 = await response2.json();
        return data2;
      } catch {
        return [];
      }
    }
    (async () => {
      setApiData(await fetchData());
    })();
    e.preventDefault();
  }

  return (
    <div className="mt-2">
      <form onSubmit={runApi}>
        <FormControl
          value={apiLink}
          onChange={(e) => setApiLink(e.target.value)}
          placeholder="api link:"
          className="w-75 m-0 m-auto mt-2"
        />
      </form>
      <form onSubmit={runApi}>
        <FormControl
          value={apiQuery}
          onChange={(e) => setApiQuery(e.target.value)}
          placeholder="value"
          className="w-75 m-0 m-auto mt-2"
        />
      </form>
      <JSONPretty
        data={JSON.stringify(apiData)}
        theme={JSONPrettyMon}
        themeClassName="custom-json-pretty"
      ></JSONPretty>

      {/* <pre className='api-tester m-5'>{JSON.stringify(apiData, null, 2)}</pre> */}
    </div>
  );
}

export default ApiTester;
