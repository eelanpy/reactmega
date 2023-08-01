import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import Dropdown from 'react-bootstrap/Dropdown'

// function BasicExample() {
//   return (
//     <Dropdown>
//       <Dropdown.Toggle variant="success" id="dropdown-basic">
//         Dropdown Button
//       </Dropdown.Toggle>

//       <Dropdown.Menu>
//         <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//         <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//         <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// }

// export default BasicExample;

import { useEffect, useState } from 'react'

import React from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Options.css'

<<<<<<< HEAD
var stocks = [
  'AAPL',
  'ADBE',
  'AMD',
  'AMZN',
  'AXP',
  'CRM',
  'DLTR',
  'GOOG',
  'INTU',
  'MA',
  'META',
  'MSFT',
  'NFLX',
  'NKE',
  'NVDA',
  'PYPL',
  'QQQ',
  'SHOP',
  'V'
]
=======
var stocks = ['AAPL', 'ADBE', 'AMD', 'AMZN', 'AXP', 'CRM', 'DLTR', 'GOOG', 'INTU', 'MA', 'META', 'MSFT', 'NFLX', 'NKE', 'NVDA', 'PYPL', 'QQQ', 'SHOP', 'V']
>>>>>>> a1a43f719bb5550cdea405098a9d1664b346e08d

