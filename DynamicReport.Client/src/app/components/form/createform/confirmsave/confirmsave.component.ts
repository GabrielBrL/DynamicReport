import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormTypes } from '../../../../shared/models/formTypes';
import { FormtypesService } from '../../../../services/form/formtypes.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private fs: FormtypesService, private tg: TagService, private router: Router, private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.formControl = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      tags: new FormControl('', [Validators.required]),
      innerHtml: new FormControl('', [Validators.required]),
    });
    this.tg.getAllTags().subscribe(resp => this._tags = resp);

    this.route.params.subscribe(param => {
      if (param["id"]) {
        this.fs.getFormById(param["id"]).subscribe(resp => {
          this.formControl = new FormGroup({
            id: new FormControl(resp.id),
            name: new FormControl(resp.name, [Validators.required, Validators.minLength(3)]),
            tags: new FormControl(resp.tags, [Validators.required]),
            innerHtml: new FormControl(resp.innerHtml, [Validators.required]),
          });
        });
      }
    });
  }

  closePopup() {
    this.esconderFilho.emit();
  }
  saveForm() {
    if (this.formControl.value.id) {
      this.updateForm();
      return;
    }
    var html = document.getElementById("listComponents")?.innerHTML;
    this.formControl.value.innerHtml = html;
    this.fs.createForm(this.formControl.value).subscribe(form => {
      this.router.navigate(['']);
    }, erro => {
      console.log("Erro " + erro);
    });
  }
  updateForm() {
    var html = document.getElementById("listComponents")?.innerHTML;
    this.formControl.value.innerHTML = html;
    this.fs.updateForm(this.formControl.value).subscribe(form => {
      this.router.navigate(['/form', this.formControl.value.id]).then(() => window.location.reload())
    }, erro => {
      console.log("Erro " + erro);
    });
  }
}