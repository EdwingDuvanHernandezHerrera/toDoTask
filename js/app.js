import { getData } from "../Apis/api.js";
import { postData } from "../Apis/api.js";
import { getDataId } from "../Apis/api.js";
import { putData } from "../Apis/api.js";

const containerPend = document.querySelector(".containerPendientes");
const containerCump = document.querySelector(".containerCumplidas");
const containerFall = document.querySelector(".containerFallidas");

document.addEventListener('DOMContentLoaded', async (e) => {
    let tareas = await getData();
    await mostrarDatos(containerPend, "Pendiente", tareas);
    await mostrarDatos(containerCump, "Cumplida", tareas);
    await mostrarDatos(containerFall, "Fallida", tareas);
    console.log(tareas);
});


const FORM = document.getElementById("formulario");

FORM.addEventListener("submit", obtenerForm);

function obtenerForm(submit){
    submit.preventDefault();
    let datosForm = new FormData(FORM);
    let inputsForm = Object.fromEntries(datosForm);
    postData(inputsForm);
    console.log(inputsForm);
}

async function mostrarDatos(padre, estado, tareas){
    
    let tareasFiltradas = tareas.filter(dato => dato.estado === estado);
    tareasFiltradas.forEach(element => {
        padre.innerHTML += /*html*/`
        <div class="card">
        <div class="headerCard">
            <h3>${element.prioridad}</h3>
        </div>
        <div class="bodyCard">
            <p>${element.tarea}</p>
            <p>${element.responsable}</p>
        </div>
        <div class="padreFechas">
            <div>
                <p>Inicio</p>
                <p>${element.dateStart}</p>
            </div>
            <div>
                <p>Fin</p>
                <p>${element.dateEnd}</p>
            </div>                
        </div>
        <div class="footerCard">
            <i class='bx bxs-check-square cumplida' id="${element.id}"></i>
            <i class='bx bxs-x-square fallida' id="${element.id}"></i>
        </div>
    </div>`
    });
}

containerPend.addEventListener("click", escucharClick);

 async function escucharClick(event){
    if(event.target.classList.contains("cumplida")){
        let idCumplida = event.target.id;
        let tareaACumplir = await obtenerDataId(idCumplida);
        tareaACumplir.estado = "Cumplida";
        putData(tareaACumplir , idCumplida);
        

    }
    else if (event.target.classList.contains("fallida")){
        let idFallida = event.target.id;
        let tareaAFallar = await obtenerDataId(idFallida);
        tareaAFallar.estado = "Fallida";
        putData(tareaAFallar , idFallida);        
    }
}

async function obtenerDataId(id){
    let tareaEditar =  await getDataId(id);
    return tareaEditar
}



