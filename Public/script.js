// Array to store the expenses
let expenses = [];

const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const filterInput = document.getElementById('filter');
const thankYouMessage = document.getElementById('thank-you');

// Function to display expenses in the DOM
const displayExpenses = (expensesToDisplay) => {
    expenseList.innerHTML = ''; // Clear current expense list

    if (expensesToDisplay.length === 0) {
        expenseList.innerHTML = '<li>No expenses found.</li>';
        return;
    }

    expensesToDisplay.forEach(exp => {
        const listItem = document.createElement('li');
        listItem.className = 'expense-item';
        
        listItem.innerHTML = `
            <div>${new Date(exp.date).toLocaleDateString()}</div>
            <div>${exp.description}</div>
            <div>$${parseFloat(exp.amount).toFixed(2)}</div>
            <div>${exp.category}</div>
        `;
        
        expenseList.appendChild(listItem);
    });
};

// Function to filter expenses by category
const filterExpenses = () => {
    const filterValue = filterInput.value.toLowerCase();

    const filteredExpenses = expenses.filter(exp => 
        exp.category.toLowerCase().includes(filterValue)
    );

    displayExpenses(filteredExpenses);
};

// Function to show Thank You message
const showThankYouMessage = () => {
    thankYouMessage.style.display = 'block';
    
    // Hide after 2 seconds
    setTimeout(() => {
        thankYouMessage.style.display = 'none';
    }, 2000);
};

// Function to handle adding a new expense
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newExpense = {
        date: document.getElementById('expense-date').value,
        description: document.getElementById('expense-description').value,
        amount: document.getElementById('expense-amount').value,
        category: document.getElementById('expense-category').value
    };

    expenses.push(newExpense); // Add the new expense to the array
    displayExpenses(expenses); // Refresh the expense list
    expenseForm.reset(); // Reset the form

    showThankYouMessage(); // Show thank you message
});

// Function to export expenses to CSV
const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Date,Description,Amount,Category\n"; // CSV headers

    expenses.forEach(exp => {
        csvContent += `${exp.date},${exp.description},${exp.amount},${exp.category}\n`;
    });

    // Create a downloadable CSV file
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'expenses.csv');
    document.body.appendChild(link);

    // Trigger download
    link.click();
};

// Display all expenses initially (empty)
displayExpenses(expenses);
