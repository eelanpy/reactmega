import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner'

import { useEffect, useState } from 'react';

import React from 'react';

import './App.css';
import './Options.css'
import 'bootstrap/dist/css/bootstrap.min.css'



function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
    console.log(props.products);
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  try {
  return (
    <table>
      {/* <caption>Products</caption> */}
      <thead>
        <tr>
            {
                Object.keys(items[0]).map((key) => (
                    <th>
            <button
              type="button"
              onClick={() => requestSort(key)}
              className={getClassNamesFor(key)}
            >
              {key.toUpperCase()}
            </button>
          </th>
                ))
            }
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
        {items.map((item,idx) => (
          <tr>
            <td>{item.stock.toUpperCase()}</td>
            <td>{item.type.toUpperCase()}</td>
            <td>{item.stock_price}</td>
            <td>{item.expiry}</td>
            <td>{item.strike}</td>
            <td>{item.ask}</td>
            <td>{item.units}</td>
            <td>{Math.round(item.invested)}</td>
            <td className={item["profit_0.01"] < 0 ? 'bg-danger text-white' : 'bg-success text-white'}>{numberWithCommas(Math.round(item["profit_0"]))}</td>
            <td className={item["profit_0.01"] < 0 ? 'bg-danger text-white' : 'bg-success text-white'}>{numberWithCommas(Math.round(item["profit_0.01"]))}</td>
            <td className={item["profit_0.02"] < 0 ? 'bg-danger text-white' : 'bg-success text-white'}>{numberWithCommas(Math.round(item["profit_0.02"]))}</td>
            <td className={item["profit_0.03"] < 0 ? 'bg-danger text-white' : 'bg-success text-white'}>{numberWithCommas(Math.round(item["profit_0.03"]))}</td>
            <td className={item["profit_0.04"] < 0 ? 'bg-danger text-white' : 'bg-success text-white'}>{numberWithCommas(Math.round(item["profit_0.04"]))}</td>
            <td className={item["profit_0.05"] < 0 ? 'bg-danger text-white' : 'bg-success text-white'}>{numberWithCommas(Math.round(item["profit_0.05"]))}</td>
            <td className={item["profit_0.06"] < 0 ? 'bg-danger text-white' : 'bg-success text-white'}>{numberWithCommas(Math.round(item["profit_0.06"]))}</td>
            <td className={item["profit_0.1"] < 0 ? 'bg-danger text-white' : 'bg-success text-white'}>{numberWithCommas(Math.round(item["profit_0.1"]))}</td>
            <td className={item["profit_0.15"] < 0 ? 'bg-danger text-white' : 'bg-success text-white'}>{numberWithCommas(Math.round(item["profit_0.15"]))}</td>
            <td className={item["profit_0.2"] < 0 ? 'bg-danger text-white' : 'bg-success text-white'}>{numberWithCommas(Math.round(item["profit_0.2"]))}</td>
            <td className={item["profit_0.25"] < 0 ? 'bg-danger text-white' : 'bg-success text-white'}>{numberWithCommas(Math.round(item["profit_0.25"]))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
        } catch {
            console.log("couldn'tfind");
        };
};

function App(props) {
  console.log(props);  
  return (
    <div className="App">
      <ProductTable
        products={props.data}
      />
    </div>
  );
}

// { id: 1, name: 'Cheese', price: 4.9, stock: 20 },
//           { id: 2, name: 'Milk', price: 1.9, stock: 32 },
//           { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 },
//           { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 },
//           { id: 5, name: 'Butter', price: 0.9, stock: 99 },
//           { id: 6, name: 'Sour Cream ', price: 2.9, stock: 86 },
//           { id: 7, name: 'Fancy French Cheese 🇫🇷', price: 99, stock: 12 },

function Options() {
    const [stock,setStock] = useState('aapl')
    const [optionType, setOptionType] = useState('put')
    const [monthsToExpire, setMonthsToExpire] = useState(2)
    const [investAmt, setInvestAmt] = useState(1000)
    
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false) 
    


    function submit(e) {
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
        async function fetchData() {

        
        var url = `https://pfs2dz5045.execute-api.us-east-2.amazonaws.com/ktest/koptions?stock=${stock}&option_type=${optionType}&months_to_expire=${monthsToExpire}&to_invest=${investAmt}`;
        console.log(url);
        const response2 = await fetch(
            url
        );
        const data2 = await response2.json();
        return data2;
    }
    (async () => {
        console.log(await fetchData());
        setData(await fetchData())
        // console.log(data)
        setIsLoading(false)
     })()
     
     
    }
    
    // submit();

    document.title = "Stock Options Quotes by Second"

    return (
        <>
               <h1
        className='mt-4'
        style={({ textDecorationLine: 'underline' }, { fontWeight: 'bold' })}
        onTouchMoveCapture={submit}
      >
        Stock Options Quotes by Second
      </h1>
      <form onSubmit={submit}>
        <button type="submit">Submit!</button>
        <Spinner animation="border" variant="primary" style={{visibility: (isLoading == true) ? 'visible' : 'hidden'}}/>
      </form>
      
      <App data={data}/>
      </>
    )
}

export default Options;