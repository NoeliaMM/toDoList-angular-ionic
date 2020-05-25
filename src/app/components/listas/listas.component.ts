import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList) lista:IonList;
  @Input() terminada=true;

  tareas:any[]=[]

  constructor( public tareasService:TareasService,
    private router: Router,
    public alertController: AlertController) {

    this.tareas=tareasService.listas

    console.log(this.tareas)
  }

  ngOnInit() {}

  
  listaSeleccionada(lista:Lista){   
    
    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/add/${ lista.id }`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/add/${ lista.id }`);
    }    

  }

  borrarLista(lista:Lista){
    this.tareasService.borrarLista(lista);  
    this.lista.closeSlidingItems();   
  }

  async editarLista( lista:Lista){
  
    const alert = await this.alertController.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value : lista.titulo,
          placeholder: 'Nombre de la lista'
        },
      ],       
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.lista.closeSlidingItems();  
          }
        }
        , {
          text: 'Actualizar',
          handler: (data) => {

            if(data.titulo.length===0){
              return;
        }   

            lista.titulo=data.titulo;  
            this.tareasService.guardarStorage();
            this.lista.closeSlidingItems();        
         }
        }
      ]
    });

    alert.present();
}

}
