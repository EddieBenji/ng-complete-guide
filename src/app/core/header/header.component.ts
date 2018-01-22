import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(private storageService: DataStorageService,
              public authService: AuthService) {
  }

  ngOnInit() {
  }

  onStorageData() {
    this.storageService.storageRecipe().subscribe(
      (response: HttpResponse<any>) => console.log(response)
    );
  }

  onFetchData() {
    this.storageService.fetchRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
