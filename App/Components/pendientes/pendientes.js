export class Pendientes extends HTMLElement{
    constructor(){
        super();
        this.rendder();
    }
    rendder(){
        this.innerHTML = /*html*/`
        <div class="containerPendientes">
        `;
        
    }
}