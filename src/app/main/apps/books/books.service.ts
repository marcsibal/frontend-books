import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';;
import { environment } from 'environments/environment';

@Injectable()
export class BooksService implements Resolve<any> {
    private session: any;
    data: any[];
    onDataChanged: BehaviorSubject<any>;

    constructor(
        private _httpClient: HttpClient,
        

    ) {

        this.data = [];
        // Set the defaults
        this.onDataChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            this.session = JSON.parse(localStorage.getItem('user.session'));
            Promise.all([

            ]).then(
                () => {
                    resolve([]);
                },
                reject
            );
        });
    }



    //add
    addBook(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(environment.server + '/books.json', data)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        })
    }
    //edit
    editBook(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(environment.server + '/books.json?id=' + data.id, data)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    //delete
    deleteBook(id): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.delete(environment.server + '/books.json?id=' + id)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    //GET books
    getBooks(date): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = environment.server + '/books.json?from=' + date.from + '&to=' + date.to;
            console.log(url);
            this._httpClient.get(url)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


}