function BasicExample (props) {
  const list = props.list === undefined ? stocks : props.list
  //   console.log(props.list[0])
  return (
    <Dropdown className='mt-5' style={{ display: 'inline' }}>
      <Dropdown.Toggle variant='success' id='dropdown-basic'>
        {props.text}:{' '}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {Array.from(list).map(stockName => (
          <Dropdown.Item href='#/action-2'>{stockName}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

function numberWithCommas (x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config)

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items]
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [items, sortConfig])

  const requestSort = key => {
    let direction = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return { items: sortedItems, requestSort, sortConfig }
}

const ProductTable = props => {
  const scrolled = props.scrolled
  console.log(props.products)
  const { items, requestSort, sortConfig } = useSortableData(props.products)
  const getClassNamesFor = name => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === name ? sortConfig.direction : undefined
  }
  try {
    return (
      <table className='mt-2'>
        {/* <caption>Products</caption> */}
        <thead>
          <tr>
            {Object.keys(items[0]).map(key => (
              <th>
                <button
                  type='button'
                  onClick={() => requestSort(key)}
                  className={getClassNamesFor(key)}
                  style={{ backgroundColor: scrolled == true ? 'white' : '' }}
                >
                  {key.toUpperCase().includes('PROFIT_') == true
                    ? 'With_' + parseFloat(key.split('_')[1]) * 100 + '%'
                    : key.toUpperCase()}
                </button>
              </th>
            ))}
            {/* <th>
            <button
              type="button"
              onClick={() => requestSort('stock')}
              className={getClassNamesFor('stock')}
            >
              Stock
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('type')}
              className={getClassNamesFor('type')}
            >
              Type
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('expiry')}
              className={getClassNamesFor('expiry')}
            >
Expiry            </button>
          </th> */}
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr>
              <td>{item.stock.toUpperCase()}</td>
              <td>{item.type.toUpperCase()}</td>
              <td>{item.stock_price}</td>
              <td>{item.expiry}</td>
              <td>{item.strike}</td>
              <td>{item.ask}</td>
              <td>{item.units}</td>
              <td>{Math.round(item.invested)}</td>
              <td
                className={
                  item['profit_0'] < 0
                    ? 'bg-danger-subtle text-black'
                    : 'bg-success-subtle text-black'
                }
              >
                {numberWithCommas(Math.round(item['profit_0']))}
              </td>
              <td
                className={
                  item['profit_0.01'] < 0
                    ? 'bg-danger-subtle text-black'
                    : 'bg-success-subtle text-black'
                }
              >
                {numberWithCommas(Math.round(item['profit_0.01']))}
              </td>
              <td
                className={
                  item['profit_0.02'] < 0
                    ? 'bg-danger-subtle text-black'
                    : 'bg-success-subtle text-black'
                }
              >
                {numberWithCommas(Math.round(item['profit_0.02']))}
              </td>
              <td
                className={
                  item['profit_0.03'] < 0
                    ? 'bg-danger-subtle text-black'
                    : 'bg-success-subtle text-black'
                }
              >
                {numberWithCommas(Math.round(item['profit_0.03']))}
              </td>
              <td
                className={
                  item['profit_0.04'] < 0
                    ? 'bg-danger-subtle text-black'
                    : 'bg-success-subtle text-black'
                }
              >
                {numberWithCommas(Math.round(item['profit_0.04']))}
              </td>
              <td
                className={
                  item['profit_0.05'] < 0
                    ? 'bg-danger-subtle text-black'
                    : 'bg-success-subtle text-black'
                }
              >
                {numberWithCommas(Math.round(item['profit_0.05']))}
              </td>
              <td
                className={
                  item['profit_0.06'] < 0
                    ? 'bg-danger-subtle text-black'
                    : 'bg-success-subtle text-black'
                }
              >
                {numberWithCommas(Math.round(item['profit_0.06']))}
              </td>
              <td
                className={
                  item['profit_0.1'] < 0
                    ? 'bg-danger-subtle text-black'
                    : 'bg-success-subtle text-black'
                }
              >
                {numberWithCommas(Math.round(item['profit_0.1']))}
              </td>
              <td
                className={
                  item['profit_0.15'] < 0
                    ? 'bg-danger-subtle text-black'
                    : 'bg-success-subtle text-black'
                }
              >
                {numberWithCommas(Math.round(item['profit_0.15']))}
              </td>
              <td
                className={
                  item['profit_0.2'] < 0
                    ? 'bg-danger-subtle text-black'
                    : 'bg-success-subtle text-black'
                }
              >
                {numberWithCommas(Math.round(item['profit_0.2']))}
              </td>
              <td
                className={
                  item['profit_0.25'] < 0
                    ? 'bg-danger-subtle text-black'
                    : 'bg-success-subtle text-black'
                }
              >
                {numberWithCommas(Math.round(item['profit_0.25']))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  } catch {
    return (
      <>
        <div
          className='card text-bg-danger m-2'
          style={{
            visibility: props.isSelected == true ? 'visible' : 'hidden'
          }}
        >
          <div
            className='card-body text-center'
            style={{ textAlign: 'center' }}
          >
            <p
              className='card-title font-italic'
              style={{ fontSize: '2rem', fontWeight: 900 }}
            >
              Stock Not Found!!!
            </p>
            <p
              className='font-weight-normal'
              style={{ fontSize: '1.75rem', fontWeight: 500 }}
            >
              Somehow the fields you submitted can't be found in our data.
            </p>
            <p style={{ fontSize: '1.5rem' }} className='font-weight-light'>
              Try another stock
            </p>
          </div>
        </div>
      </>
    )
  }
}

function App (props) {
  console.log(props)

  return (
    <>
      <div className='App'>
        <ProductTable
          scrolled={props.scrolled}
          products={props.data}
          isSelected={props.isSelected}
        />
      </div>
    </>
  )
}

// { id: 1, name: 'Cheese', price: 4.9, stock: 20 },
//           { id: 2, name: 'Milk', price: 1.9, stock: 32 },
//           { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 },
//           { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 },
//           { id: 5, name: 'Butter', price: 0.9, stock: 99 },
//           { id: 6, name: 'Sour Cream ', price: 2.9, stock: 86 },
//           { id: 7, name: 'Fancy French Cheese 🇫🇷', price: 99, stock: 12 },

function Options () {
  const [stock, setStock] = useState('Stock')
  const [optionType, setOptionType] = useState('Type')
  const [monthsToExpire, setMonthsToExpire] = useState('Months of Expiry')
  const [investAmt, setInvestAmt] = useState('To Invest:')
  const [scrolled, setScrolled] = useState(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  function submit (e) {
    setIsLoading(true)
    //     setStock('aapl');
    // setOptionType('call');
    // setMonthsToExpire(2);
    // setInvestAmt(1000);
    // var stock = 'aapl';
    // var optionType = 'call';
    // var monthsToExpire = 2;
    // var investAmt = 1000;
    e.preventDefault()

    async function fetchData () {
      var url = `https://pfs2dz5045.execute-api.us-east-2.amazonaws.com/ktest/koptions?stock=${stock.toLowerCase()}&option_type=${optionType
        .split(' Option')[0]
        .toLowerCase()}&months_to_expire=${parseInt(
        monthsToExpire.split(' Month')[0]
      )}&to_invest=${parseInt(investAmt.split('$')[1])}`
      console.log(url)
      const response2 = await fetch(url)
      const data2 = await response2.json()
      //   setIsLoading(false)
      return data2
    }
    ;(async () => {
      console.log(await fetchData())
      setData(await fetchData())
      // console.log(data)
      console.log(data)
      setIsLoading(false)
      setIsSelected(true)
    })()
  }

  // submit();

  document.title = 'Stock Options'
  window.scroll(function () {
    setScrolled(true)
  })
  return (
    <>
      <div className='container justify-md-content-center'>
        <h1
          className='mt-4'
          style={({ textDecorationLine: 'underline' }, { fontWeight: 'bold' })}
        >
          Stock Options:
        </h1>
        {/* <!-- Example split danger button --> */}
        {/* <BasicExample /> */}
        <div className='d-flex justify-content-center'>
          {/* <Col xs lg='8'> */}
          <form onSubmit={submit}>
            <Dropdown className='m-2' style={{ display: 'inline' }}>
              <Dropdown.Toggle
                variant={stock === 'Stock' ? 'outline-info' : 'info'}
                id='dropdown-basic'
              >
                {stock}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {stocks.map(stockName => (
                  <Dropdown.Item
                    href=''
                    onClick={e => {
                      setStock(e.target.innerText)
                    }}
                  >
                    {stockName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className='m-2' style={{ display: 'inline' }}>
              <Dropdown.Toggle
                variant={
                  optionType === 'Type' ? 'outline-secondary' : 'secondary'
                }
                id='dropdown-basic'
              >
                {optionType}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {['Call Option', 'Put Option', 'Any Option'].map(stockName => (
                  <>
                    <Dropdown.Item
                      href=''
                      className=''
                      onClick={e => {
                        setOptionType(e.target.innerText)
                      }}
                    >
                      {stockName}
                    </Dropdown.Item>
                    {/* <span>"Option Type"</span> */}
                  </>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className='m-2' style={{ display: 'inline' }}>
              <Dropdown.Toggle
                variant={
                  monthsToExpire === 'Months of Expiry'
                    ? 'outline-success'
                    : 'success'
                }
                id='dropdown-basic'
              >
                {monthsToExpire}
              </Dropdown.Toggle>

              <Dropdown.Menu className='m-2'>
                {[
                  '1 Month to Expire',
                  '2 Months to Expire',
                  '3 Months to Expire',
                  '4 Months to Expire',
                  '5 Months to Expire',
                  '6 Months to Expire',
                  '12 Months to Expire'
                ].map(stockName => (
                  <Dropdown.Item
                    href=''
                    onClick={e => {
                      setMonthsToExpire(e.target.innerText)
                    }}
                  >
                    {stockName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className='p-3' style={{ display: 'inline' }}>
              <Dropdown.Toggle
                variant={
                  investAmt === 'To Invest:' ? 'outline-warning' : 'warning'
                }
                id='dropdown-basic'
              >
                {investAmt}
              </Dropdown.Toggle>

              <Dropdown.Menu className='m-2'>
                {[
                  'Invest $500',
                  'Invest $1000',
                  'Invest $2000',
                  'Invest $5000',
                  'Invest $10000'
                ].map(stockName => (
                  <Dropdown.Item
                    href=''
                    onClick={e => {
                      setInvestAmt(e.target.innerText)
                    }}
                  >
                    {stockName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={
                stock == 'Stock' ||
                optionType == 'Type' ||
                monthsToExpire == 'Months of Expiry' ||
                investAmt == 'To Invest:'
                  ? true
                  : false
              }
            >
              Submit!{' '}
            </button>{' '}
            <Spinner
              animation='border'
              variant='primary'
              className='mt-3'
              style={{ visibility: isLoading == true ? 'visible' : 'hidden' }}
            />
          </form>
          {/* </Col> */}
        </div>
      </div>
      <App data={data} isSelected={isSelected} scrolled={scrolled} />
    </>
  )
}

export default Options
