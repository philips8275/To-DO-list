document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.innerHTML = `
                <span>${task.description}</span>
                <div>
                    <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    const addTask = () => {
        const taskDescription = newTaskInput.value.trim();
        if (taskDescription === '') {
            alert('Please enter a task description.');
            return;
        }
        tasks.push({ description: taskDescription, completed: false });
        newTaskInput.value = '';
        saveTasks();
        renderTasks();
    };

    const updateTask = (index, newDescription) => {
        tasks[index].description = newDescription;
        saveTasks();
        renderTasks();
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    const toggleTaskCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    addTaskButton.addEventListener('click', addTask);

    taskList.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.matches('button.edit')) {
            const newDescription = prompt('Edit task description:', tasks[index].description);
            if (newDescription !== null && newDescription.trim() !== '') {
                updateTask(index, newDescription.trim());
            }
        } else if (e.target.matches('button.delete')) {
            deleteTask(index);
        } else if (e.target.matches('input[type="checkbox"]')) {
            toggleTaskCompletion(index);
        }
    });

    renderTasks();
});
