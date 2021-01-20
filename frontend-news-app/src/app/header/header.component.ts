import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  url;
  buttonSelected;

  constructor() { }

  ngOnInit(): void {

    this.buttonSelected = "";
    this.url = window.location.href;

    if (this.url == "http://localhost:4200/archived") {

      this.buttonSelected = document.getElementById('archived');
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace("active", "");
      this.buttonSelected.className = this.buttonSelected.className.replace("", "active");

    } else if (this.url == "http://localhost:4200/home" || this.url == "http://localhost:4200/"){

      this.buttonSelected = document.getElementById('news');
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace("active", "");
      this.buttonSelected.className = this.buttonSelected.className.replace("", "active");

    }

  }

  controlButtons(event) {
    this.buttonSelected = document.getElementById(event.srcElement.id);
    if (!(this.buttonSelected.className == "active")) {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace("active", "");
      this.buttonSelected.className = this.buttonSelected.className.replace("", "active");
    }   
  }
}
