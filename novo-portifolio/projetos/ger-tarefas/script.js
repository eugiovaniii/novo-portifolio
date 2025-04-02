document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');
    if (taskInput.value !== '') {
        var newTask = document.createElement('li');
        newTask.innerHTML = taskInput.value + '<button onclick="removeTask(this)">Remover</button>';
        taskList.appendChild(newTask);
        taskInput.value = '';
    }
});

function removeTask(taskElement) {
    taskElement.parentElement.remove();
}
