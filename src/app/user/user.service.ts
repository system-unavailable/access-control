import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  salvar(body) {
    return this.http.post('http://localhost:3000/usuario', body, { headers: {
      'Content-Type': 'application/json'
    }});
  }

  getUsuarios() {
    return this.http.get<any>('http://localhost:3000/usuario');
  }

  editar(body, id) {
    return this.http.put(`http://localhost:3000/usuario/${id}`, body, { headers: {
      'Content-Type': 'application/json'
    }});
  }

  delete(id) {
    return this.http.delete<any>(`http://localhost:3000/usuario/${id}`);
  }

  getUsuario(id) {
    return this.http.get<any>(`http://localhost:3000/usuario/${id}`);
  }

}
