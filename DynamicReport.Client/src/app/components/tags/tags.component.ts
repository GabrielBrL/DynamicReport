import { Component } from '@angular/core';
import { FormTypes } from '../../shared/models/formTypes';
import { FormtypesService } from '../../services/form/formtypes.service';
import { Tags } from '../../shared/models/tags';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  Tags: Tags[] = [];
  constructor(private fs: FormtypesService) {
    fs.getAllTags().subscribe(resp => {
      this.Tags = resp;
    });
  }
}
