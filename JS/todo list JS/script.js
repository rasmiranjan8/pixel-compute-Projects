const addBtn = document.querySelector('.add-btn');
const tasksSection = document.querySelector(".tasks-section");

const handleAddBtnClick = () => { 
  const taskInput = document.querySelector('.task-input input[type="text"]');
  const taskDate = document.querySelector('.task-input input[type="date"]');
  const taskTime = document.querySelector('.task-input input[type="time"]');

  if (!taskInput.value) return;

  const task = document.createElement('div');
  task.classList.add('task');

  const taskText = document.createElement('span');
  taskText.textContent = `${taskInput.value} at ${taskTime.value}`;

  const taskDateH3 = document.createElement('h3');
  taskDateH3.textContent = taskDate.value;
  
  const taskActions = document.createElement('div');
  taskActions.classList.add('task-actions');
  
  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-btn');
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', handleEditBtnClick);
  taskActions.appendChild(editBtn);
  
  const deleteBtn = document.createElement('button'); 
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', handleDeleteBtnClick);
  taskActions.appendChild(deleteBtn);
  
  task.appendChild(taskText);
  task.appendChild(taskActions);
  
  const taskGroup = document.createElement('div');
  taskGroup.classList.add('task-group');
  taskGroup.appendChild(taskDateH3);
  taskGroup.appendChild(task);
  tasksSection.appendChild(taskGroup);

  taskInput.value = '';
  taskDate.value = '';
  taskTime.value = '';
}

const handleDeleteBtnClick = (event) => {
  console.log('Delete button clicked');
  const taskGroup = event.target.closest('.task-group');
  if (taskGroup) {
    taskGroup.remove();
    console.log('Task removed');
  } else {
    console.log('Task group not found');
  }
};

const handleEditBtnClick = (event) => {
  console.log('Edit button clicked');
  const taskText = event.target.closest('.task').querySelector('span');
  const currentText = taskText.textContent.split(' at ')[0];
  const newText = prompt('Edit task:', currentText);
  if (newText !== null) {
    const timePart = taskText.textContent.split(' at ')[1] || '';
    taskText.textContent = `${newText}${timePart ? ' at ' + timePart : ''}`;
    console.log('Task updated to:', taskText.textContent);
  }
};

// Initialize event listeners
addBtn.addEventListener('click', handleAddBtnClick);

// Add listeners to existing buttons
document.querySelectorAll('.delete-btn').forEach(btn => {
  btn.addEventListener('click', handleDeleteBtnClick);
});

document.querySelectorAll('.edit-btn').forEach(btn => {
  btn.addEventListener('click', handleEditBtnClick);
});
