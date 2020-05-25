import { Component } from '@angular/core';
import {TareasService} from '../../services/tareas.service'
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from '../../models/lista.model';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  tareas: any[]=[];
  lista:Lista;

  constructor( public tareasService:TareasService ,
    private router:Router,
    public alertController: AlertController) {

    // this.tareas=tareasService.listas

    // console.log(this.tareas)
  }

  async addTarea(){
    // this.router.navigateByUrl('/tabs/tab1/add');

      const alert = await this.alertController.create({
        header: 'Nueva lista',
        inputs: [
          {
            name: 'titulo',
            type: 'text',
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
            }
          }, {
            text: 'Crear',
            handler: (data) => {

              if(data.titulo.length===0){
                    return;
              }             
              const listaId= this.tareasService.crearLista(data.titulo);

              this.router.navigateByUrl(`/tabs/tab1/add/${ listaId }`);
            }
          }
        ]
      });

      alert.present();
  }


}
