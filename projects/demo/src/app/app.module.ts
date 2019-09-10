import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxMutationObserverModule } from '../../../ngx-mutation-observer/src/public-api';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [BrowserModule, FormsModule, NgxMutationObserverModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
