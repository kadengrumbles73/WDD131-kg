const aCourse = {
  code: "CSE121b",
  name: "Javascript Language",
  logo: "images/js-logo.png",
  sections: [
    { sectionNum: 1, roomNum: "STC 353", enrolled: 26, days: "TTh", instructor: "Bro T" },
    { sectionNum: 2, roomNum: "STC 347", enrolled: 28, days: "TTh", instructor: "Sis A" }
  ],

  // Combined logic to add or remove students
  changeEnrollment: function (sectionNum, add = true) {
    // Find the section that matches the input number
    const sectionIndex = this.sections.findIndex(
      (section) => section.sectionNum == sectionNum
    );

    if (sectionIndex >= 0) {
      if (add) {
        this.sections[sectionIndex].enrolled++;
      } else if (this.sections[sectionIndex].enrolled > 0) {
        // Prevent negative enrollment
        this.sections[sectionIndex].enrolled--;
      }
      renderSections(this.sections);
    }
  }
};

// Populate the course headers in the HTML
document.querySelector("#courseName").textContent = aCourse.name;
document.querySelector("#courseCode").textContent = aCourse.code;

// Template for table rows
function sectionTemplate(section) {
  return `<tr>
      <td>${section.sectionNum}</td>
      <td>${section.roomNum}</td>
      <td>${section.enrolled}</td>
      <td>${section.days}</td>
      <td>${section.instructor}</td>
    </tr>`;
}

// Function to calculate and display the total sum of students
function calculateTotalEnrollment(sections) {
  const total = sections.reduce((sum, section) => sum + section.enrolled, 0);
  document.querySelector("#totalEnrollment").textContent = total;
}

// Function to render the section list and the total
function renderSections(sections) {
  const html = sections.map(sectionTemplate);
  document.querySelector("#sections").innerHTML = html.join("");
  calculateTotalEnrollment(sections);
}

// Event Listeners for buttons
document.querySelector("#enrollStudent").addEventListener("click", function () {
  const sectionNum = document.querySelector("#sectionNumber").value;
  aCourse.changeEnrollment(sectionNum, true);
});

document.querySelector("#dropStudent").addEventListener("click", function () {
  const sectionNum = document.querySelector("#sectionNumber").value;
  aCourse.changeEnrollment(sectionNum, false);
});

// Initial page render
renderSections(aCourse.sections);