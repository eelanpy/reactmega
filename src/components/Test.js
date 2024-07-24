import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function Test() {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const dateCondition = "2024-04-07";
  if (formatDate(range[0]["startDate"]) >= dateCondition) {
    console.log(formatDate(range[0]["startDate"]));
  }
  console.log();
  return (
    <DateRange
      editableDateInputs={true}
      onChange={(item) => setRange([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={range}
    />
  );
}

export default Test;
