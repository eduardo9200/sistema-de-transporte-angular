import { Component, OnInit } from '@angular/core';
import { TabelaHome } from './models/home.model';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  dataList: TabelaHome[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.montaTabelaHome()
    .subscribe(resultList => this.dataList = resultList);
  }

}
