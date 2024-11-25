
// payment.js

document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('payment-form');
    const paymentTableBody = document.getElementById('payment-table-body');

    // Load data from localStorage
    const paymentData = JSON.parse(localStorage.getItem('paymentData')) || [];
    const mealData = JSON.parse(localStorage.getItem('mealData')) || [];
    const shoppingData = JSON.parse(localStorage.getItem('shoppingData')) || [];

    // Calculate total shopping costs and total meals
    const totalShopping = shoppingData.reduce((sum, item) => sum + item.cost, 0);
    const totalMeals = mealData.reduce((sum, record) => sum + record.breakfast + record.lunch + record.dinner, 0);
    const mealRate = totalMeals > 0 ? (totalShopping / totalMeals).toFixed(2) : 0;

    // Function to update the payment table
    const updatePaymentTable = () => {
        paymentTableBody.innerHTML = '';
        paymentData.forEach((record, index) => {
            const row = `<tr>
                <td>${record.member}</td>
                <td>৳${record.due.toFixed(2)}</td>
                <td>৳${record.paid.toFixed(2)}</td>
                <td>৳${(record.due - record.paid).toFixed(2)}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            </tr>`;
            paymentTableBody.innerHTML += row;
        });
    };

    // Handle form submission to add payment data
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(paymentForm);
        const memberName = formData.get('member');
        const paidAmount = parseFloat(formData.get('paid')) || 0;

        // Calculate due based on meal data
        const memberMeals = mealData.filter(record => record.member === memberName);
        const totalMemberMeals = memberMeals.reduce((sum, record) => sum + record.breakfast + record.lunch + record.dinner, 0);
        const dueAmount = totalMemberMeals * mealRate;

        const newPayment = {
            member: memberName,
            due: dueAmount,
            paid: paidAmount,
        };
        paymentData.push(newPayment);
        localStorage.setItem('paymentData', JSON.stringify(paymentData));
        updatePaymentTable();
        paymentForm.reset();
    });

    // Handle delete functionality
    paymentTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.dataset.index;
            paymentData.splice(index, 1);
            localStorage.setItem('paymentData', JSON.stringify(paymentData));
            updatePaymentTable();
        }
    });

    // Initialize the table with existing data
    updatePaymentTable();
});
