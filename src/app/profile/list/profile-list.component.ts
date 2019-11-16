import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'app/user/perfil.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {

  tableData: any;

  constructor(private service: PerfilService, private router: Router) { }

  async ngOnInit() {
    const dataRows = await this.service.getPerfis().toPromise();
    this.tableData = {
      headerRow: ['ID', 'Descrição'],
      dataRows
    };
  }

  excluir(id) {
    this.service.delete(id).subscribe(() => {
      const index = this.tableData.dataRows.findIndex(it => it.id == id);
      this.tableData.dataRows.splice(index, 1);
      this.showNotification();
    });
  }

  edit(id) {
    this.router.navigate(['perfil', id]);
  }

  incluir() {
    this.router.navigate(['perfil']);
  }

  showNotification() {
    $.notify({
      message: "Registro excluído com sucesso"
    }, {
      type: 'danger',
      timer: 1000,
      placement: {
        from: 'top',
        align: 'right'
      }
    });
  }


}
