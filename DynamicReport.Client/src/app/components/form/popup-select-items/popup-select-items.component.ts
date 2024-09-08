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
  @Input() select: HTMLSelectElement | undefined;
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
      var opt = document.createElement("option");
      if (x instanceof HTMLInputElement) {
        opt.textContent = x.value;
        this.select?.appendChild(opt);
      }
    });
    this.closePopup();
  }
}
