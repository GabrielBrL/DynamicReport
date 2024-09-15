import { Component, ViewEncapsulation } from '@angular/core';
import { FormtypesService } from '../../../services/form/formtypes.service';
import { FormComponent } from "../form.component";
import { FormTypes } from '../../../shared/models/formTypes';
import { ConfirmsaveComponent } from "./confirmsave/confirmsave.component";

@Component({
  selector: 'app-createform',
  standalone: true,
  imports: [FormComponent, ConfirmsaveComponent],
  templateUrl: './createform.component.html',
  styleUrl: './createform.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CreateformComponent {
  constructor(private fs: FormtypesService) {
  }
  ngOnInit() {
    var p = document.createElement("p");
    p.textContent = "Salvar";

    var button = document.createElement("button");
    button.classList.add("button-save-component");
    button.addEventListener("click", (e) => {
      var form = new FormTypes(0, "teste", "teste");
      this.fs.createForm(form).subscribe(form => console.log(form), erro => {
        console.log("Erro " + erro);
      });
    });

    button.appendChild(p);

    var mainDiv = document.createElement("div");
    mainDiv.style.display = "flex";
    mainDiv.style.justifyContent = "end";
    mainDiv.appendChild(button);

    var content = document.getElementById("container-add-component");
    if (content) {
      content.appendChild(mainDiv);
    }
  }
}