const URL = "http://localhost:3000/tareas";

const cabecera = new Headers({
    "Content-Type": "application/json"
})

async function getData(){
    const data = await fetch(`${URL}`);
    let dataJson = await data.json();
    return dataJson
}

async function getDataId(id){
    const data = await fetch(`${URL}/${id}`);
    let dataJson = await data.json();
    return dataJson
}


function postData(inputsForm){
    fetch(`${URL}`, {
        method: "POST",
        headers: cabecera,
        body: JSON.stringify(inputsForm)
    })
    .catch(error => console.log(error));
}

function putData(tareaAEnviar, id){
    fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: cabecera,
        body: JSON.stringify(tareaAEnviar)
    })
    .catch(error => console.log(error));
}



export{getData, postData, getDataId, putData}
