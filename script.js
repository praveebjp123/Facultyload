document.getElementById("generateClasses").addEventListener("click", function () {
    const selectedSubjects = Array.from(document.getElementById("subjects").selectedOptions).map(option => option.value);
    const selectedLabs = Array.from(document.getElementById("labs").selectedOptions).map(option => option.value);

    const allSelectedItems = [...selectedSubjects, ...selectedLabs];

    if (allSelectedItems.length === 0) {
        alert("Please select at least one subject or lab.");
        return;
    }

    const classesContainer = document.getElementById("classesContainer");
    classesContainer.innerHTML = "<h5>Enter Classes Per Week:</h5>";

    allSelectedItems.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "mb-3";

        itemDiv.innerHTML = `
            <label>${item}</label>
            <input type="number" class="form-control classCount" data-item="${item}" placeholder="Enter number of classes per week" min="1" required>
        `;
        classesContainer.appendChild(itemDiv);
    });

    document.getElementById("addFaculty").disabled = false;
});

document.getElementById("addFaculty").addEventListener("click", function () {
    const facultyName = document.getElementById("facultyName").value;
    const classInputs = Array.from(document.querySelectorAll(".classCount"));

    if (!facultyName || classInputs.some(input => !input.value)) {
        alert("Please fill out all required fields.");
        return;
    }

    let totalSubjectLoad = 0;
    let totalLabLoad = 0;
    let subjects = [];
    let labs = [];

    classInputs.forEach(input => {
        const item = input.dataset.item;
        const classCount = parseInt(input.value);

        if (item.includes("Lab")) {
            labs.push(`${item} (${classCount} classes/week)`);
            totalLabLoad += classCount;
        } else {
            subjects.push(`${item} (${classCount} classes/week)`);
            totalSubjectLoad += classCount;
        }
    });

    const totalLoad = totalSubjectLoad + totalLabLoad;

    const tableBody = document.querySelector("#facultyTable tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${facultyName}</td>
        <td>${subjects.join(", ") || "None"}</td>
        <td>${labs.join(", ") || "None"}</td>
        <td>${totalSubjectLoad}</td>
        <td>${totalLabLoad}</td>
        <td>${totalLoad}</td>
        <td>
            <button class="btn btn-warning btn-sm editBtn">Edit</button>
            <button class="btn btn-danger btn-sm deleteBtn">Delete</button>
        </td>
    `;

    tableBody.appendChild(row);

    document.getElementById("facultyForm").reset();
    document.getElementById("classesContainer").innerHTML = "";
    document.getElementById("addFaculty").disabled = true;
});

document.querySelector("#facultyTable").addEventListener("click", function (event) {
    const row = event.target.closest("tr");

    // Delete functionality
    if (event.target.classList.contains("deleteBtn")) {
        row.remove();
    }

    // Edit functionality
    if (event.target.classList.contains("editBtn")) {
        const facultyName = row.children[0].textContent;
        const subjects = row.children[1].textContent;
        const labs = row.children[2].textContent;

        document.getElementById("facultyName").value = facultyName;

        // Populate selected items
        const subjectsArray = subjects.split(", ");
        const labsArray = labs.split(", ");

        // Clear previous selections
        const subjectsSelect = document.getElementById("subjects");
        const labsSelect = document.getElementById("labs");
        [...subjectsSelect.options, ...labsSelect.options].forEach(option => {
            option.selected = false;
        });

        // Select relevant items
        subjectsArray.forEach(subject => {
            const option = Array.from(subjectsSelect.options).find(opt => subject.includes(opt.value));
            if (option) option.selected = true;
        });

        labsArray.forEach(lab => {
            const option = Array.from(labsSelect.options).find(opt => lab.includes(opt.value));
            if (option) option.selected = true;
        });

        // Re-enable the "Add Faculty" button
        document.getElementById("addFaculty").disabled = false;

        // Remove the row from the table to avoid duplicates
        row.remove();
    }
});

// Print View functionality
document.getElementById("printView").addEventListener("click", function () {
    const tableContent = document.getElementById("facultyTable").outerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
        <html>
        <head>
            <title>Print View</title>
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #000;
                    padding: 8px;
                    text-align: left;
                }
            </style>
        </head>
        <body>
            <h1>Faculty Load Details</h1>
            ${tableContent}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
});

