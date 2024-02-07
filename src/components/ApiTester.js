import { useState } from 'react'
function ApiTester () {
  const [apiLink, setApiLink] = useState('')
  const [apiQuery, setApiQuery] = useState('')
  const [apiData, setApiData] = useState([])

  function runApi (e) {
    async function fetchData () {
      var matched = []

      var url2 = apiLink + apiQuery

      const response2 = await fetch(url2)
      console.log(response2)
      const data2 = await response2.json()
      return data2
    }
    ;(async () => {
      setApiData(await fetchData())
    })()
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={runApi}>
        <input
          value={apiLink}
          onChange={e => setApiLink(e.target.value)}
          placeholder='api link:'
        />
      </form>
      <form onSubmit={runApi}>
        <input
          value={apiQuery}
          onChange={e => setApiQuery(e.target.value)}
          placeholder='value'
        />
      </form>
      <h1>{JSON.stringify(apiData.body)}</h1>
    </div>
  )
}

export default ApiTester
