export class Acceso {
    idAcceso:number;
    titulo:string;
    icono:string;
    url:string;
    estado:string;

    constructor(idAcceso:number, titulo:string, icono:string, url:string, estado:string){
        this.idAcceso = idAcceso;
        this.titulo = titulo;
        this.icono = icono;
        this.url = url;
        this.estado = estado;
    }
    
}
