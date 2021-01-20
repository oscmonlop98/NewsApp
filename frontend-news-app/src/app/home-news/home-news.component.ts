import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsService } from '../services/news-service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowComponent } from '../dialog-window/dialog-window.component';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.css']
})
export class HomeNewsComponent implements OnInit {

  newsList;
  activeButton;
  interval;

  newServiceSubscription: Subscription;

  constructor(private newsService: NewsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.newsList = [];
    this.initializeNews();

  }

  ngOnDestroy(): void {

    this.newServiceSubscription.unsubscribe();
    clearInterval(this.interval);

  }

  initializeNews() {

    this.getInfo();
    this.interval = setInterval(() => {
      this.checkUpdates();
    }, 5000);

  }

  getInfo() {

    this.newServiceSubscription = this.newsService.getNewsList().subscribe((data: any) => {

      if(data.length > this.newsList.length) {
        for (var i = 0; i < data.length; i++) {
          data[i].date = (data[i].date).substring(0,10);
          this.newsList.push(data[i]);
        }
      }

    });
  }

  checkUpdates() {

    this.newServiceSubscription = this.newsService.getNewsList().subscribe((data: any) => {

      if (data.length != this.newsList.length) {
        this.newsList = [];
        for (var i = 0; i < data.length; i++) {
            data[i].date = (data[i].date).substring(0,10);
            this.newsList.push(data[i]);
        }
      }
    });

  }

  saveNew(newSelected) {

    var resultado;
    const dialogRef = this.dialog.open(DialogWindowComponent, {
      width: '10vw',
      data: {result: resultado}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        let dateNow = new Date();
        newSelected.archiveDate = dateNow;
        this.newsService.saveNew(newSelected);
      } 
    });    

  }
}
