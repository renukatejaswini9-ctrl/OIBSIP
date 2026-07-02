const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {

    pendingTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    tasks.forEach((task, index) => {

        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        if(task.completed){
            taskDiv.classList.add("completed");
        }

        taskDiv.innerHTML = `

            <span>${task.text}</span>

            <div class="actions">

                ${
                    !task.completed
                    ?
                    `<button class="complete" onclick="completeTask(${index})">
                        <i class="fa-solid fa-check"></i>
                    </button>`
                    :
                    ""
                }

                <button class="edit" onclick="editTask(${index})">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="delete" onclick="deleteTask(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>

        `;

        if(task.completed){

            completedTasks.appendChild(taskDiv);

        }else{

            pendingTasks.appendChild(taskDiv);

        }

    });

}

function addTask(){

    if(taskInput.value.trim()==""){

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text:taskInput.value,

        completed:false

    });

    taskInput.value="";

    saveTasks();

    displayTasks();

}

function completeTask(index){

    tasks[index].completed=true;

    saveTasks();

    displayTasks();

}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    displayTasks();

}

function editTask(index){

    taskInput.value=tasks[index].text;

    tasks.splice(index,1);

    saveTasks();

    displayTasks();

}

addBtn.addEventListener("click",addTask);

taskInput.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        addTask();

    }

});

displayTasks();