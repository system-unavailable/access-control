import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PerfilService } from 'app/user/perfil.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;

  constructor(private service: PerfilService, private router: Router, private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.createForm();
    if (this.isEdit) {
      const perfil = await this.service.getPerfil(this.id).toPromise()
      this.form.get('descricao').setValue(perfil.descricao);
    }
  }

  async createForm() {
    this.form = new FormGroup({
      descricao: new FormControl(null, Validators.required)
    })

  }

  salvar() {
    if (this.form.valid) {
      if (this.isEdit) {
        this.service.editar(this.form.value, this.id).subscribe(() => {
          this.showNotification();
          this.router.navigate(['perfis']);
        });
      } else {
        this.service.salvar(this.form.value).subscribe(() => {
          this.showNotification();
          this.router.navigate(['perfis']);
        });
      }
    } else {
      this.markControls();
    }
  }

  valid(control) {
    const fc = this.form.get(control);
    return (fc.touched || fc.dirty) && fc.invalid;
  }

  showNotification() {
    $.notify({
      message: "Registro salvo com sucesso"
    }, {
      type: 'success',
      timer: 1000,
      placement: {
        from: 'top',
        align: 'right'
      }
    });
  }

  markControls() {
    Object.keys(this.form.controls).forEach(it => this.form.get(it).markAsTouched());
  }

  get isEdit() {
    return !!this.activatedRoute.snapshot.params['id'];
  }

  get id() {
    return this.activatedRoute.snapshot.params['id'];
  }

}
