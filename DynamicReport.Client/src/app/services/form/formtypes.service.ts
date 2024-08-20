import { Injectable } from '@angular/core';
import { FormTypes } from '../../shared/models/formTypes';
import { Tags } from '../../shared/models/tags';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormtypesService {
  baseAddress: string = "http://localhost:5169";
  response: FormTypes[] = [];
  constructor(private http: HttpClient) { }

  getFormById(id: number): Observable<FormTypes> {
    return this.http.get<FormTypes>(`${this.baseAddress}/api/Form/id/${id}`).pipe(map(form => new FormTypes(form.id, form.name, form.tags)));
  }

  getFormByName(name: string): Observable<FormTypes[]> {
    return this.http.get<FormTypes[]>(`${this.baseAddress}/api/Form/name/${name}`).pipe(map(forms => forms.map(x => new FormTypes(x.id, x.name, x.tags))));
  }

  getAllFormsByTag(tag: string): Observable<FormTypes[]> {
    if (tag == 'All')
      return this.getAll();
    return this.http.get<FormTypes[]>(`${this.baseAddress}/api/Form/tag/${tag}`).pipe(map(forms => forms.map(x => new FormTypes(x.id, x.name, x.tags))));
  }

  getAllTags(): Observable<Tags[]> {
    return this.http.get<Tags[]>(`${this.baseAddress}/api/Form/tags`).pipe(map(forms => forms.map(x => new Tags(x.name, x.qtd))));
  }

  getAll(): Observable<FormTypes[]> {
    return this.http.get<FormTypes[]>(`${this.baseAddress}/api/Form/all`).pipe(map(forms => forms.map(x => new FormTypes(x.id, x.name, x.tags))));
  }
}
