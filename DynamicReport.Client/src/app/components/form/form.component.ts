import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormTypes } from '../../shared/models/formTypes';
import { FormtypesService } from '../../services/form/formtypes.service';
import { ActivatedRoute } from '@angular/router';
import { PdfService } from '../../utility/form/PdfService';
import { PopupSelectItemsComponent } from "./popup-select-items/popup-select-items.component";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [PopupSelectItemsComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  encapsulation: ViewEncapsulation.None
})
export class FormComponent {
  form: FormTypes | undefined;
  hiddenChooseComponents: boolean = false;
  classPopupSelecItems: string = "hide-content-popup-selecteditems";
  elementToAddOption: HTMLElement | undefined;
  constructor(private fs: FormtypesService, private route: ActivatedRoute, private pdfUtil: PdfService) {
    route.params.subscribe(param => {
      if (param["id"]) {
        fs.getFormById(param["id"]).subscribe(resp => {
          this.form = resp;
          var mainHtml = document.getElementById("listComponents");
          if (mainHtml) {
            mainHtml.innerHTML = resp.innerHtml;
          }
          this.reAddEvents();
        });
        return this.form;
      }
      return null;
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
    input.readOnly = true;
    var inputLabelEdit = this.EditLabels();
    var p = document.createElement("p");
    p.classList.add("input-title");
    p.id = `p-label${this.countElementsFromMainList()}`;
    p.textContent = "Texto";
    p.addEventListener("dblclick", this.changeName);
    var divContent = document.createElement("div");
    divContent.classList.add("field");
    var divMainContent = document.createElement("div");
    divMainContent.id = `line-text${this.countElementsFromMainList()}`;

    var divLabelInput = document.createElement("div");
    divLabelInput.appendChild(p);
    divLabelInput.appendChild(inputLabelEdit);

    divContent.appendChild(divLabelInput);
    divContent.appendChild(input);
    divMainContent.appendChild(divContent);

    var mainListComponents = document.getElementById("listComponents");
    mainListComponents?.appendChild(divMainContent);
  }
  appendComponentRadio() {
    let numRadio = this.countElementsFromMainList();

    var divInputRadio = document.createElement("div");
    divInputRadio.classList.add("input-radio");

    var buttonAddOptionSelect = document.createElement("button");
    buttonAddOptionSelect.textContent = "Adicionar";
    buttonAddOptionSelect.classList.add("button-add-select-option");
    buttonAddOptionSelect.addEventListener("click", (e) => {
      this.AddOptionOnSelect(divInputRadio);
    });
    buttonAddOptionSelect.style.top = "1rem";
    buttonAddOptionSelect.style.position = "relative";

    var pTitle = document.createElement("p");
    pTitle.classList.add("input-title");
    pTitle.textContent = "Escolha";
    pTitle.id = `p-label${this.countElementsFromMainList()}`;
    pTitle.addEventListener("dblclick", this.changeName);

    var inputLabelEdit = this.EditLabels();

    var divContent = document.createElement("div");
    divContent.classList.add("field");
    var divMainContent = document.createElement("div");
    divMainContent.id = `line-radio${numRadio}`;

    var divLabelInput = document.createElement("div");
    divLabelInput.appendChild(pTitle);
    divLabelInput.appendChild(inputLabelEdit);

    divContent.appendChild(divLabelInput);
    divContent.appendChild(divInputRadio);
    divContent.appendChild(buttonAddOptionSelect);
    divMainContent.appendChild(divContent);

    var mainListComponents = document.getElementById("listComponents");
    mainListComponents?.appendChild(divMainContent);
  }
  appendComponentCheckBox() {
    var divInputRadio = document.createElement("div");
    divInputRadio.classList.add("input-checkbox");

    var buttonAddOptionSelect = document.createElement("button");
    buttonAddOptionSelect.textContent = "Adicionar";
    buttonAddOptionSelect.classList.add("button-add-select-option");
    buttonAddOptionSelect.addEventListener("click", (e) => {
      this.AddOptionOnSelect(divInputRadio);
    });
    buttonAddOptionSelect.style.top = "1rem";
    buttonAddOptionSelect.style.position = "relative";

    var inputLabelEdit = this.EditLabels();

    var pTitle = document.createElement("p");
    pTitle.addEventListener("dblclick", this.changeName);
    pTitle.classList.add("input-title");
    pTitle.id = `p-label${this.countElementsFromMainList()}`;
    pTitle.textContent = "Escolhas";

    var divContent = document.createElement("div");
    divContent.classList.add("field");
    var divMainContent = document.createElement("div");
    divMainContent.id = `line-checkbox${this.countElementsFromMainList()}`;

    var divLabelInput = document.createElement("div");
    divLabelInput.appendChild(pTitle);
    divLabelInput.appendChild(inputLabelEdit);

    divContent.appendChild(divLabelInput);
    divContent.appendChild(divInputRadio);
    divContent.appendChild(buttonAddOptionSelect);

    divMainContent.appendChild(divContent);

    var mainListComponents = document.getElementById("listComponents");
    mainListComponents?.appendChild(divMainContent);
  }
  appendComponentSelect() {
    var select = document.createElement("select");
    select.style.width = "15rem";

    var divContent = document.createElement("div");
    divContent.classList.add("select");

    var divAddSelect = document.createElement("div");
    divAddSelect.classList.add("div-add-select-options");

    var buttonAddOptionSelect = document.createElement("button");
    buttonAddOptionSelect.textContent = "Adicionar";
    buttonAddOptionSelect.classList.add("button-add-select-option");
    buttonAddOptionSelect.addEventListener("click", (e) => {
      this.AddOptionOnSelect(select);
    });

    divAddSelect.appendChild(select);
    divAddSelect.appendChild(buttonAddOptionSelect);

    divContent.appendChild(divAddSelect);

    var pTitle = document.createElement("p");
    pTitle.id = `p-label${this.countElementsFromMainList()}`;
    pTitle.addEventListener("dblclick", this.changeName);
    pTitle.classList.add("input-title");
    pTitle.textContent = "Seleção";

    var divField = document.createElement("div");
    divField.classList.add("field");

    var inputLabelEdit = this.EditLabels();

    var divLabelInput = document.createElement("div");
    divLabelInput.appendChild(pTitle);
    divLabelInput.appendChild(inputLabelEdit);

    divField.appendChild(divLabelInput);
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
  private EditLabels() {
    var inputLabelEdit = document.createElement("input");
    inputLabelEdit.type = "text";
    inputLabelEdit.id = `input-label${this.countElementsFromMainList()}`;
    inputLabelEdit.classList.add("input-label");
    inputLabelEdit.style.display = "none";
    inputLabelEdit.addEventListener("keypress", (e) => {
      if (e.key == "Enter") {
        setSaveLabel();
      }
      function setSaveLabel() {
        const divEdit = inputLabelEdit.parentElement?.children;
        const idParagraph = divEdit?.item(0);
        var element = document.getElementById(String(idParagraph?.id));
        if (element instanceof HTMLParagraphElement) {
          element.textContent = inputLabelEdit.value ? inputLabelEdit.value : element.textContent;
          element.style.display = "";
          inputLabelEdit.style.display = "none";
        }
      }
    }
    );
    return inputLabelEdit;
  }
  async exportPdf() {
    const pdfBytes = await this.pdfUtil.createPdf(document.getElementById("listComponents"));
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Cria uma URL para o Blob
    const url = URL.createObjectURL(blob);

    // Abre o PDF em uma nova aba do navegador
    window.open(url);
  }
  changeName(this: HTMLParagraphElement) {
    const divEdit = this.parentElement?.children;
    const idInput = divEdit?.item(1);
    var element = document.getElementById(String(idInput?.id));
    if (element instanceof HTMLInputElement) {
      element.value = String(this.textContent);
      element.style.display = "";
      this.style.display = "none";
      element.focus();
    }
  }
  changeLabel(this: HTMLInputElement) {
    const divEdit = this.parentElement?.children;
    const idParagraph = divEdit?.item(0);
    var element = document.getElementById(String(idParagraph?.id));
    if (element instanceof HTMLParagraphElement) {
      element.textContent = this.value ? this.value : element.textContent;
      element.style.display = "";
      this.style.display = "none";
    }
  }
  AddOptionOnSelect(element: HTMLElement = document.createElement("a")) {
    this.classPopupSelecItems = this.classPopupSelecItems === "content-popup-selecteditems" ? "hide-content-popup-selecteditems" : "content-popup-selecteditems";
    this.elementToAddOption = element;
  }
  reAddEvents() {
    var btns = document.getElementsByClassName("button-add-select-option");
    if (btns) {
      for (let index = 0; index < btns.length; index++) {
        const element = btns[index];
        switch (element.parentElement?.children.length) {
          case 2:
            var select = element.parentElement?.children[0];
            var button = element.parentElement?.children[1];            
            button.addEventListener("click", (e) => {
              if (select instanceof HTMLElement)
                this.AddOptionOnSelect(select);
            });
            break
          case 3:
            var div = element.parentElement?.children[1];
            var button = element.parentElement?.children[2];
            console.log(div);
            button.addEventListener("click", (e) => {
              if (div instanceof HTMLElement)
                this.AddOptionOnSelect(div);
            });
            break;
          default:
            break;
        }
      }
    }
  }
}

