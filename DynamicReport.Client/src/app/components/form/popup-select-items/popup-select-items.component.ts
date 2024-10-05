import { Component, EventEmitter, Input, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'


@Component({
  selector: 'app-popup-select-items',
  standalone: true,
  imports: [],
  templateUrl: './popup-select-items.component.html',
  styleUrl: './popup-select-items.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PopupSelectItemsComponent {
  @Input() classContent: string | undefined;
  @Input() element: HTMLElement | undefined | null;
  @Output() esconderFilho = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['classContent'].currentValue == 'content-popup-selecteditems') {
      if (this.element) {
        this.addInputAdded(this.element.children);
      }
      else
        this.addInput()
    }
  }

  closePopup() {
    this.esconderFilho.emit();
    var divItems = document.getElementById("add-input-items");
    if (divItems)
      divItems.innerHTML = '';
  }

  addInputAdded(values: HTMLCollection | null = null) {
    if (values) {
      if (values.length == 0) {
        this.addInput();
        return;
      }
      var divItems = document.getElementById("add-input-items");
      if (divItems) {
        divItems.innerHTML = '';
        for (let i = 0; i < values.length; i++) {
          var pTitle = document.createElement("p");
          pTitle.textContent = "Item:";

          var divEdit = document.createElement("div");
          divEdit.classList.add("field-edit-new-values");

          var input = document.createElement("input");
          input.classList.add("input-new-item");
          input.type = "text";
          input.value = values[i].textContent || "";

          var btnDelete = document.createElement("button");
          btnDelete.textContent = "X";
          btnDelete.addEventListener("click", (e) => {
            this.removeFieldItem(values, i, divItems);
          });

          // var aDragDrop = document.createElement("a");
          // aDragDrop.style.cursor = "n-resize";
          // aDragDrop.textContent = "º";
          // aDragDrop.addEventListener("dragstart", (e) => {

          // });

          // divEdit.appendChild(aDragDrop);
          divEdit.appendChild(input);
          divEdit.appendChild(btnDelete);

          divItems?.appendChild(pTitle);
          divItems?.appendChild(divEdit);
        }
      }
    }
  }

  private removeFieldItem(values: HTMLCollection, i: number, divItems: HTMLElement | null) {
    if (divItems)
      divItems.innerHTML = '';
    if (values.length > 0) {
      values[i].parentElement?.removeChild(values[i]);
      this.addInputAdded(values)
    }
    else {
      this.addInput();
    }
  }

  addInput() {
    var divItems = document.getElementById("add-input-items");
    var pTitle = document.createElement("p");
    pTitle.textContent = "Item:";

    var divEdit = document.createElement("div");
    divEdit.classList.add("field-edit-new-values");

    var input = document.createElement("input");
    input.classList.add("input-new-item");
    input.type = "text";

    var btnDelete = document.createElement("button");
    btnDelete.textContent = "X";
    btnDelete.addEventListener("click", (e) => {
      if (this.element)
        this.removeFieldItem(this.element.children, this.element.children.length - 1, divItems);
    });

    divEdit.appendChild(input);
    divEdit.appendChild(btnDelete);

    divItems?.appendChild(pTitle);
    divItems?.appendChild(divEdit);

    if (this.element) {
      var tmpElement = document.createElement("div");
      tmpElement.style.display = 'none';
      this.element.appendChild(tmpElement);
    }
  }

  saveOptionSelect() {
    var inputs = document.getElementsByClassName("input-new-item");
    if (this.element)
      this.element.innerHTML = '';
    Array.from(inputs, (x) => {
      if (x instanceof HTMLInputElement) {
        switch (true) {
          case this.element instanceof HTMLSelectElement:
            var opt = document.createElement("option");
            opt.textContent = x.value;
            this.element?.appendChild(opt);
            break;
          case this.element instanceof HTMLDivElement && this.element.classList.contains("input-checkbox"):
            var input = document.createElement("input");
            input.type = "checkbox";
            input.classList.add("input-checks");
            var p = document.createElement("p");
            p.textContent = x.value;
            var divRadioValues = document.createElement("div");
            divRadioValues.classList.add("input-radio-values");
            divRadioValues.appendChild(p);
            divRadioValues.appendChild(input);
            this.element.appendChild(divRadioValues);
            break;
          case this.element instanceof HTMLDivElement && this.element.classList.contains("input-radio"):
            let numRadio = this.countElementsFromMainList();
            var input = document.createElement("input");
            input.type = "radio";
            input.classList.add("input-radio-unique");
            input.name = `radio${numRadio}`;
            var p = document.createElement("p");
            p.textContent = x.value;
            var divRadioValues = document.createElement("div");
            divRadioValues.classList.add("input-radio-values");
            divRadioValues.appendChild(p);
            divRadioValues.appendChild(input);
            this.element.appendChild(divRadioValues);
            break;
          default:
            break;
        }
      }
    });
    this.closePopup();
  }
  countElementsFromMainList(): number {
    var listMain = document.getElementById("listComponents");
    let count = listMain?.childNodes.length;
    return !count ? 0 : Number(count) + 1;
  }
}
