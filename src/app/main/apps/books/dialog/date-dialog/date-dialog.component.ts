import { Component, OnDestroy, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  from: any;
  to: any;

}

@Component({
  selector: 'app-date-dialog',
  templateUrl: './date-dialog.html',
  styleUrls: ['./date-dialog.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DateDialog implements OnInit {
  form: FormGroup;


  // Private
  private _unsubscribeAll: Subject<any>;
  constructor(
    public dialogRef: MatDialogRef<DateDialog>,
    private _formBuilder: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data: DialogData) {


  };

  createForm(): FormGroup {
      return this._formBuilder.group({
        from: [''],
        to: [''],
      });
  }

  async ngOnInit(): Promise<any> {
    this.form = this.createForm();
    const from = this.data.from * 1000
    const to = this.data.to * 1000
    this.form.controls['from'].setValue(new Date(from));
    this.form.controls['to'].setValue(new Date(to));
  }
  onSave(): void {
    this.dialogRef.close(this.form.value);
  }
  onDate(): void {
    this.dialogRef.close(this.form.value);
  }

}
