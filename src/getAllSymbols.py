import json


json_data = []
with open('/Users/eelank/Documents/react/reactmega/src/stock_list.json') as f:
  data = json.load(f)["data"]["table"]
  json_data = [i["symbol"].replace("^", "") for i in data["rows"]]
with open('/Users/eelank/Documents/react/reactmega/src/stock_list.json', 'w') as f:
    json.dump(json_data, f, indent=2)
