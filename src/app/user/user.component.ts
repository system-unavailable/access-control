import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PerfilService } from './perfil.service';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  form: FormGroup;
  perfis: any[];

  constructor(private service: UserService,
    private router: Router,
    private perfilService: PerfilService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.createForm();
    this.carregarPerfis();
    if (this.isEdit) {
      const usuario = await this.service.getUsuario(this.id).toPromise()
      Object.keys(usuario).forEach(it => {
        if (this.form.get(it)) {
          this.form.get(it).setValue(usuario[it]);
        }
      });
      this.form.get('perfil').setValue(usuario.perfil ? usuario.perfil.id : null);
    }
  }

  createForm() {
    this.form = new FormGroup({
      nome: new FormControl(null, Validators.required),
      sobrenome: new FormControl(null, Validators.required),
      endereco: new FormControl(null, Validators.required),
      email: new FormControl(),
      cidade: new FormControl(),
      perfil: new FormControl()
    });
  }

  async carregarPerfis() {
    this.perfis = await this.perfilService.getPerfis().toPromise();
  }

  salvar() {
    if (this.form.valid) {
      const { perfil } = this.form.value;
      const obj = { ...this.form.value, perfil: this.perfis.find(it => it.id == perfil) }
      if (this.isEdit) {
        this.service.editar(obj, this.id).subscribe(() => {
          this.showNotification();
          this.router.navigate(['users']);
        });
      } else {
        this.service.salvar(obj).subscribe(() => {
          this.showNotification();
          this.router.navigate(['user']);
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

  markControls() {
    Object.keys(this.form.controls).forEach(it => this.form.get(it).markAsTouched());
  }

  get emailError() {
    return this.valid('email') && this.form.get('email').hasError('email');
  }

  showNotification() {
    $.notify({
      icon: "pe-7s-gift",
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

  get isEdit() {
    return !!this.activatedRoute.snapshot.params['id'];
  }

  get id() {
    return this.activatedRoute.snapshot.params['id'];
  }

}
