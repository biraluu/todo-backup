document.getElementById('add-btn').addEventListener('click', async () => {
    const task = document.getElementById('todo-input').value;
    if (task) {
        await fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task })
        });
        document.getElementById('todo-input').value = '';
        loadTodos();
    }
});

async function loadTodos() {
    const response = await fetch('http://localhost:3000/todos');
    const todos = await response.json();
    const list = document.getElementById('todo-list');
    list.innerHTML = '';
    todos.forEach(todo => {
        const item = document.createElement('li');
        item.textContent = todo.task;


        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => deleteTask(todo.id));

        // Append elements
        item.appendChild(deleteButton);
        list.appendChild(item);
    });
}

async function deleteTask(todosId) {
    try {
        await fetch(`http://localhost:3000/todos/${todosId}`, {
            method: 'DELETE',
        });
        loadTodos(); // Refresh the task list
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

loadTodos();
