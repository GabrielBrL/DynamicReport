import { Component, ViewEncapsulation } from '@angular/core';
import { FormTypes } from '../../shared/models/formTypes';
import { FormtypesService } from '../../services/form/formtypes.service';
import { ActivatedRoute } from '@angular/router';
import { PdfService } from '../../utility/form/PdfService';

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
  constructor(private fs: FormtypesService, private route: ActivatedRoute, private pdfUtil: PdfService) {
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
    divMainContent.id = `line-text${this.countElementsFromMainList()}`;

    divContent.appendChild(p);
    divContent.appendChild(input);
    divMainContent.appendChild(divContent);

    var mainListComponents = document.getElementById("listComponents");
    mainListComponents?.appendChild(divMainContent);
  }

  appendComponentRadio() {
    let numRadio = this.countElementsFromMainList();

    var input = document.createElement("input");
    input.type = "radio";
    input.classList.add("input-radio-unique");
    input.name = `radio${numRadio}`;
    var p = document.createElement("p");
    p.textContent = "Texto";
    var divRadioValues = document.createElement("div");
    divRadioValues.classList.add("input-radio-values");
    divRadioValues.appendChild(p);
    divRadioValues.appendChild(input);

    var divInputRadio = document.createElement("div");
    divInputRadio.classList.add("input-radio");

    divInputRadio.appendChild(divRadioValues);

    input = document.createElement("input");
    input.type = "radio";
    input.name = `radio${numRadio}`;
    input.classList.add("input-radio-unique");
    p = document.createElement("p");
    p.textContent = "Texto";
    divRadioValues = document.createElement("div");
    divRadioValues.classList.add("input-radio-values");
    divRadioValues.appendChild(p);
    divRadioValues.appendChild(input);

    divInputRadio.appendChild(divRadioValues);

    var pTitle = document.createElement("p");
    pTitle.classList.add("input-title");
    pTitle.textContent = "Escolha";

    var divContent = document.createElement("div");
    divContent.classList.add("field");
    var divMainContent = document.createElement("div");
    divMainContent.id = `line-radio${numRadio}`;

    divContent.appendChild(pTitle);
    divContent.appendChild(divInputRadio);
    divMainContent.appendChild(divContent);

    var mainListComponents = document.getElementById("listComponents");
    mainListComponents?.appendChild(divMainContent);
  }

  appendComponentCheckBox() {
    var input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("input-checks");
    var p = document.createElement("p");
    p.textContent = "Texto";
    var divRadioValues = document.createElement("div");
    divRadioValues.classList.add("input-radio-values");
    divRadioValues.appendChild(p);
    divRadioValues.appendChild(input);

    var divInputRadio = document.createElement("div");
    divInputRadio.classList.add("input-radio");

    divInputRadio.appendChild(divRadioValues);
    //#region create checkboxes    
    input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("input-checks");
    p = document.createElement("p");
    p.textContent = "Texto";
    divRadioValues = document.createElement("div");
    divRadioValues.classList.add("input-radio-values");
    divRadioValues.appendChild(p);
    divRadioValues.appendChild(input);

    divInputRadio.appendChild(divRadioValues);

    input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("input-checks");
    p = document.createElement("p");
    p.textContent = "Texto";
    divRadioValues = document.createElement("div");
    divRadioValues.classList.add("input-radio-values");
    divRadioValues.appendChild(p);
    divRadioValues.appendChild(input);

    divInputRadio.appendChild(divRadioValues);

    input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("input-checks");
    p = document.createElement("p");
    p.textContent = "Texto";
    divRadioValues = document.createElement("div");
    divRadioValues.classList.add("input-radio-values");
    divRadioValues.appendChild(p);
    divRadioValues.appendChild(input);

    divInputRadio.appendChild(divRadioValues);
    //#endregion

    var pTitle = document.createElement("p");
    pTitle.classList.add("input-title");
    pTitle.textContent = "Escolhas";

    var divContent = document.createElement("div");
    divContent.classList.add("field");
    var divMainContent = document.createElement("div");
    divMainContent.id = `line-checkbox${this.countElementsFromMainList()}`;

    divContent.appendChild(pTitle);
    divContent.appendChild(divInputRadio);
    divMainContent.appendChild(divContent);

    var mainListComponents = document.getElementById("listComponents");
    mainListComponents?.appendChild(divMainContent);
  }

  appendComponentSelect() {
    var select = document.createElement("select");
    var option = document.createElement("option");
    option.textContent = "Opção 1";

    select.append(option);

    var p = document.createElement("p");
    p.textContent = "Opções";

    var divContent = document.createElement("div");
    divContent.classList.add("select");

    divContent.appendChild(p);
    divContent.appendChild(select);

    var pTitle = document.createElement("p");
    pTitle.classList.add("input-title");
    pTitle.textContent = "Seleção";

    var divField = document.createElement("div");
    divField.classList.add("field");

    divField.appendChild(pTitle);
    divField.appendChild(divContent);

    var divMainContent = document.createElement("div");
    divMainContent.id = `line-select${this.countElementsFromMainList()}`;
    divMainContent.appendChild(divField);

    var mainListComponents = document.getElementById("listComponents");
    mainListComponents?.appendChild(divMainContent);
  }

  countElementsFromMainList(): number {
    var listMain = document.getElementById("listComponents");
    let count = listMain?.childNodes.length;
    return !count ? 0 : Number(count) + 1;
  }

  async exportPdf() {
    const pdfBytes = await this.pdfUtil.createPdf(document.getElementById("listComponents"));
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Cria uma URL para o Blob
    const url = URL.createObjectURL(blob);

    // Abre o PDF em uma nova aba do navegador
    window.open(url);
  }
}

// <div class="field">
//     <p class="input-title">
//         Seleção
//     </p>
//     <div class="select">
//         <p>Opções</p>
//         <select>
//             <option>Opção 1</option>
//             <option>Opção 2</option>
//             <option>Opção 3</option>
//             <option>Opção 4</option>
//         </select>
//     </div>
// </div>