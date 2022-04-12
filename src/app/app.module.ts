import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { UserInputComponent } from './user-input/user-input.component';
import {FormsModule} from "@angular/forms";
import { BodyComponent } from './body/body.component';
import { ShowPlaylistComponent } from './show-playlist/show-playlist.component';
import {PlaylistServiceComponent} from "./playlist-service/playlist-service.component";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    PlaylistServiceComponent,
    UserInputComponent,

    BodyComponent,

    ShowPlaylistComponent

  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
      RouterModule.forRoot([

        {path: 'app', component:BodyComponent},
        {path: '', redirectTo: 'app', pathMatch :'full'}
      ])
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
