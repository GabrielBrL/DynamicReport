import { Component } from '@angular/core';
import { FormTypes } from '../../shared/models/formTypes';
import { FormtypesService } from '../../services/form/formtypes.service';
import { Tags } from '../../shared/models/tags';
import { TagService } from '../../services/tag/tag-services.service';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  Tags: Tags[] = [];
  constructor(private tg: TagService) {
    tg.getAllTags().subscribe(resp => {
      this.Tags = resp;
    });
  }
}
