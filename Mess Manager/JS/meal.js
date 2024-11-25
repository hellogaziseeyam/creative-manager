function filterMeals() {
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;

    // Example: Populate table dynamically (replace this with real data fetching logic)
    const tableBody = document.getElementById("meal-table-body");
    tableBody.innerHTML = ""; // Clear existing rows

    const exampleData = [
        { date: "2024-03-01", member: "John Doe", breakfast: 1, lunch: 1, dinner: 1 },
        { date: "2024-03-02", member: "Jane Smith", breakfast: 1, lunch: 1, dinner: 0 },
    ];

    exampleData.forEach((row, index) => {
        const total = row.breakfast + row.lunch + row.dinner;
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.date}</td>
            <td>${row.member}</td>
            <td>${row.breakfast}</td>
            <td>${row.lunch}</td>
            <td>${row.dinner}</td>
            <td>${total}</td>
        `;
        tableBody.appendChild(tr);
    });
}
