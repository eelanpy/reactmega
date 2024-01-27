curl --location --request POST https://bc85o4egqi.execute-api.us-east-2.amazonaws.com/test/DynamoDBManager --data-raw '{
  "operation": "read",
  "payload": {
    "student": "hello"
  }
}
'
   