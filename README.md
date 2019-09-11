# NgxMutationObserver

Angular 8.x library to monitor changes to elements. Uses MutationObserver to do the work.

If you're only looking for a way to see if elements are visible, I suggest checking out [ngx-visibility](https://github.com/fidian/ngx-visibility) instead. This doesn't notice everything - for instance, an element whose width is set to "50%" will not report a mutation when the window is resized or when a scrollbar is visible. Instead, a mutation is reported when the width is changed from "50%" to "75%" or to "128px".


## Demonstration

There's a [live demo](https://codesandbox.io/s/github/fidian/ngx-mutation-observer-demo/tree/master/) over at CodeSandbox.io.


## Installation

Install like other Angular libraries. First run a command to download the module.

    npm install ngx-mutation-observer

Next, add the module to your project.

    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { FormsModule } from '@angular/forms';

    // Import the module
    import { NgxMutationObserverModule } from 'ngx-mutation-observer';

    import { AppComponent } from './app.component';

    @NgModule({
        declarations: [AppComponent, ItemComponent],

        // Include the module.
        imports: [BrowserModule, FormsModule, NgxMutationObserverModule],
        providers: [],
        bootstrap: [AppComponent]
    })
    export class AppModule {}

Finally, you leverage the service directly or use some directives for common uses.


## NgxMutationObserverDirective

Emits `MutationRecord[]` when a mutation is detected.

    <div (onMutation)="handleMutation($event)"></div>

Configuration is allowed through the `mutationConfig` directive. When not specified, this defaults to `{attributes: true, characterData: true, childList: true }`. You are allowed to specify anything allowed in [the interface](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit). For instance, if you only care about the size of an element changing, you would only watch its attributes.

    <div (onMutation)="attributesChanged($event)" [mutationConfig]="{attributes: true}"></div>


## License

This project is licensed under an [MIT license](LICENSE.md).
