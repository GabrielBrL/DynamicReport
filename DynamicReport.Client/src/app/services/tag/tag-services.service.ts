import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Tags } from '../../shared/models/tags';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  baseAddress: string = "http://localhost:5169";
  constructor(private http: HttpClient) { }

  getAllTags(): Observable<Tags[]> {
    return this.http.get<Tags[]>(`${this.baseAddress}/api/Tag`).pipe(map(forms => forms.map(x => new Tags(x.id, x.name, x.qtd))));
  }

}
