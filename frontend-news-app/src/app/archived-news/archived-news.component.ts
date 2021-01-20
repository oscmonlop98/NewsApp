import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogWindowComponent } from '../dialog-window/dialog-window.component';
import { NewsService } from '../services/news-service';

@Component({
  selector: 'app-archived-news',
  templateUrl: './archived-news.component.html',
  styleUrls: ['./archived-news.component.css']
})
export class ArchivedNewsComponent implements OnInit {

  archivedNewsList;
  activeButton;
  interval;

  newServiceSubscription: Subscription;

  constructor(private newsService: NewsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.archivedNewsList = [];
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

    this.newServiceSubscription = this.newsService.getArchivedList().subscribe((data: any) => {
      if (data.length != this.archivedNewsList.length) {
        this.archivedNewsList = [];
      }
      for (var i = 0; i < data.length; i++) {
        if (data[i].archiveDate) {
            data[i].date = (data[i].date).substring(0,10);
            this.archivedNewsList.push(data[i]);
        }
      }
    });

  }

  checkUpdates() {

    this.newServiceSubscription = this.newsService.getArchivedList().subscribe((data: any) => {

      if (data.length != this.archivedNewsList.length) {
        this.archivedNewsList = [];
        for (var i = 0; i < data.length; i++) {
            data[i].date = (data[i].date).substring(0,10);
            this.archivedNewsList.push(data[i]);
        }
      }
    });

  }

  deleteNew(newSelected) {

    var resultado;
    const dialogRef = this.dialog.open(DialogWindowComponent, {
      width: '10vw',
      data: {result: resultado}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.newsService.deleteNew(newSelected);
        this.getInfo();
      } 
    });

    

  }
}