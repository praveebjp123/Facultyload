document.getElementById("addFaculty").addEventListener("click", function () {
    const facultyName = document.getElementById("facultyName").value;
    const selectedSubjects = Array.from(document.getElementById("subjects").selectedOptions).map(option => option.value);
    const selectedLabs = Array.from(document.getElementById("labs").selectedOptions).map(option => option.value);

    if (!facultyName) {
        alert("Please enter the faculty name.");
        return;
    }

    const totalSubjects = selectedSubjects.length;
    const totalLabs = selectedLabs.length;
    const overallTotal = totalSubjects + totalLabs;

    // Add row to the table
    const tableBody = document.querySelector("#facultyTable tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${facultyName}</td>
        <td>${selectedSubjects.join(", ") || "None"}</td>
        <td>${selectedLabs.join(", ") || "None"}</td>
        <td>${totalSubjects}</td>
        <td>${totalLabs}</td>
        <td>${overallTotal}</td>
    `;
    tableBody.appendChild(row);

    // Clear the form for the next entry
    document.getElementById("facultyForm").reset();
});

document.getElementById("printView").addEventListener("click", function () {
    const printContents = document.querySelector("#facultyTable").outerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
        <html>
        <head>
            <title>Print Faculty Load Details</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <h1 class="text-center">Faculty Load Details</h1>
            ${printContents}
        </body>
        </html>
    `);
    newWindow.document.close();
    newWindow.print();
});
