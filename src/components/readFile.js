var raw = JSON.stringify({
  
    "operation": "read",
    "payload": {
      "student": "vaananTest"
    }
 
  
});

var requestOptions = {
  method: "POST",
  body: raw,
  redirect: "follow",
};

fetch(
  "https://bc85o4egqi.execute-api.us-east-2.amazonaws.com/test/DynamoDBManager",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
