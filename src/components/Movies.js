import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
// import Image from 'react-bootstrap/Image';
// import { useEffect, useState } from 'react';
import { useState } from "react";
// import Card from 'react-bootstrap/Card'
import React from "react";
import { Spinner } from "react-bootstrap";

// function removeMatchedDuplicates(list) {
//     const mySet1 = new Set();
//     const dict = {};
//     for(let i = 0; i < list.length; i++) {
//         if(dict[list[i][0]] === undefined)  {
//             dict[list[i][0]] = [list[i][1],list[i][2],list[i][3],list[i][4],1]
//         } else {
//             dict[list[i][0]][4] += 1
//         }
//     }

//     mySet1.add([]);

//     list = []
//     for (let i of Object.keys(dict))  {
//         list.push([i,dict[i][0],dict[i][1],dict[i][2]])
//     }

//     // getMovieData(list[0][0], list[0][1])
//     const list2 = [];
//     // useEffect(() => {
//     //     async function getMovieData(link,name) {
//     //         var url = 'https://c5r5fokuj3.execute-api.us-east-2.amazonaws.com/movies?url=' + link + '&name=' + name;
//     //         const response = await fetch(
//     //             url
//     //         );
//     //         const data = await response.json();
//     //         return [Object.values(data)];
//     //     }
//     //     async function pushdata() {
//     //         for(let i = 0; i < list.length; i++) {

//     //             list2.push(await getMovieData(list[i][0], list[i][1]));

//     //         }
//     //     }
//     //     pushdata()
//         return list

// })

// }

function Render(props) {
  // var matched1 =[];
  // const [matched,setMatched] = useState([])
  // // useEffect(() => {
  // //     async function hello() {
  // //         setMatched(removeMatchedDuplicates(props.matched))
  // //     }
  // //     hello()

  // // })

  // 1) word[1]: Link
  // 2) word[2]: Budget
  // 3) word[0]: Name
  // 3) word[3]: Box Office

  // <button key={idx}><br/>{word[1]}</button>
  // <button>{word[2]}</button>
  // <button>{word[0]}</button>
  // <button>{word[3]}</button>
  return (
    <>
      <div className="row justify-content-md-center">
        <div className="col-sm-4">
          {/* {matched} */}
          {props.matched.map((word) => (
            <>
              <div
                className={
                  word[1] === ""
                    ? "card text-bg-danger mb-2"
                    : "card border-primary mb-2 text-center"
                }
              >
                <div
                  className="card-body text-center"
                  style={{
                    textAlign: word[1] === "" ? "center" : "",
                  }}
                >
                  <strong className="card-title" style={{ fontSize: "2rem" }}>
                    {word[1] === "" ? "Movie Not Found!" : word[0] + ":"}
                  </strong>

                  {word[1] === "" ? (
                    ""
                  ) : (
                    <>
                      <p
                        className="card-text"
                        style={{
                          padding: 0,
                          margin: 0,
                          fontSize: word[0] === "Not Found!" ? 0 : "1.5rem",
                          visibility:
                            word[0] === "Not Found!" ? "hidden" : "visible",
                        }}
                      >
                        Budget: {word[2]}
                      </p>
                      <p
                        className="card-text"
                        style={{
                          padding: 0,
                          margin: 0,
                          fontSize: word[0] === "Not Found!" ? 0 : "1.5rem",
                          visibility:
                            word[0] === "Not Found!" ? "hidden" : "visible",
                        }}
                      >
                        Box-Office: {word[3]}
                      </p>

                      <a
                        href={word[1]}
                        className="btn btn-primary"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          visibility:
                            word[0] === "Not Found!" ? "hidden" : "visible",
                        }}
                      >
                        More Details
                      </a>
                    </>
                  )}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );

  //
}

function Movies() {
  document.title = "Box Office & Budget Finder";

  const [movie, setMovie] = useState("");
  // const [matched,setMatched] = useState([])
  function change(e) {
    setMovie(e.target.value.toLowerCase());

    // inputWords = movieName.toLowerCase().replace(/"/g, "").replace(/'/g, "").replace(/\(|_\)/g, "").replace('-', "").replace(')', "").replace(" ", "").replace(" ", "").replace("(", "");
  }
  const [fndMovies, setFndMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  function submit(e) {
    setIsLoading(true);
    e.preventDefault();

    async function fetchData() {
      var matched = [];

      var url2 =
        "https://c5r5fokuj3.execute-api.us-east-2.amazonaws.com/movies?url=test" +
        "&name=" +
        movie;
      const response2 = await fetch(url2);
      const data2 = await response2.json();
      // return [Object.values(data)];

      if (data2.length < 1 || Object.keys(data2).includes("message")) {
        matched = [["Not Found!", "", "", ""]];
        setIsLoading(false);
        return matched;
      } else {
        for (let i = 0; i < data2.length; i++) {
          matched.push([
            data2[i]["movie_name"],
            data2[i]["wiki_link"],
            data2[i]["budget"],
            data2[i]["box-office"],
          ]);
        }
        matched = new Set(matched);

        matched = Array.from(matched);
        setIsLoading(false);

        return matched;
      }
    }
    (async () => {
      setFndMovies(await fetchData());
    })();
  }

  return (
    <>
      <div className="container justify-md-content-center">
        <h1
          className="mt-4"
          style={({ textDecorationLine: "underline" }, { fontWeight: "bold" })}
        >
          Box Office and Budget Finder:
        </h1>
        <h2 className="mt-1">
          This tool is to show you the movie's budget and box office you type in
          the input below after pressing Return/Enter:
        </h2>

        <Row className="justify-content-md-center mb-2">
          <Col xs lg="6">
            <form onSubmit={submit} className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Please type a movie:"
                value={movie}
                onChange={(e) => change(e)}
                autoFocus
                style={{ textAlign: "left" }}
              />
              {/* <div className="input-group-append"> */}
              <button
                className="btn btn-outline-secondary"
                style={{ borderTopRadius: ".25rem" }}
                type="submit"
                disabled={movie === "" ? true : false}
              >
                Submit
              </button>
              {/* </div> */}
            </form>
          </Col>

          <br />

          <Spinner
            animation="border"
            variant="primary"
            style={{ visibility: isLoading === true ? "visible" : "hidden" }}
          />
        </Row>

        <Render matched={fndMovies} isLoading={isLoading}></Render>

        {/* {matched}
        {matched.map((word,key)=> (
            <button>{word[1]}</button>
        ))} */}
      </div>
    </>
  );
}

export default Movies;
