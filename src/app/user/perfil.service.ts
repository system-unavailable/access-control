import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }

  salvar(body) {
    return this.http.post('http://localhost:3000/perfil', body, { headers: {
      'Content-Type': 'application/json'
    }});
  }

  editar(body, id) {
    return this.http.put(`http://localhost:3000/perfil/${id}`, body, { headers: {
      'Content-Type': 'application/json'
    }});
  }

  getPerfis() {
    return this.http.get<any>('http://localhost:3000/perfil');
  }

  delete(id) {
    return this.http.delete<any>(`http://localhost:3000/perfil/${id}`);
  }

  getPerfil(id) {
    return this.http.get<any>(`http://localhost:3000/perfil/${id}`);
  }

}
