import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DbService} from './db/db.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule} from '@angular/common/http';
import {RebrickableModule} from 'ng-rebrickable';

function dbMigration(dbService: DbService): () => void {
  return () => dbService.migrate();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    RebrickableModule.forRoot({
      apiKey: 'c6020fdf7a33ea947e71d88448ea923d'
    })
  ],
  providers: [
    DbService,
    {
      provide: APP_INITIALIZER,
      useFactory: dbMigration,
      deps: [DbService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
