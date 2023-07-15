import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image';
import { useEffect, useState } from 'react';

function Movies () {
    
    const [movie, setMovie] = useState('')
    // const [matched,setMatched] = useState([])
    function change(e) {
        
        setMovie(e.target.value.toLowerCase());

        // inputWords = movieName.toLowerCase().replace(/"/g, "").replace(/'/g, "").replace(/\(|_\)/g, "").replace('-', "").replace(')', "").replace(" ", "").replace(" ", "").replace("(", "");


        // console.log(movie);

    }
    const [fndMovies,setFndMovies] = useState([])
    function submit(e) {
        e.preventDefault();
        
        
        const url = 'https://eelanpy1.s3.us-east-2.amazonaws.com/movies.json'
        
        
        // console.log(inputWords);
        async function fetchData() {
            var matched = []
            const response = await fetch(
                url
            );
            const data = await response.json();
            
            // console.log(matched);
            for (let i of Object.keys(data)) {

                for (let j in data[i]) {
                    var movieName = j.toLowerCase().replace(/"/g, "").replace(/'/g, "").replace(/\(|_\)/g, "").replace('-', "").replace(')', "").replace("(", "");

                    movieName = movieName.replace(" ", "").replace(" ", "")
                    
          
        
                    // console.log("Input: ")
                    
                    // console.log("Movie: ")
                    // console.log(movieName);
                    if (movieName.includes(movie.toLowerCase().replace(/"/g, "").replace(/'/g, "").replace(/\(|_\)/g, "").replace('-', "").replace(')', "").replace(" ", "").replace(" ", "").replace("(", "")) == true && matched.includes([data[i][j],j]) == false){
                    
                        
                        console.log(j);
                        var url2 = 'https://c5r5fokuj3.execute-api.us-east-2.amazonaws.com/movies?url=' +  data[i][j]+ '&name=' + j;
                        const response2 = await fetch(
                            url2
                        );
                        const data2 = await response2.json();
                        // return [Object.values(data)];
                        console.log(data2["budget"]);
                        matched.push([j,data[i][j],data2["budget"],data2["box-office"]]);
                        console.log(matched);
                        
                      }


                }
                
              }
              matched = new Set(matched)

            matched = Array.from(matched)
            console.log(matched);
            
              return matched
            }
        (async () => {
                setFndMovies(await fetchData())
                
                
             })()
        console.log(fndMovies);



        

        // console.log(matched);
        // setMatched(Array.from(matched))
        
        
        
    }


    
    

    return (
        <>
        <h1
        className='mt-4'
        style={({ textDecorationLine: 'underline' }, { fontWeight: 'bold' })}
      >
        Box Office and Budget Finder:
      </h1>
      <h2 className='mt-1'>
          This tool is to show you the weather you type in the input below:
        </h2>

        <Row className='justify-content-md-center mb-2'>
            <Col xs lg='3'>
                <form onSubmit={submit}>
                    <Form.Control
                    type='text'
                    className={`mb-4`}      
                    placeholder='Please type a movie:'
                    
                    value={movie}
                    onChange={(e) => change(e)}
                    autoFocus
                    />
                </form>
            </Col>
        </Row>
        <Card matched={fndMovies}/>
        {/* {matched}
        {matched.map((word,key)=> (
            <button>{word[1]}</button>
        ))} */}
        </>
        )
}

function removeMatchedDuplicates(list) {
    const mySet1 = new Set();
    const dict = {};
    for(let i = 0; i < list.length; i++) {
        if(dict[list[i][0]] == undefined)  {
            dict[list[i][0]] = [list[i][1],list[i][2],list[i][3],list[i][4],1]
        } else {
            dict[list[i][0]][4] += 1
        }
    }

    console.log(dict)
    mySet1.add([]);
    console.log(mySet1);
    list = []
    for (let i of Object.keys(dict))  {
        list.push([i,dict[i][0],dict[i][2],dict[i][3],dict[i][4]])
    }


    // getMovieData(list[0][0], list[0][1])
    const list2 = [];
    // useEffect(() => {
    //     async function getMovieData(link,name) {
    //         var url = 'https://c5r5fokuj3.execute-api.us-east-2.amazonaws.com/movies?url=' + link + '&name=' + name;
    //         const response = await fetch(
    //             url
    //         );
    //         const data = await response.json();
    //         return [Object.values(data)];
    //     }
    //     async function pushdata() {
    //         for(let i = 0; i < list.length; i++) {
        
    //             list2.push(await getMovieData(list[i][0], list[i][1]));
    //              console.log(list2);   
                
            
    //         }
    //     }
    //     pushdata()
        return list

    // })

    
    
    
        
    



    console.log(list2);

    return list2;
}

function Card(props) {
    
    console.log(props);
    var matched1 =[];
    const [matched,setMatched] = useState([])
    // useEffect(() => {
    //     async function hello() {
    //         setMatched(removeMatchedDuplicates(props.matched))
    //     }  
    //     hello()
    //     console.log(matched);
    // })
    console.log(removeMatchedDuplicates(props.matched)[0]);
  
    

        
        

    
     
     return (
        <>
            
            {/* {matched} */}
            {removeMatchedDuplicates(props.matched).map((word,idx) => (
                <>
                <button key={idx}><br/>{word[1]}</button>
                <button>{word[2]}</button>
                <button>{word[0]}</button>
                </>
            ))}
        </>
    )
     
     console.log(matched1);
    
    
    // 
}

export default Movies;