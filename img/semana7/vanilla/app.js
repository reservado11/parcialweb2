function getStudents() {
    return JSON.parse(localStorage.getItem("students")) || [];
}

function saveStudent(student) {
    const students = getStudents();
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
}

function saveStudents(students) {
    localStorage.setItem("students", JSON.stringify(students));
}

function deleteStudent(index) {
    const students = getStudents();
    if (index >= 0 && index < students.length) {
        students.splice(index, 1);
        saveStudents(students);
        renderList();
    }
}

function router() {
    const path = location.hash.slice(1) || "/";
    const app = document.getElementById("app");
    app.innerHTML = "";
    let templateId;
    if (path === "/") {
        templateId = "form-template";
    } else if (path === "/lista") {
        templateId = "list-template";
    } else {
        templateId = "404-template";
    }
    const template = document.getElementById(templateId);
    app.appendChild(template.content.cloneNode(true));
    if (path === "/") {
        attachFormLogic();
    } else if (path === "/lista") {
        renderList();
    }
}

function attachFormLogic() {
    const form = document.getElementById("studentForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const n1 = parseFloat(document.getElementById("nota1").value);
        const n2 = parseFloat(document.getElementById("nota2").value);
        const n3 = parseFloat(document.getElementById("nota3").value);
        if (!name || isNaN(n1) || isNaN(n2) || isNaN(n3)) {
            document.getElementById("msg").textContent = "Debes llenar todos los campos.";
            return;
        }
        const avg = ((n1 + n2 + n3) / 3).toFixed(2);
        saveStudent({ name, avg });
        document.getElementById("msg").textContent =
            `Estudiante ${name} con promedio de ${avg} guardado con éxito.`;
        form.reset();
    });
}

function renderList() {
    const students = getStudents();
    const list = document.getElementById("studentList");
    list.innerHTML = "";
    if (students.length === 0) {
        const empty = document.createElement("li");
        empty.textContent = "No hay estudiantes registrados.";
        list.appendChild(empty);
        return;
    }

    const template = document.getElementById("student-item-template");
    students.forEach((s, i) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".student-name").textContent = s.name;
        clone.querySelector(".student-avg").textContent = s.avg;
        list.appendChild(clone);
    });
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);