
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [NavBarComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,

  ],
  exports: [NavBarComponent,FooterComponent],
})
export class CoreModule {}
