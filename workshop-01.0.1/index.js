class Task {   //Crea una clase que funcionara como objeto para cauna de las tareas con sus propiedades y un metodo que permitira cambiar el estado de completado
    constructor(id, description, completed = false) { //Esablece las propiedades locales de la clase igual a las que acaba de recibir al instanciar la clase
        this.id = id;
        this.description = description;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed; // Cambia el estado actual de completed a su contrario booleano
    }
}

class TaskManager { // Crea la clase que se encargara del manejo de las tareas
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || []; //Extrae el local estorage y lo guarda dentro de la propiedad task de la clase
        this.loadTasks(); // ejecuta un metodo de su propia clase
    }

    addTask(description) {
        const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1; // Crea el id de la tarea luego de verificar que exista almenos una si es asi lo genera, en caso de que no exista la tarea se le asigna el valor 1

        const task = new Task(id, description); //Instancia una nueva tarea usando el objeto creado anteriormente
        this.tasks.push(task); //Añade a las tareas ya cargadas la recien cargada
        this.saveTasks(); //Llama un metodo de la propia clase
        this.renderTasks(); //Llama un metodo de la propia clase
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id); //Busca segun el id y devuelve un nuevo array con sin la tarea que coincida
        this.saveTasks(); //Llama un metodo de la propia clase
        this.renderTasks(); //Llama un metodo de la propia clase
    }

    toggleTaskComplete(id) {
        const task = this.tasks.find(task => task.id === id); // Busca y encuentra la tarea segun el id enviado
        if (task) { //Pregunta si se encontro algo
            task.toggleComplete(); // usa el metodo para marcar la tarea como completada
            this.saveTasks(); //Llama un metodo de la propia clase
            this.renderTasks(); //Llama un metodo de la propia clase
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Carga el localStorage con el array actual de tareas 
    }

    loadTasks() {
        this.renderTasks(); //Llama un metodo de la propia clase
    }

    renderTasks() {
        const taskList = document.getElementById('task-list'); //Obtiene el elemento html que coincide con el id
        taskList.innerHTML = ''; //Establece el texto del elemento como vacio
        this.tasks.forEach(task => { //Recorre el array actual de tareas
            const item = document.createElement('li'); // Crea elementos de lista
            item.textContent = task.description; // Establece el texto de la lista como el valor que hay dentro de la tarea
            item.className = task.completed ? 'completed' : 'uncompleted'; // Cambia la clase del elemento de la lista dependiendo del estado de la tarea 
            item.addEventListener('click', () => this.toggleTaskComplete(task.id)); // Genera el escuchador, de modo que al dar click se llame el metodo para marcar como completada la tarea

            const deleteButton = document.createElement('button'); // se genera un boton
            deleteButton.textContent = 'Eliminar'; // Se establece el texto del boton como ELIMINAR
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.deleteTask(task.id);// llama el metodo para elimnar la tarea y envia el id
            });

            item.appendChild(deleteButton); //Añade al elemento de lista el boton eliminar
            taskList.appendChild(item);// Añade al elemento el item ya completo
        });
    }
}

document.addEventListener('DOMContentLoaded', () => { // Espera a que la pagina este completamente cargada para ejecutar la funcion
    const taskManager = new TaskManager(); // Instancia la clase para el manejo de tareas

    document.getElementById('add-task').addEventListener('click', () => { // Obtiene el elemento con el id correspondiente y añade un escuchado para que al dar click se ejecute una funcion
        const newTask = document.getElementById('new-task').value; // Obtiene el elemento con el id correspondiente y obtiene el valor
        if (newTask) {// Verifica que el valor no sea vacio
            taskManager.addTask(newTask); //Añade la tarea con el valor recien recibido
            document.getElementById('new-task').value = ''; // Deja vacio el input nuevamente 
        }
    });
});