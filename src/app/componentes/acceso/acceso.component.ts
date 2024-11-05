import { NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Acceso } from '../../model/acceso';
import { AccesoService } from '../../service/acceso.service';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acceso',
  standalone: true,
  imports: [TableModule,ButtonModule,ButtonGroupModule,DialogModule,InputTextModule,ReactiveFormsModule,NgIf,NgForOf],
  templateUrl: './acceso.component.html',
  styleUrl: './acceso.component.css'
})
export class AccesoComponent {
  accesos:Acceso[]= [];
  visible: boolean = false;
  formAcceso:FormGroup = new FormGroup({});
  isUpdate:boolean = false;


  constructor(
    private accesoService:AccesoService,
    private messageService:MessageService
  ){}

  ngOnInit():void{
    this.getAllAccesos();
    this.formAcceso = new FormGroup({
      idAcceso: new FormControl(''),
      titulo:new FormControl(''),
      icono:new FormControl(''),
      url:new FormControl(''),
      estado:new FormControl(''),
    });
  }

  getAllAccesos(){
    this.accesoService.getAccesos().subscribe((data)=>{
      this.accesos=data;
      console.log(this.accesos);
    });
  }

  showDialog() {
    this.visible = true;
    this.isUpdate=false;
}

  resetFormProducto(){
    this.formAcceso.reset();
  }

  selectAcceso(acceso: any){
    this.isUpdate=true;
    this.visible = true;
    this.formAcceso.controls['idAcceso'].setValue(acceso.idAcceso);
    this.formAcceso.controls['titulo'].setValue(acceso.titulo);
    this.formAcceso.controls['icono'].setValue(acceso.icono);
    this.formAcceso.controls['url'].setValue(acceso.url);
    this.formAcceso.controls['estado'].setValue(acceso.estado);
  }

  CrearAcceso() {    
    this.accesoService.crearAcceso(this.formAcceso.value).subscribe({
      next: (resp) => {
        if (resp) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#fff', 
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
            customClass: {
              popup: 'custom-toast-popup'
            }
          });
          Toast.fire({
            icon: 'success',
            title: 'Acceso creado'
          });
          this.getAllAccesos();
          this.formAcceso.reset();
          this.visible=false;
        }
      },
      error: (err) => {
        console.error('Error creando el acceso', err);
      }
    }
    );
  }

  actualizarAcceso() {
    const acceso = this.formAcceso.value;
    if (!acceso.idAcceso) {
      this.visible=false;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El acceso no tiene un ID válido para actualizar.',
        background: '#fff',
        customClass: {
          popup: 'custom-toast-popup'
        }
      });
      return;
    }
  
    this.accesoService.editarAcceso(acceso).subscribe({
      next: (resp) => {
        if (resp) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#fff',
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
            customClass: {
              popup: 'custom-toast-popup'
            }
          });
          
          Toast.fire({
            icon: 'success',
            title: 'Producto actualizado'
          });
          this.getAllAccesos();
          this.formAcceso.reset();
          this.visible=false;
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: 'Ocurrió un error al intentar actualizar el acceso. Intenta de nuevo más tarde.',
          background: '#fff',
          customClass: {
            popup: 'custom-toast-popup'
          }
        });
        console.error('Error al actualizar el acceso:', err);
      }
    });
  }

  eliminarAcceso(idAcceso: any){
    Swal.fire({
      title: "¿Estás seguro de borrar este acceso?",
      text: "¡No serás capaz de reveritrlo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#19e212",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Borrado!",
          text: "El dato ha sido borrado",
          icon: "success"
        });
        this.accesoService.deleteAcceso(idAcceso).subscribe(resp=>{this.getAllAccesos();});
      }
    });
  }
}
