import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../perfil.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  tableData: any;
  id: any;

  constructor(private service: UserService, private router: Router) { }

  async ngOnInit() {
    const dataRows = await this.service.getUsuarios().toPromise();
    this.tableData = {
      headerRow: ['ID', 'Nome', 'Sobrenome', 'Endereço', 'E-mail', 'Cidade', 'Perfil'],
      dataRows
    };
  }

  excluir() {
    this.service.delete(this.id).subscribe(() => {
      const index = this.tableData.dataRows.findIndex(it => it.id == this.id);
      this.tableData.dataRows.splice(index, 1);
      $('#exampleModalCenter').modal('hide');
      this.showNotification();
    });
  }

  edit(id) {
    this.router.navigate(['user', id]);
  }

  incluir() {
    this.router.navigate(['user']);
  }

  showNotification() {
    $.notify({
      message: "Registro excluído com sucesso"
    }, {
      type: 'success',
      timer: 1000,
      placement: {
        from: 'top',
        align: 'right'
      }
    });
  }

  abrirModal(id: any): void {
    this.id = id;
    $('#exampleModalCenter').modal('show');
  }

}
