const folders = {};
let currentFolder = "test";
folders["test"] = [];
let taskCounter = 0;


function addFolder(){
    let folderNameInput = document.querySelector(".nameInput");
    let folderStorage = document.querySelector(".folderStorage");
    let folder = document.createElement("button");
    let tasks = document.querySelector(".tasks");
    folder.setAttribute("class", "folderItem");

    console.log(folders);
    if(folderNameInput.value != ""){
        document.querySelectorAll(".folderItem").forEach((item) => {
            item.classList.remove("active");
        });
    
        folder.classList.add("active");
    
        folder.setAttribute("onclick", `showTasks(${folderNameInput.value})`);
    
        folder.innerHTML = folderNameInput.value;
        currentFolder = folderNameInput.value;
        folderStorage.appendChild(folder);
        folders[folderNameInput.value] = [];
        tasks.innerHTML = "";
        folderNameInput.value = "";
    }
}

function addTask(){
    let tasks = document.querySelector(".tasks");
    let taskName = document.querySelector(".taskName");
    let date = document.querySelector(".date");
    let taskHolder = document.createElement("div");
    let finished = document.createElement("button");

    console.log(folders);
    if(taskName.value != null && date.value != ""){
        taskHolder.setAttribute("class", "taskHolder");
        finished.setAttribute("class", "finished");
        finished.setAttribute("onclick", `finished(this.parentNode)`);
        taskName.setAttribute("required", "element.required = true;");
        finished.setAttribute("data-taskid", taskCounter);
    
        taskHolder.innerHTML += taskName.value + ("&nbsp;").repeat(10);
        taskHolder.innerHTML += date.value + ("&nbsp;".repeat(10));
        taskHolder.appendChild(finished);

        folders[currentFolder].push({
            id: taskCounter,
            element: taskHolder,
        });
        tasks.appendChild(taskHolder);

        taskCounter++;

        taskName.value = "";
        date.value = "";

        document.querySelector(".taskName").value = "";
    };
}

function finished(div){
    let taskId = div.querySelector(".finished").getAttribute("data-taskid");
    div.remove();
    let indexToRemove = 0;

    for(let i = 0; i < folders[currentFolder].length; i++){
        if(folders[currentFolder][i].id == parseInt(taskId)){
            indexToRemove = i;
        }
        else{
            indexToRemove = -1;
        }
    }

    if (indexToRemove !== -1) {
        folders[currentFolder].splice(indexToRemove, 1);
    }

    if(folders[currentFolder].length === 0){
        taskCounter = 0;
    }
}

function showTasks(name){
    document.querySelectorAll(".folderItem").forEach((item) => {
        item.classList.remove("active");
    });
    event.target.classList.add("active");

    let tasks = document.querySelector(".tasks");
    tasks.textContent = "";
    for(let i = 0; i < folders[name].length; i++){
        tasks.appendChild(folders[name][i].element);
    }
}
