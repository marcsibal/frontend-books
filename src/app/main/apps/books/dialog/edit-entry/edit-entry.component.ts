import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  edit: boolean;
  author: string;
  title: string;
  isbn: string;
  published_date: number;
  genre: string;
  items: any;
}

@Component({
  selector: 'book-dialog',
  templateUrl: './edit-entry.html',
  styleUrls: ['./edit-entry.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditDialog implements OnInit {
  edit: boolean;
  form: FormGroup;
  minDate: any;
  maxDate: any;
  showSpinners: any;
  showSeconds: any;
  stepHour: any;
  stepMinute: any;
  stepSecond: any;

  constructor(
    public dialogRef: MatDialogRef<EditDialog>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.edit = this.data.edit;
  }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    return this._formBuilder.group({
      author: [this.data.items && this.data.items.author ? this.data.items.author : '', Validators.required],
      title: [this.data.items && this.data.items.title ? this.data.items.title : '', Validators.required],
      isbn: [this.data.items && this.data.items.isbn ? this.data.items.isbn : '', Validators.required],
      genre: [this.data.items && this.data.items.genre ? this.data.items.genre : '', Validators.required],
      published_date: [
        this.data.items && this.data.items.published_date 
          ? new Date(this.data.items.published_date * 1000) 
          : '', 
        Validators.required
      ],
    });
  }
  

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onAdd(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
