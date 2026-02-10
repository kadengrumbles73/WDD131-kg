const students = [
    {last: 'Andrus', first: 'Aaron'},
    {last: 'Masa', first: 'Manny'},
    {last: 'Tanda', first: 'Tamanda'}
];

const grades = ['A', 'C', 'B'];

function convert(grade) {
    let points = 0;
    switch (grade.toUpperCase()) {
        case 'A': points = 4; break;
        case 'B': points = 3; break;
        case 'C': points = 2; break;
        case 'D': points = 1; break;
        case 'F': points = 0; break;
        default: console.log('not a valid grade');
    }
    return points;
}

const studentContainer = document.querySelector('#student-container');
const studentHTML = students.map(s => `<div class="student-item">${s.first} ${s.last}</div>`).join('');
studentContainer.innerHTML = studentHTML;

const pointValues = grades.map(convert);
const totalPoints = pointValues.reduce((acc, curr) => acc + curr, 0);
const gpa = totalPoints / pointValues.length;

const gpaDisplay = document.querySelector('#gpa-display');
if (gpaDisplay) {
    gpaDisplay.innerText = `GPA: ${gpa.toFixed(2)}`;
}

console.log(pointValues);
console.log(totalPoints);
console.log(gpa);