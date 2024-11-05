import { Routes } from '@angular/router';
import { AccesoComponent } from './componentes/acceso/acceso.component';

export const routes: Routes = [
    {
        path:'',
        component:AccesoComponent,
        title:'Página Inicio'
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
    }
];
