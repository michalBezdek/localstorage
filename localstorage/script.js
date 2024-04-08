const userStorage = JSON.parse(localStorage.getItem("tasks")) || [];

function ulozeniDat() {
    const iData = document.getElementById("sigma").value;

    if (iData.trim() !== "") {
        const timestamp = getTimestamp();
        const task = {
            text: iData,
            timestamp: timestamp
        };

        if (!userStorage.some(task => task.text === iData)) {
            userStorage.push(task);
            updateTaskList();
            localStorage.setItem("tasks", JSON.stringify(userStorage));
        } else {
            alert("Task already exists!");
        }
    } else {
        alert("Please enter a valid task!");
    }
}

function getTimestamp() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `${date} ${time}`;
}

function updateTaskList() {
    const storageText = userStorage.map((task, index) => {
        return `<div>${task.text} - ${task.timestamp} <button onclick="deleteTask(${index})">X</button> <button onclick="editTask(${index})">Edit</button></div>`;
    }).join('<br>');

    document.getElementById("deti").innerHTML = storageText;
}

function deleteTask(index) {
    userStorage.splice(index, 1);
    updateTaskList();
    localStorage.setItem("tasks", JSON.stringify(userStorage));
}

function editTask(index) {
    const updatedTask = prompt("Edit task:", userStorage[index].text);

    if (updatedTask !== null) {
        const timestamp = getTimestamp();
        userStorage[index].text = updatedTask.trim();
        userStorage[index].timestamp = timestamp;
        updateTaskList();
        localStorage.setItem("tasks", JSON.stringify(userStorage));
    }
}


updateTaskList();