import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorHandlerComponent,
    NotFoundComponent
  ],
  imports: [CommonModule, FontAwesomeModule],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent,
    ErrorHandlerComponent,
    NotFoundComponent
  ]
})
export class SharedModule {}
