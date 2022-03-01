function taskDone(parent){
    parent.childNodes[0].style.color = 'rgb(0, 255, 0)';
    parent.childNodes[0].style.backgroundColor = 'rgba(0, 250, 0, 0.4)';
    parent.childNodes[0].style.borderColor = 'rgb(0, 255, 0)';
    parent.childNodes[0].classList.add("disabled");
    parent.childNodes[1].classList.add("disabled");
}
function taskRemove(obj){
    var parent = obj.parentElement;
    parent.removeChild(obj);
}
function addTask(value){
    var task = document.createElement('DIV');
    task.classList.add('task');
    var button1 = document.createElement('BUTTON');
    button1.setAttribute('title', 'Done');
    button1.innerHTML = '&#10004;';

    task.appendChild(button1);
    var p = document.createElement('P');
    p.innerHTML = "&nbsp;&nbsp;"+value+"&nbsp;&nbsp;";
    task.appendChild(p);
    var button2 = document.createElement('BUTTON');
    button2.setAttribute('title', 'Remove');
    button2.innerHTML = '&#10006;';

    task.appendChild(button2);
    document.querySelector('.tasks').appendChild(task);
    button1.addEventListener('click', ()=>{
        taskDone(task);
    });
    button2.addEventListener('click', ()=>{
        taskRemove(task);
    });
}
var taskButton = document.querySelector('.AddTaskButton');
taskButton.addEventListener('click',() => {
    console.log('Focus');
    var taskTitle = document.getElementById('TaskTitle');
    if(taskTitle.value == "" || taskTitle.value == null)
        taskTitle.focus();
    else
        addTask(taskTitle.value);
});