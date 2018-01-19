import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(private storageService: DataStorageService) {
  }

  ngOnInit() {
    this.onFetchData();
  }

  onStorageData() {
    this.storageService.storageRecipe().subscribe(
      (response: HttpResponse<any>) => console.log(response)
    );
  }

  onFetchData() {
    this.storageService.fetchRecipes();
  }
}
