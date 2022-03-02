import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserInputComponent } from './user-input/user-input.component';
import { DetailsComponent } from './details/details.component';
import {FormsModule} from "@angular/forms";
import { BodyComponent } from './body/body.component';
import { ShowPlaylistComponent } from './show-playlist/show-playlist.component';
import {PlaylistServiceComponent} from "./playlist-service/playlist-service.component";

@NgModule({
  declarations: [
    AppComponent,
    PlaylistServiceComponent,
    UserInputComponent,
    DetailsComponent,
    BodyComponent,

    ShowPlaylistComponent
  ],
    imports: [
        BrowserModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
