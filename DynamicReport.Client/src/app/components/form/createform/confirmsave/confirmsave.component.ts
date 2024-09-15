import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormTypes } from '../../../../shared/models/formTypes';

@Component({
  selector: 'app-confirmsave',
  standalone: true,
  imports: [],
  templateUrl: './confirmsave.component.html',
  styleUrl: './confirmsave.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ConfirmsaveComponent {
  @Input() classContent: string | undefined;
  @Input() form: FormTypes | undefined;
  @Output() esconderFilho = new EventEmitter<void>();
}
