import { Component, OnInit } from '@angular/core';
import { FormtypesService } from '../../services/form/formtypes.service';
import { FormTypes } from '../../shared/models/formTypes';
import { SearchComponent } from '../search/search.component';
import { ActivatedRoute } from '@angular/router';
import { TagsComponent } from '../tags/tags.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, TagsComponent, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  formTypes: FormTypes[] = [];
  searchItem: string = '';
  constructor(private router: ActivatedRoute, private fs: FormtypesService) { }

  ngOnInit(): void {
    this.cData();
  }

  private cData() {
    this.router.params.subscribe(params => {
      this.searchItem = params['searchItem'];
      if (params['searchItem']) {
        this.fs.getFormByName(params['searchItem']).subscribe(resp => {
          this.formTypes = resp;
        });
        return this.formTypes;
      }
      if (params['tags']) {
        this.fs.getAllFormsByTag(params['tags']).subscribe(resp => {
          this.formTypes = resp;
        });
        return this.formTypes;
      }
      this.fs.getAll().subscribe(resp => {
        this.formTypes = resp;
      });
      return this.formTypes;
    });
  }

  removeForm(id: Number) {
    this.fs.removeForm(id).subscribe(
      result => {
        this.cData();
      },
      erro => {
        console.log(erro);
      });;
  }
}
