const inputData = document.getElementById('input_data');
const addBtn = document.querySelector('.add_btn');
const showList = document.querySelector('.show_todo_list');
const getDate = document.getElementById('date');

// Load todo list from localStorage
let todoList = JSON.parse(localStorage.getItem('todolist')) || [];
showTodo();

// Add todo list function 
function addTodo() {
    let name = inputData.value;
    let date = getDate.value;
    if (name && date) { // Check if both name and date are provided
        todoList.push({ todo: name, date: date });
        inputData.value = ""; // Clear input field
        getDate.value = ""; // Clear date input field
        saveToLocal(); // Save to localStorage
        showTodo(); // Update the displayed todo list
    } else if (name) {
        alert("Please enter the Date!");
    } else {
        alert("Please enter the todo item!");
    }
}

// Save data to localStorage 
const saveToLocal = () => {
    localStorage.setItem('todolist', JSON.stringify(todoList));
}

// Show todo list function 
function showTodo() {
    let todoHTML = '';
    todoList.forEach((todoItem, index) => {
        html = `
        <div class="list">
        <p>${todoItem.todo}</p>
        <p><strong>${todoItem.date}</strong></p>
        <button class="del_btn" data-index="${index}">Delete</button>
        </div>
        `;
        todoHTML += html;
    });
    showList.innerHTML = todoHTML;
}

// Delete the todo list 
showList.addEventListener('click', (e) => {
    if (e.target.classList.contains("del_btn")) {
        let index = e.target.getAttribute('data-index');
        todoList.splice(index, 1);
        showTodo(); // Update the displayed todo list
        saveToLocal(); // Save updated list to localStorage
    } else {
        console.log("No Class found");
    }
});

// Add event listener for Enter key in input field
inputData.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { // Check if the Enter key was pressed
        addTodo(); 
    }
});
