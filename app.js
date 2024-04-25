// Initialize Firebase with your config
firebase.initializeApp({
    apikey: "AIzaSyCGC7JbLml00e4reAhdVOgIm5-FnIpUdV4",
    authDomain: "my-project-2eb6f.firebaseapp.com" ,
    projectid: "my-project-2eb6f" ,
}) ;

const db = firebase. firestore();
// Function to add a task
function addTask() {
    const taskInput = document-getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
        db. collection ("tasks") .add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }) ;
        taskInput.value =
        "";
    }
}

// Function to render tasks
function renderTasks(doc) {
    const taskList = document-getElementById("task-list");
    const taskItem = document.createElement ("li");
    taskItem. className = "task-item";
    taskItem. innerHTML = `
        < span>${doc.data() .task}</span>
        ‹ button onclick="deleteTask('${doc.id}')">Delete‹/button>
    `;
    taskList.appendChild(taskItem);
}

db.collection( "tasks")
  .orderBy("timestamp","desc")
  .onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === 'added') {
            renderTasks(change.doc);
        }
  });
});

function deleteTask(id) {
    db.collection("tasks"). doc(id).delete();
}