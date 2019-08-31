var buttons = document.querySelectorAll("button");
var selectors = document.querySelectorAll("select");
var mainRecord = document.getElementById("main");

var subjects = ["English", "Hindi", "Maths", "Science", "Social"];


buttons[0].addEventListener("click", addStudent);

var studentsRecordArr = [];
var totalStudentCount = 0;

function Student(name, grade, section, examType, marks, performance) {
    this.name = name,
    this.grade = grade,
    this.section = section,
    this.examType = examType,
    this.marks = marks,
    this.performance = performance,
    this.fillRecord = function() {
        var mainDiv = document.createElement("div");
        mainDiv.setAttribute("class", "main-records");
        for(key in this) {
            if(key == 'marks') {
                var div = document.createElement("div");
                div.setAttribute("class", "marks-div");
                var k = 0;
                marks.forEach(function(element) {
                    var p = document.createElement("p");
                    p.innerHTML = subjects[k];
                    div.appendChild(p);
                    var p = document.createElement("p");
                    p.innerHTML = " : " + element;
                    div.appendChild(p);
                    k++;
                })
                mainDiv.appendChild(div);
            }
            
            else if(key == 'performance') {
                var div = document.createElement("div");
                performance.forEach(function(element) {
                    var p = document.createElement("p");
                    p.innerHTML = element;
                    p.style.textAlign = 'center';
                    div.appendChild(p);
                })
                mainDiv.appendChild(div);
            }
            else if(key != 'fillRecord') {
                var div = document.createElement("div");
                var p = document.createElement("p");
                p.innerHTML = this[key];
                div.appendChild(p);
                mainDiv.appendChild(div);
            }
        }
        mainRecord.appendChild(mainDiv);
        var hr = document.createElement("hr");
        mainRecord.appendChild(hr);
        
    }
};

function addStudent() {
    var inputs = document.querySelectorAll("input");
    var newStudentMarks = [];
    var newStudentPerf = [];
    var totalMarks = 0;

    for(i = 1; i < inputs.length; i++) {
        totalMarks = totalMarks + Number(inputs[i].value);
        newStudentMarks.push(inputs[i].value);
    }

    studentPerf = (totalMarks / 500) * 100;
    newStudentPerf.push(studentPerf + "%");

    if(studentPerf >= 90) {
        newStudentPerf.push("Excellent");
    } 
    else if((studentPerf >= 75) && (studentPerf <= 89)) {
        newStudentPerf.push("Above Average");
    }
    else if((studentPerf >= 70) && (studentPerf <= 74 )) {
        newStudentPerf.push("Average");
    }
    else if((studentPerf >= 50) && (studentPerf <= 69)) {
        newStudentPerf.push("Below Average");
    }
    else if((studentPerf < 50)) {
        newStudentPerf.push("Good");
    }

    var newStudentEntry = new Student(inputs[0].value, selectors[0].value, selectors[1].value, selectors[2].value, newStudentMarks, newStudentPerf);
    console.log(newStudentEntry);
    studentsRecordArr.push(newStudentEntry);
    
    totalStudentCount++;
    document.getElementById("total-students-count").innerHTML = totalStudentCount;
    addRecord();
}

function addRecord() {
    studentsRecordArr[studentsRecordArr.length - 1].fillRecord();
    var inputs = document.querySelectorAll("input");

    for(i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

//Filters 

var filterAllButton = document.getElementById("filter-all");

filterAllButton.addEventListener("click", function() {
    isFiltered = false;
    filterSelectors[0].value = "Grade";
    filterSelectors[1].value = "Section";
    filterSelectors[2].value = "ExamType";
    clearTable();
    for(i = 0; i < studentsRecordArr.length; i++) {
        studentsRecordArr[i].fillRecord();
    }

})

function clearTable() {
    var tableRows = document.querySelectorAll(".main-records");
    var tableBreaks = document.querySelectorAll("#main hr");


    for(i = 1; i < tableRows.length; i++) {
        mainRecord.removeChild(tableRows[i]);
        mainRecord.removeChild(tableBreaks[i]);
    }
}

var filterSelectors = document.querySelectorAll("#students-record-top select");

filterSelectors[0].addEventListener("change", function(element) {
    clearTable();   
    for(i = 0; i < studentsRecordArr.length; i++) {
        if(studentsRecordArr[i].grade == element.target.value) {
            studentsRecordArr[i].fillRecord();
        }
    }
})
filterSelectors[1].addEventListener("change", function(element) {
    clearTable();    
    for(i = 0; i < studentsRecordArr.length; i++) {
        if(studentsRecordArr[i].section == element.target.value) {
            studentsRecordArr[i].fillRecord();
        }
    }
})
filterSelectors[2].addEventListener("change", function(element) {
    clearTable();    
    for(i = 0; i < studentsRecordArr.length; i++) {
        if(studentsRecordArr[i].examType == element.target.value) {
            studentsRecordArr[i].fillRecord();
        }
    }
})
