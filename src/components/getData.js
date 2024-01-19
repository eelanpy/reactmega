const { default: answers, type:"json" } = await import("../dataFiles/answers.json");

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function createRows(exam, examType, year) {
  const numberOfQns = Object.keys(answers[`${capitalizeFirstLetter(exam)}-${capitalizeFirstLetter(examType)}-${String(year)}`]).length;
  const rows = [];
  const idCounter = 1
  for(let i = 0; i<numberOfQns; i++) {
    const row = { id: idCounter, name: `${String(idCounter)}`, label:  `${String(idCounter)}`}
    rows.push(row)
    idCounter+=1

}
return rows; 
}

createRows('thales', 'contest', 2014)