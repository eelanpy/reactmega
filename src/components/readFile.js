var raw = JSON.stringify({
  "operation": "create",
  "payload": {
    "Item": {

      "id": "eelank-2024-01-11T18:08:30",

      "answers": {
       "1": "C",
       "2": "IC"
      },
      "dt": "2021-02-21T18:08:22",
      "exam_name": "thales_contest",
      "exam_year": 2010,
      "mark": 25,
      "student": "eelank"

    }
  }
});

var requestOptions = {
  method: "POST",
  body: raw,
  redirect: "follow",
};

fetch(
  "https://2mgmf4c18j.execute-api.us-east-2.amazonaws.com/prod/DynamoDBManager",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
