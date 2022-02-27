import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistTrackComponent } from './playlist/playlist-track/playlist-track.component';
import { UserInputComponent } from './user-input/user-input.component';
import { DetailsComponent } from './details/details.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    PlaylistTrackComponent,
    UserInputComponent,
    DetailsComponent
  ],
    imports: [
        BrowserModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
