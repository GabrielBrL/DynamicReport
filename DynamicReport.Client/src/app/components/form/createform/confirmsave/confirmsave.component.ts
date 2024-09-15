import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormTypes } from '../../../../shared/models/formTypes';
import { FormtypesService } from '../../../../services/form/formtypes.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TagService } from '../../../../services/tag/tag-services.service';
import { Tags } from '../../../../shared/models/tags';

@Component({
  selector: 'app-confirmsave',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './confirmsave.component.html',
  styleUrl: './confirmsave.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ConfirmsaveComponent implements OnInit {
  @Input() classContent: string | undefined;
  @Input() form: FormTypes = new FormTypes();
  @Output() esconderFilho = new EventEmitter<void>();

  formControl: FormGroup = new FormGroup({});

  _tags: Tags[] = [];

  constructor(private fs: FormtypesService, private tg: TagService, private route: Router) {
  }

  ngOnInit() {
    this.formControl = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      tags: new FormControl('', [Validators.required]),
    });
    this.tg.getAllTags().subscribe(resp => this._tags = resp);
  }

  closePopup() {
    this.esconderFilho.emit();

  }
  saveForm() {
    if (this.formControl.valid) {
      this.fs.createForm(this.formControl.value).subscribe(form => console.log(form), erro => {
        console.log("Erro " + erro);
      });
      this.route.navigate(['']);
    }
  }
}