import { useState } from "react";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function DashboardMathematica(props) {
  const [student, setStudent] = useState("");
  const [submissions, setSubmissions] = useState([[], []]);
  const [entered, setEntered] = useState(false);

  function getData(e) {
    if (e.keyCode == 13) {
      if (student !== "") {
        setEntered(true);
      }
      try {
        var raw = JSON.stringify({
          operation: "read",
          payload: {
            student: student.toLowerCase(),
          },
        });

        var requestOptions = {
          method: "POST",

          body: raw,
        };
        async function fetchSubmissions() {
          var url2 =
            "https://bc85o4egqi.execute-api.us-east-2.amazonaws.com/test/DynamoDBManager";
          const response2 = await fetch(url2, requestOptions);
          const data2 = await response2.json();
          // return [Object.values(data)];

          return data2;
        }

        (async () => {
          setSubmissions(await fetchSubmissions());
        })();
      } catch {
        setSubmissions([[], []]);
      }
    }
  }

  //   var raw = JSON.stringify({

  //     "operation": "read",
  //   "payload": {
  //     "student": "vaananTest"
  //   }
  //   });

  //   var requestOptions = {
  //     method: "POST",
  //     body: raw,
  //     headers: {"Access-Control-Allow-Origin":"*"
  // }
  //   };

  //   fetch(
  //     "https://bc85o4egqi.execute-api.us-east-2.amazonaws.com/test/DynamoDBManager",
  //     requestOptions
  //   )
  //   .then(r =>  r.json())
  //   .then(obj => console.log(obj));
  //   console.log(props);
  //   const [examSubmissions,setSubmissions] = useState([])
  //   var raw = JSON.stringify({
  //     operation: "read",
  //     payload: {
  //       student: props.student,
  //     },
  //   });
  //   const requestOptions = { method: "POST", body: raw };

  //   async function fetchSubmissions() {
  //     var url2 =
  //       "https://bc85o4egqi.execute-api.us-east-2.amazonaws.com/test/DynamoDBManager";
  //     const response2 = await fetch(url2, requestOptions);
  //     const data2 = await response2.json();
  //     // return [Object.values(data)];

  //       return data2;
  //     }

  //   (async () => {
  //     setSubmissions(await fetchSubmissions());

  //   })();
  //   console.log(JSON.parse(examSubmissions))

  return (
    <>
      <br />
      <input
        value={student}
        placeholder="Student Name: "
        className="form-control w-25 m-0 m-auto pb-2 text-left"
        onChange={(e) => {
          setStudent(e.target.value.toLowerCase());
        }}
        onKeyDown={(e) => {
          getData(e);
        }}
      />
      <br />
      <table
        class="table table-striped"
        style={{ display: entered === false ? "none" : "inline" }}
      >
        <thead>
          <tr>
            <th scope="col" className=" text-center">
              Student
            </th>
            <th scope="col" className=" text-center">
              dt
            </th>
            <th scope="col" className=" text-center">
              exam year
            </th>
            <th scope="col" className=" text-center">
              exam name
            </th>
            <th scope="col" className=" text-center">
              exam type
            </th>
            <th scope="col" className=" text-center">
              mark
            </th>
          </tr>
        </thead>
        <tbody>
          {submissions[1].map((element, idx) => (
            <tr>
              <td>{capitalizeFirstLetter(submissions[1][idx]["student"])}</td>
              <td>{submissions[1][idx]["dt"]}</td>

              <td>{submissions[1][idx]["exam_year"]}</td>
              <td>
                {capitalizeFirstLetter(
                  submissions[1][idx]["exam_name"].split("_")[0]
                )}
              </td>
              <td>
                {capitalizeFirstLetter(
                  submissions[1][idx]["exam_name"].split("_")[1]
                )}
              </td>
              <td>{submissions[1][idx]["mark"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DashboardMathematica;
