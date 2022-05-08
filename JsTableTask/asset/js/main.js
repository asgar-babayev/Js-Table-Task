
let modal = document.getElementById("myModal");

let btn = document.getElementById("btn");

let span = document.getElementsByClassName("close")[0];

let btnAdd = document.getElementById("btnAdd");

let btnEdit = document.getElementById("btnEdit");

btn.addEventListener("click", function () {
    modal.style.display = "block";
    btnAdd.classList.remove("d-none");
    btnEdit.classList.add("d-none");
    document.getElementById("namein").value = "";
    document.getElementById("surnamein").value = "";
    document.getElementById("agein").value = "";
})

span.addEventListener("click", function () {
    modal.style.display = "none";
    btnAdd.classList.remove("d-none");
    btnEdit.classList.add("d-none");
    document.querySelectorAll("tr").forEach(x => {
        x.classList.remove("active");
    })
})

window.addEventListener("click", function () {
    if (event.target == modal) {
        modal.style.display = "none";
        btnAdd.classList.remove("d-none");
        btnEdit.classList.add("d-none");
        document.querySelectorAll("tr").forEach(x => {
            x.classList.remove("active");
        })
    }
})

let input = document.querySelectorAll(".inp");
let searchId = document.querySelector(".searchId");
searchId.onkeyup = function () {
    for (let i = 1; i < table.rows.length; i++) {
        if (table.rows[i].cells[1].innerHTML.includes(searchId.value) == true || table.rows[i].cells[2].innerHTML.includes(searchId.value) == true || table.rows[i].cells[3].innerHTML.includes(searchId.value) == true) {
            let ind = table.rows[i].cells[0];
            table.rows[i].classList.remove("visibilityy");
        }
        else if (searchId.value == "") {
            table.rows[i].classList.remove("visibilityy");
        }
        else {
            table.rows[i].classList.add("visibilityy");
        }
    }
}

input.forEach(x => {
    x.onblur = function () {
        validate(this);
    }
})

input.forEach(x => {
    x.onkeydown = function () {
        validate(this);
    }
})

input.forEach(x => {
    x.onkeyup = function () {
        validate(this);
    }
})

function validate(elem) {
    if (elem.value.trim() == "") {
        elem.nextElementSibling.classList.remove("d-none");
    }
    else {
        elem.nextElementSibling.classList.add("d-none");
    }
}

const table = document.querySelector("table");

btnAdd.addEventListener("click", function (e) {
    e.preventDefault();
    const tr = document.createElement("tr");
    let number = document.createElement("td");
    let namein = document.getElementById("namein").value;
    let surnamein = document.getElementById("surnamein").value;
    let agein = document.getElementById("agein").value;
    if (namein != "" && surnamein != "" && agein != "") {
        table.append(tr);
        tr.append(number);
        input.forEach(x => {
            let td = document.createElement("td");
            td.innerText = x.value;
            tr.append(td);
            modal.style.display = "none";
        })
        //Edit Button
        createEditBtn(tr);

        //Delete Button
        createDeleteButton(tr);

        for (var i = 1; i < table.rows.length; i++) {
            table.rows[i].cells[0].innerHTML = i;
        }
    }
    else {
        input.forEach(x => {
            validate(x);
        })
    }
})
window.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
    }
})


function createEditBtn(tr) {
    let edit = document.createElement("td");
    let editBtn = document.createElement("a");
    editBtn.setAttribute("href", "#");
    editBtn.setAttribute("id", "edit");
    editBtn.innerHTML = "Edit";
    edit.append(editBtn);
    tr.append(edit);
    editBtn.addEventListener("click", function (e) {
        e.preventDefault();
        btnAdd.classList.add("d-none");
        btnEdit.classList.remove("d-none");
        modal.style.display = "block";
        let currentind = this.closest('tr').rowIndex;
        id = currentind;
        console.log(currentind);
        document.getElementById("namein").value = table.rows[currentind].cells[1].innerHTML;
        document.getElementById("surnamein").value = table.rows[currentind].cells[2].innerHTML;
        document.getElementById("agein").value = table.rows[currentind].cells[3].innerHTML;

    })
}

let id = 0;
btnEdit.addEventListener("click", function (e) {
    e.preventDefault();
    if (namein != "" && surnamein != "" && agein != "") {
        editHtmlTbleSelectedRow(id);
        modal.style.display = "none";
        btnAdd.classList.remove("d-none");
        btnEdit.classList.add("d-none");
    }
    else {
        input.forEach(x => {
            validate(x);
        })
    }
})

function editHtmlTbleSelectedRow(rIndexx) {
    let namein = document.getElementById("namein").value;
    let surnamein = document.getElementById("surnamein").value;
    let agein = document.getElementById("agein").value;
    table.rows[rIndexx].cells[1].innerHTML = namein;
    table.rows[rIndexx].cells[2].innerHTML = surnamein;
    table.rows[rIndexx].cells[3].innerHTML = agein;
}

function createDeleteButton(tr) {
    let del = document.createElement("td");
    let delBtn = document.createElement("a");
    delBtn.setAttribute("href", "#");
    delBtn.setAttribute("id", "del");
    delBtn.innerHTML = "Delete";
    del.append(delBtn);
    tr.append(del);

    delBtn.addEventListener("click", function (e) {
        e.preventDefault();
        let currentind2 = this.closest('tr').rowIndex;
        let n = table.rows[currentind2].cells[1].innerText;
        let s = table.rows[currentind2].cells[2].innerText;
        if (confirm(`Should ${n} ${s} be deleted?`)) {
            this.parentElement.parentElement.remove();
            deleteSelectedRow(currentind2);
        }
    })
}

function deleteSelectedRow(rIndexxx) {
    for (var i = rIndexxx; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerHTML = i;
    }
}