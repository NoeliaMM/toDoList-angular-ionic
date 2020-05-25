import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model'

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  listas:Lista[]=[];
  
  constructor() { 
    this.cargarStorage();

    // const lista1=new Lista('Comprar en supermercado')
    // const lista2=new Lista('Tareas trabajo')

    // this.listas.push(lista1,lista2);
  

  }

  crearLista(titulo:string){
 
    const nuevaLista=new Lista(titulo);
    this.listas.push(nuevaLista);

    this.guardarStorage();

    return nuevaLista.id

  }

  getLista(id:string | number){
      id=Number(id);

      return this.listas.find (listaData=>{
        return listaData.id===id
      })
  }

  guardarStorage(){
    localStorage.setItem('data',JSON.stringify(this.listas));
  }


  cargarStorage(){
    if(localStorage.getItem('data')){
      this.listas=JSON.parse(localStorage.getItem('data'))
    }else{
      this.listas=[]
    }
 

  }

  borrarLista(lista:Lista){    

    // this.listas = this.listas.filter( listaData => listaData.id !== lista.id );

    // console.log(this.listas);

    // this.guardarStorage();  
    
    const index = this.listas.indexOf(lista); 
    this.listas.splice(index,1);
    this.guardarStorage();

  }

}
