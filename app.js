var input = document.querySelector("input");
var button = document.querySelector("button");
var form = document.querySelector("form");
var todoList = document.querySelector(".todos");

form.addEventListener('submit',function(e){
    e.preventDefault();
    let val =input.value.trim();
    if(val){
        addTodo(
            {
                text : val
            }
        )
            saveTodoList()
    }
    input.value ="";

})

function addTodo(todo){

    var li = document.createElement('li');
    li.innerHTML = `
        <span>${todo.text}</span>
        <i class="fa-solid fa-trash"></i>
    `
    if(todo.status === 'delete'){
        li.setAttribute('class',"delete")
    }
    li.addEventListener('click',function(){
        this.classList.toggle("delete")
    })
    li.querySelector('i').addEventListener('click',function(){
        this.parentElement.remove();
        saveTodoList();
    })
    todoList.appendChild(li)
}

function saveTodoList() {
    let todoLists = document.querySelectorAll('li');
    let todoStorage = [];
    todoLists.forEach(function(item) {
        let text = item.querySelector('span').innerText;
        let status = item.classList.contains('delete') ? 'delete' : 'active';
        todoStorage.push({
            text,
            status
        });
    });
    // Store as a JSON string
    localStorage.setItem("todoLists", JSON.stringify(todoStorage));
    console.log(JSON.parse(localStorage.getItem("todoLists")));
}
function init(){
    let data = JSON.parse(localStorage.getItem("todoLists"))
    data.forEach(function(item){
        addTodo(item);
    })
}
init()