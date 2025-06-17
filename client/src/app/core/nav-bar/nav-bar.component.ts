import { Route, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/models/Basket';
import { IdentityService } from '../../identity/identity.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  constructor(
    private _basket: BasketService,
    private router: Router,
    public identity: IdentityService,
    private cdr: ChangeDetectorRef
  ) {}
  isloginfunc() {
    const token = localStorage.getItem('tokenLogIn');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  basketLen: Observable<IBasket>;
  searchTerm: string = '';
  ngOnInit(): void {
    const basketId = localStorage.getItem('basketId');
    this._basket.GetBasket(basketId).subscribe({
      next: (value) => {
        console.log(value);
        this.basketLen = this._basket.basket$;
      },
      error(err) {
        console.log(err);
      },
    });

  }
  visibale: boolean = false;
  isNavbarCollapsed: boolean = true;
  toggleDropdown() {
    this.visibale = !this.visibale;
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { query: this.searchTerm },
      });
      this.searchTerm = '';
    }
  }

  logout() {
    this.identity.logout().subscribe({
      next: (value) => {
        console.log(value);
        localStorage.removeItem('basketId');
        this.router.navigateByUrl('/account/login');
        this.cdr.detectChanges();
        localStorage.removeItem('tokenLogIn');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
