import { Component, ViewEncapsulation } from '@angular/core';
import { FormTypes } from '../../shared/models/formTypes';
import { FormtypesService } from '../../services/form/formtypes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  encapsulation: ViewEncapsulation.None
})
export class FormComponent {
  form: FormTypes | undefined;
  hiddenChooseComponents: boolean = false;
  constructor(private fs: FormtypesService, private route: ActivatedRoute) {
    route.params.subscribe(param => {
      fs.getFormById(param["id"]).subscribe(resp => {
        this.form = resp;
      });
      return this.form;
    })
  }

  showOptionsOfComponents() {
    if (this.hiddenChooseComponents) {
      document.getElementById("listButtonComponents")?.classList.add("hidden-list-options-fields");
      this.hiddenChooseComponents = false;
      return;
    }
    document.getElementById("listButtonComponents")?.classList.remove("hidden-list-options-fields");
    this.hiddenChooseComponents = true;
  }

  appendComponentText() {
    var input = document.createElement("input");
    input.type = "text";
    input.classList.add("input-value");
    var p = document.createElement("p");
    p.classList.add("input-title");
    p.textContent = "Texto";
    var divContent = document.createElement("div");
    divContent.classList.add("field");
    var divMainContent = document.createElement("div");
    divMainContent.id = "line5";

    divContent.appendChild(p);
    divContent.appendChild(input);
    divMainContent.appendChild(divContent);

    var mainListComponents = document.getElementById("listComponents");
    mainListComponents?.appendChild(divMainContent);
  }
}
