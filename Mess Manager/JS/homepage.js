
// homepage.js

document.addEventListener('DOMContentLoaded', () => {
    const totalMealsElement = document.getElementById('total-meals');
    const totalShoppingElement = document.getElementById('total-shopping');
    const mealRateElement = document.getElementById('meal-rate');

    // Fetch data from localStorage
    const shoppingData = JSON.parse(localStorage.getItem('shoppingData')) || [];
    const mealData = JSON.parse(localStorage.getItem('mealData')) || [];

    // Calculate total shopping costs
    const totalShopping = shoppingData.reduce((sum, item) => sum + item.cost, 0);

    // Calculate total meals eaten
    const totalMeals = mealData.reduce((sum, record) => sum + record.breakfast + record.lunch + record.dinner, 0);

    // Calculate meal rate
    const mealRate = totalMeals > 0 ? (totalShopping / totalMeals).toFixed(2) : 0;

    // Update the dashboard
    totalMealsElement.textContent = totalMeals;
    totalShoppingElement.textContent = `৳${totalShopping}`;
    mealRateElement.textContent = `৳${mealRate}`;
});
