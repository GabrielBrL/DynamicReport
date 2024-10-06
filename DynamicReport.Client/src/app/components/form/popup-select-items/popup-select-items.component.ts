import { Component, EventEmitter, Input, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-popup-select-items',
  standalone: true,
  imports: [CdkDropList, CdkDrag, MatIconModule],
  templateUrl: './popup-select-items.component.html',
  styleUrl: './popup-select-items.component.css',
  encapsulation: ViewEncapsulation.None
})

export class PopupSelectItemsComponent {
  @Input() classContent: string | undefined;
  @Input() element: HTMLElement | undefined | null;
  @Output() esconderFilho = new EventEmitter<void>();

  elementos: string[] = [];


  ngOnChanges(changes: SimpleChanges) {
    this.elementos = [];
    if (changes['classContent'].currentValue == 'content-popup-selecteditems') {
      if (this.element) {
        if (this.element.children.length == 0) {
          this.elementos.push("");
          return;
        }
        for (let i = 0; i < this.element.children.length; i++) {
          this.elementos.push(String(this.element.children[i].textContent));
        }
      }
    }
  }

  closePopup() {
    this.esconderFilho.emit();
  }

  addInput() {
    this.elementos.push("");
  }
  removeInput(index: number) {
    this.elementos.splice(index);
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
            let numRadio = this.countElementsFromMainList(document.getElementById("listComponents"));
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

  countElementsFromMainList(list: HTMLElement | null): number {
    let count = list?.childNodes.length;
    return !count ? 0 : Number(count) + 1;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.elementos, event.previousIndex, event.currentIndex);
  }
}
