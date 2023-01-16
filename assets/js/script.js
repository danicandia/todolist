const lista_tareas = [
    {
        id: 1,
        description: "Planificar desarrollo de TODO List",
        completed: false
    },
    {
        id: 2,
        description: "Crear nuevo proyecto de desarrollo Web",
        completed: false
    },
    {
        id: 3,
        description: "Crear platilla de archivo html con VSCode",
        completed: false
    }
]

contador_id = 3;
div_tareas = document.getElementById('tareas');
total_tareas = document.getElementById('total-tareas');
tareas_realizadas = document.getElementById('tareas-realizadas');
generar_template();
agregar_eventos_checkbox();
agregar_eventos_li();
document.querySelector("#nueva-tarea button").addEventListener('click', agregar_tarea);

function generar_template(){
    div_tareas.innerHTML = "";
    realizadas = 0;

    for(tarea of lista_tareas){
        id_tarea = lista_tareas.indexOf(tarea);
        div_tareas.innerHTML += `
        <div>
            <span class="span-numero">${tarea.id}</span>
            <span class="span-texto">${tarea.description}</span>
            <span class="span-elemento"><input value="${id_tarea}" type="checkbox"${tarea.completed ? "checked" : ""}></span>
            <span class="span-elemento"><ul><li value="${id_tarea}"><i class="fas fa-trash"></i></li></ul></span>
        </div>
        `;

        if(tarea.completed){
            realizadas++;
        }
    }

    total_tareas.innerHTML = lista_tareas.length;
    tareas_realizadas.innerHTML = realizadas;
}

function cambiar_completado(){    
    tarea = lista_tareas.at(Number(this.value));
    tarea.completed = tarea.completed ? false : true;

    recargar_lista();
}

function eliminar_elemento(){
    if(confirm("Desea eliminar la tarea?")){
        lista_tareas.splice(Number(this.value), 1);

        recargar_lista();
    }
}

function agregar_eventos_checkbox(){
    checkboxes = document.querySelectorAll(".span-elemento input");

    for(checkbox of checkboxes){
        checkbox.addEventListener('change', cambiar_completado);
    }
}

function eliminar_eventos_checkbox(){
    checkboxes = document.querySelectorAll(".span-elemento input");

    for(checkbox of checkboxes){
        checkbox.removeEventListener('change', cambiar_completado);
    }
}

function agregar_eventos_li(){
    list_items = document.querySelectorAll(".span-elemento li");

    for(li of list_items){
        li.addEventListener('click', eliminar_elemento);
    }
}

function eliminar_eventos_li(){
    list_items = document.querySelectorAll(".span-elemento li");

    for(li of list_items){
        li.removeEventListener('click', eliminar_elemento);
    }
}

function get_new_id(){
    contador_id++;

    return contador_id;
}

function agregar_tarea(){
    input_tarea = document.querySelector("#nueva-tarea input");

    if(input_tarea.value == ""){
        alert("Debe ingresar la descripción de la tarea");
    }
    else{    
        lista_tareas.push({ id: get_new_id(), description: input_tarea.value, completed: false });
        input_tarea.value = "";
    }

    recargar_lista();
}

function recargar_lista(){
    generar_template();
    eliminar_eventos_checkbox();
    eliminar_eventos_li();
    agregar_eventos_checkbox();
    agregar_eventos_li();
}