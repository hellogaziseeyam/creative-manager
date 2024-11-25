
// shopping.js

document.addEventListener('DOMContentLoaded', () => {
    const shoppingForm = document.getElementById('shopping-form');
    const shoppingTableBody = document.getElementById('shopping-table-body');

    // Load shopping data from localStorage
    const shoppingData = JSON.parse(localStorage.getItem('shoppingData')) || [];

    // Function to update the shopping table
    const updateShoppingTable = () => {
        shoppingTableBody.innerHTML = '';
        shoppingData.forEach((item, index) => {
            const row = `<tr>
                <td>${item.date}</td>
                <td>${item.item}</td>
                <td>৳${item.cost.toFixed(2)}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            </tr>`;
            shoppingTableBody.innerHTML += row;
        });

        // Update total shopping cost
        const totalCost = shoppingData.reduce((sum, item) => sum + item.cost, 0);
        document.getElementById('total-shopping').textContent = `৳${totalCost.toFixed(2)}`;
    };

    // Handle form submission to add shopping data
    shoppingForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(shoppingForm);
        const newItem = {
            date: formData.get('date'),
            item: formData.get('item'),
            cost: parseFloat(formData.get('cost')) || 0,
        };
        shoppingData.push(newItem);
        localStorage.setItem('shoppingData', JSON.stringify(shoppingData));
        updateShoppingTable();
        shoppingForm.reset();
    });

    // Handle delete functionality
    shoppingTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.dataset.index;
            shoppingData.splice(index, 1);
            localStorage.setItem('shoppingData', JSON.stringify(shoppingData));
            updateShoppingTable();
        }
    });

    // Initialize the table with existing data
    updateShoppingTable();
});
