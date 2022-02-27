import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { UserInputComponent } from './user-input/user-input.component';
import { DetailsComponent } from './details/details.component';
import {FormsModule} from "@angular/forms";
import { BodyComponent } from './body/body.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    UserInputComponent,
    DetailsComponent,
    BodyComponent
  ],
    imports: [
        BrowserModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
