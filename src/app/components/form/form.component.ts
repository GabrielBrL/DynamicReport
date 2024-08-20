import { Component } from '@angular/core';
import { FormTypes } from '../../shared/models/formTypes';
import { FormtypesService } from '../../services/form/formtypes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  form: FormTypes | undefined;
  constructor(private fs: FormtypesService, private route: ActivatedRoute) {
    route.params.subscribe(param => {
      fs.getFormById(param["id"]).subscribe(resp => {
        this.form = resp;
      });
      return this.form;
    })
  }
}
