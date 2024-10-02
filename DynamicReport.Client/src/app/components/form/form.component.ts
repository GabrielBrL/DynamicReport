import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormTypes } from '../../shared/models/formTypes';
import { FormtypesService } from '../../services/form/formtypes.service';
import { ActivatedRoute } from '@angular/router';
import { PdfService } from '../../utility/form/PdfService';
import { PopupSelectItemsComponent } from "./popup-select-items/popup-select-items.component";
import { ConfirmsaveComponent } from './createform/confirmsave/confirmsave.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [PopupSelectItemsComponent, ConfirmsaveComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  encapsulation: ViewEncapsulation.None
})
export class FormComponent {
  form: FormTypes | undefined;
  hiddenChooseComponents: boolean = false;
  classPopupSelecItems: string = "hide-content-popup-selecteditems";
  elementToAddOption: HTMLElement | undefined | null;
  classPopupSaveForm: string = "hide-content-popup-saveform";
  constructor(private fs: FormtypesService, private route: ActivatedRoute, private pdfUtil: PdfService) {
    route.params.subscribe(param => {
      if (param["id"]) {
        fs.getFormById(param["id"]).subscribe(resp => {
          this.form = resp;
          this.reAddEvents();
        });
        return this.form;
      }
      return null;
    });
  }
  ngOnInit() {
    this.route.params.subscribe(param => {
      if (param["id"])
        this.addButtonToUpdate();
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
  appendComponentText(options: HTMLCollection | undefined | null = null) {
    var input = document.createElement("input");
    input.type = "text";
    input.classList.add("input-value");
    input.readOnly = true;
    var inputLabelEdit = this.EditLabels();
    var p = document.createElement("p");
    p.classList.add("input-title");
    p.id = `p-label${this.countElementsFromMainList()}`;
    var newTilte;
    if (options instanceof HTMLCollection)
      newTilte = options[0].children[0].textContent;
    p.textContent = options ? newTilte || "" : "Texto";
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
  appendComponentRadio(title: string | null = null, options: HTMLCollection | undefined | null = null) {
    let numRadio = this.countElementsFromMainList();

    var divInputRadio = document.createElement("div");
    divInputRadio.classList.add("input-radio");

    if (options instanceof HTMLCollection) {
      for (let i = 0; i < options.length; i++) {
        var opt = options[i];
        var newDiv = document.createElement("div");
        newDiv.classList.add("input-radio-values");
        var p = document.createElement("p");
        p.textContent = opt.getElementsByTagName("p")[0].textContent;
        var inputRadio = document.createElement("input");
        inputRadio.classList.add("input-checks");
        inputRadio.type = "radio";
        inputRadio.name = opt.getElementsByTagName("input")[0].name;
        newDiv.appendChild(p);
        newDiv.appendChild(inputRadio);
        divInputRadio.appendChild(newDiv);
      }
    }

    var buttonAddOptionSelect = document.createElement("button");
    buttonAddOptionSelect.textContent = "Adicionar";
    buttonAddOptionSelect.id = `button-add-option${this.countElementsFromMainList()}`;
    buttonAddOptionSelect.classList.add("button-add-select-option");
    buttonAddOptionSelect.addEventListener("click", (e) => {
      this.AddOptionOnSelect(divInputRadio);
    });
    buttonAddOptionSelect.style.top = "1rem";
    buttonAddOptionSelect.style.position = "relative";

    var pTitle = document.createElement("p");
    pTitle.classList.add("input-title");
    pTitle.textContent = title || "Opção";
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
  appendComponentCheckBox(title: string | null = null, options: HTMLCollection | undefined | null = null) {
    var divInputRadio = document.createElement("div");
    divInputRadio.classList.add("input-checkbox");

    if (options instanceof HTMLCollection) {
      for (let i = 0; i < options.length; i++) {
        var opt = options[i];
        var newDiv = document.createElement("div");
        newDiv.classList.add("input-radio-values");
        var p = document.createElement("p");
        p.textContent = opt.getElementsByTagName("p")[0].textContent;
        var inputCheckBox = document.createElement("input");
        inputCheckBox.classList.add("input-checks");
        inputCheckBox.type = "checkbox";
        newDiv.appendChild(p);
        newDiv.appendChild(inputCheckBox);
        divInputRadio.appendChild(newDiv);
      }
    }

    var buttonAddOptionSelect = document.createElement("button");
    buttonAddOptionSelect.textContent = "Adicionar";
    buttonAddOptionSelect.id = `button-add-option${this.countElementsFromMainList()}`;
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
    pTitle.textContent = title || "Opções";

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
  appendComponentSelect(title: string | null = null, options: HTMLCollection | undefined | null = null) {
    var select = document.createElement("select");
    select.style.width = "15rem";
    select.id = `select-options${this.countElementsFromMainList()}`;

    if (options instanceof HTMLCollection) {
      for (let i = 0; i < options.length; i++) {
        var opt = options[i];
        var newOpt = document.createElement("option");
        if (opt instanceof HTMLOptionElement) {
          newOpt.value = opt.value;
          newOpt.textContent = opt.textContent;
        }
        select.appendChild(newOpt);
      }
    }

    var divContent = document.createElement("div");
    divContent.classList.add("select");

    var divAddSelect = document.createElement("div");
    divAddSelect.classList.add("div-add-select-options");

    var buttonAddOptionSelect = document.createElement("button");
    buttonAddOptionSelect.textContent = "Adicionar";
    buttonAddOptionSelect.id = `button-add-option${this.countElementsFromMainList()}`;
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
    pTitle.textContent = title || "Selecionar";

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
    const pdfBytes = await this.pdfUtil.createPdf(String(this.form?.name), document.getElementById("listComponents"));
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
  AddOptionOnSelect(element: HTMLElement | null | undefined = null) {
    this.classPopupSelecItems = this.classPopupSelecItems === "content-popup-selecteditems" ? "hide-content-popup-selecteditems" : "content-popup-selecteditems";
    this.elementToAddOption = element;
  }
  reAddEvents() {
    var divMain = document.createElement("div");
    if (this.form?.innerHtml) {
      divMain.innerHTML = this.form.innerHtml;
    }
    var divs = divMain.getElementsByTagName("div");
    if (divs) {
      for (let index = 0; index < divs.length; index++) {
        const element = divs[index];
        if (element.id.includes("select")) {
          var select = element.getElementsByTagName("select");
          if (select instanceof HTMLCollection) {
            var options = select[0].children;
            this.appendComponentSelect(String(element.getElementsByClassName("input-title")[0].textContent), options);
          }
          continue;
        }
        if (element.id.includes("checkbox")) {
          var inputs = element.getElementsByClassName("input-radio-values");
          this.appendComponentCheckBox(String(element.getElementsByClassName("input-title")[0].textContent), inputs);
          continue;
        }
        if (element.id.includes("radio")) {
          var inputs = element.getElementsByClassName("input-radio-values");
          this.appendComponentRadio(String(element.getElementsByClassName("input-title")[0].textContent), inputs);
          continue;
        }
        if (element.id.includes("text")) {
          this.appendComponentText(element.children);
          continue;
        }
      }
    }
  }
  closePopupSaveForm() {
    this.classPopupSaveForm = this.classPopupSaveForm == "hide-content-popup-saveform" ? "content-popup-saveform" : "hide-content-popup-saveform";
  }
  addButtonToUpdate() {
    var p = document.createElement("p");
    p.textContent = "Salvar";

    var button = document.createElement("button");
    button.classList.add("button-save-component");
    button.addEventListener("click", (e) => {
      this.classPopupSaveForm = "content-popup-saveform";
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

