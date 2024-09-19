import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';


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
  @Input() element: HTMLElement | undefined;
  @Output() esconderFilho = new EventEmitter<void>();

  closePopup() {
    this.esconderFilho.emit();
    var divItems = document.getElementById("add-input-items");
    if (divItems)
      divItems.innerHTML = '';
    this.addInput();
  }
  addInput() {
    var divItems = document.getElementById("add-input-items");
    var pTitle = document.createElement("p");
    pTitle.textContent = "Item:";
    var input = document.createElement("input");
    input.classList.add("input-new-item");
    input.type = "text";

    divItems?.appendChild(pTitle);
    divItems?.appendChild(input);
  }

  saveOptionSelect() {
    var inputs = document.getElementsByClassName("input-new-item");
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
