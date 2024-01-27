
// var raw = `{
//     "operation": "read",
//     "payload": {
//       "Key": {
//         "id": "eelanTestNewApi-2024-01-20T16:04:00.000Z"
//       }
//     }
//   }`;  
// var requestOptions = {
//     method: "POST",
//     body: raw,

//     redirect: "follow",
//     mode: "no-cors",
//   };

//   fetch(
//     "https://bc85o4egqi.execute-api.us-east-2.amazonaws.com/test/DynamoDBManager",
//     requestOptions
//   )
//   .then((response) => {
//     return response.json();
//   })
    
    
  function checkUserHosting() {
    return fetch("https://bc85o4egqi.execute-api.us-east-2.amazonaws.com/test/DynamoDBManager", requestOptions)
        .then((response) => { 
            return response.json().then((data) => {
                console.log(data);
                return data;
            }).catch((err) => {
                console.log(err);
            }) 
        });
}
console.log(checkUserHosting());



    // console.log([
    //     {
    //       "statusCode": 200,
    //       "headers": {
    //         "Access-Control-Allow-Headers": "Content-Type",
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    //       },
    //       "body": "{\"Item\": {\"dt\": \"2024-01-19T22:00:00.000Z\", \"student\": \"eelanTest\", \"exam_year\": \"2015\", \"answers\": {\"22\": \"IC\", \"23\": \"IC\", \"24\": \"IC\", \"25\": \"IC\", \"26\": \"IC\", \"27\": \"IC\", \"28\": \"IC\", \"29\": \"IC\", \"30\": \"IC\", \"10\": \"IC\", \"11\": \"IC\", \"12\": \"IC\", \"13\": \"IC\", \"14\": \"IC\", \"15\": \"IC\", \"16\": \"IC\", \"17\": \"IC\", \"18\": \"IC\", \"19\": \"IC\", \"1\": \"IC\", \"2\": \"C\", \"3\": \"IC\", \"4\": \"IC\", \"5\": \"IC\", \"6\": \"IC\", \"7\": \"IC\", \"8\": \"IC\", \"9\": \"IC\", \"20\": \"IC\", \"21\": \"IC\"}, \"exam_name\": \"thales_contest\", \"id\": \"eelanTest-2024-01-19T22:00:00.000Z\", \"mark\": \"3\"}, \"ResponseMetadata\": {\"RequestId\": \"FMV4K883LDA2IS8H1BBLDF9VIVVV4KQNSO5AEMVJF66Q9ASUAAJG\", \"HTTPStatusCode\": 200, \"HTTPHeaders\": {\"server\": \"Server\", \"date\": \"Sat, 20 Jan 2024 16:13:47 GMT\", \"content-type\": \"application/x-amz-json-1.0\", \"content-length\": \"689\", \"connection\": \"keep-alive\", \"x-amzn-requestid\": \"FMV4K883LDA2IS8H1BBLDF9VIVVV4KQNSO5AEMVJF66Q9ASUAAJG\", \"x-amz-crc32\": \"770003337\"}, \"RetryAttempts\": 0}}"
    //     },
    //     {
    //       "Item": {
    //         "dt": "2024-01-19T22:00:00.000Z",
    //         "student": "eelanTest",
    //         "exam_year": "2015",
    //         "answers": {
    //           "1": "IC",
    //           "2": "C",
    //           "3": "IC",
    //           "4": "IC",
    //           "5": "IC",
    //           "6": "IC",
    //           "7": "IC",
    //           "8": "IC",
    //           "9": "IC",
    //           "10": "IC",
    //           "11": "IC",
    //           "12": "IC",
    //           "13": "IC",
    //           "14": "IC",
    //           "15": "IC",
    //           "16": "IC",
    //           "17": "IC",
    //           "18": "IC",
    //           "19": "IC",
    //           "20": "IC",
    //           "21": "IC",
    //           "22": "IC",
    //           "23": "IC",
    //           "24": "IC",
    //           "25": "IC",
    //           "26": "IC",
    //           "27": "IC",
    //           "28": "IC",
    //           "29": "IC",
    //           "30": "IC"
    //         },
    //         "exam_name": "thales_contest",
    //         "id": "eelanTest-2024-01-19T22:00:00.000Z",
    //         "mark": "3"
    //       },
    //       "ResponseMetadata": {
    //         "RequestId": "FMV4K883LDA2IS8H1BBLDF9VIVVV4KQNSO5AEMVJF66Q9ASUAAJG",
    //         "HTTPStatusCode": 200,
    //         "HTTPHeaders": {
    //           "server": "Server",
    //           "date": "Sat, 20 Jan 2024 16:13:47 GMT",
    //           "content-type": "application/x-amz-json-1.0",
    //           "content-length": "689",
    //           "connection": "keep-alive",
    //           "x-amzn-requestid": "FMV4K883LDA2IS8H1BBLDF9VIVVV4KQNSO5AEMVJF66Q9ASUAAJG",
    //           "x-amz-crc32": "770003337"
    //         },
    //         "RetryAttempts": 0
    //       }
    //     }
    //   ][1]['Item']['dt'])
    // ;