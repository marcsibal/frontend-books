import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { EditDialog } from '../dialog/edit-entry/edit-entry.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BooksService } from '../books.service';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';
import { DateDialog } from '../dialog/date-dialog/date-dialog.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'books-list',
  templateUrl: './books.html',
  styleUrls: ['./books.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BooksComponent implements OnInit {
  profiles: any;
  _data: any;
  form: FormGroup;
  query: any;
  session: any;
  uomGroupId;
  displayedColumns = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6'];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild('filter')


  // Private
  private _unsubscribeAll: Subject<any>;
  private _select: any
  constructor(
    private _datePipe: DatePipe,
    private _dialog: MatDialog,
    private _matSnackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _service: BooksService,
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
    this._data = {
      rows: [],
    };

    this.session = JSON.parse(localStorage.getItem('user.session'));
    this.query = {
      from: Math.floor(new Date().setHours(0, 0, 0, 0) / 1000),
      to: Math.floor(new Date().setHours(23, 59, 0, 0) / 1000),
    };
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  sortData(sort: MatSort) {
    const data = this._data.rows.slice();
    console.log(sort);
    if (!sort.active || sort.direction === '') {
      this._data.rows = data;
      return;
    }

    this._data.rows = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'col1':
          return this.compare(a.title, b.title, isAsc);
        case 'col2':
          return this.compare(a.author, b.author, isAsc);
        case 'col3':
          return this.compare(a.isbn, b.isbn, isAsc);
        case 'col4':
          return this.compare(a.published_date, b.published_date, isAsc);
        case 'col5':
          return this.compare(a.genre, b.genre, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data = this._data.rows;
    this.dataSource.paginator = this.paginator;
  }
  createSearchForm(): FormGroup {
    return this._formBuilder.group({
      filter: ['']
    });
  }

  ngViewAfterInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.form = this.createSearchForm();
    this.onReload();


  }

  onAdd(): void {
    const dialogRef = this._dialog.open(EditDialog, {
      width: '500px',
      data: {
        edit: false,
        title: '',
        author: '',
        genre: '',
        published_date: this.query.from,
        isbn: '',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const newDate = Math.floor(new Date(result.published_date).getTime() / 1000);
        result.published_date = newDate;

        this._service.addBook(result)
          .then(r => {
            this._matSnackBar.open(r.message, 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
            this.onReload();
          });
      }
    });
  }

  onDate(): void {
    const e = {
      from: this.query.from,
      to: this.query.to
    };
    const dialogRef = this._dialog.open(DateDialog, {
      width: '700px',
      data: e
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result)
        this.query = {
          from: Math.floor(new Date(result.from).setHours(0, 0, 0, 0) / 1000),
          to: Math.floor(new Date(result.to).setHours(23, 59, 0, 0) / 1000),
        };
        this.showBooks()
      }
    });
  }

  async showBooks(): Promise<any> {
    let response = await this._service.getBooks(this.query);
    this._data.rows = [];
    if (!response.success) {
      this._matSnackBar.open('NO DATA AVAILABLE', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });
    } else {
      // filter
      for (const d of response.data) {
        this._data.rows.push(d);
      }
    }

    this.dataSource.data = this._data.rows;

    this.dataSource.paginator = this.paginator;
    if (this.table !== undefined) {
      this.table.renderRows();
    }
  }

  async onReload(): Promise<any> {
    this.showBooks();
  }



  onEdit(entry): void {
    const dialogRef = this._dialog.open(EditDialog, {
      width: '500px',
      data: {
        edit: true,
        items: entry
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const newDate = Math.floor(new Date(result.published_date).getTime() / 1000);
        const data = {
          id: entry.id,
          title: result.title,
          author: result.author,
          genre: result.genre,
          published_date: newDate,
          isbn: result.isbn,
        }
        this._service.editBook(data)
          .then(r => {
            this._matSnackBar.open(r.message, 'OK', {
              verticalPosition: 'top',
            });
            this.onReload();
          });

      }
    });

  }
  onDelete(row): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      disableClose: false,
    });

    dialogRef.componentInstance.title = 'DELETE BOOK';
    dialogRef.componentInstance.message = 'Are you sure you want to delete this Book?';

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this._service.deleteBook(row.id)
          .then(r => {
            this._matSnackBar.open(r.message, 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
            this.onReload();

          });
      }
    });
  }

}



