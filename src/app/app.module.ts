import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
//import { fakeBackendProvider } from './_helpers/fake-backend';

import { routing } from './app-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent, PizzaPartyComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { PublisherComponent } from './publisher/publisher.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule,  } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    RegisterComponent,
    PublisherComponent,
    PizzaPartyComponent
  ],
  entryComponents:[
    PizzaPartyComponent
  ],
  imports: [
    MatSnackBarModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
  {  provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  MatSnackBar
  //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
