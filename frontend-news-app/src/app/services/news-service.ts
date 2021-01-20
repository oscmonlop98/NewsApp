import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeNewsComponent } from '../home-news/home-news.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  // Variable options
  URL_API = 'http://localhost:3000/';
  duration = 3000;
  deleteMessage = "Eliminado correctamente!";
  savedMessage = "Añadido correctamente!";
  action = "Ok";

  // Headers for http petitions
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8"
    })
  };


  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar) { }

  // Gets the news list without archiveDate
  getNewsList(): Observable < any > {

    return this.http.get(this.URL_API + 'home', this.httpOptions);

  }

  // Gets the news list with archiveDate
  getArchivedList(): Observable < any > {

    return this.http.get(this.URL_API + 'archived-news', this.httpOptions);
    
  }

  // Update the new selected with archiveDate
  saveNew(newSelected) {

    var id_new = newSelected._id;
    var archiveDate = newSelected.archiveDate;
    let newInfo = {
      id: id_new,
      archiveDate: archiveDate
    }

    const params = new HttpParams().append('new_info', JSON.stringify(newInfo));

    return this.http.post('http://localhost:3000/save-news', {
      params: params,
      headers: this.httpOptions
    }).subscribe((dato: any) => {
      
      if(dato.ok == '1') {
          setTimeout(() => {
            this._snackBar.open(this.savedMessage, this.action, {duration: this.duration}
              );
          }, 1000);
      }
    });

  }

  // Delete the new selected
  deleteNew(newSelected) {
    
    const params = new HttpParams().append('new_info', JSON.stringify(newSelected));

    var options = {
      params: params,
      headers: new HttpHeaders({
        "Content-Type": "application/json;charset=utf-8"
      })
    };  

    return this.http.delete('http://localhost:3000/delete-news', options).subscribe((dato:any) => {
      if(dato.ok == '1') {
        setTimeout(() => {
          this._snackBar.open(this.deleteMessage, this.action, {duration: this.duration}
            );
        }, 1000);
      }
    });
  }
}
