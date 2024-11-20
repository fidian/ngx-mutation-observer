import { NgModule } from '@angular/core';
import { NgxMutationObserverDirective } from './ngx-mutation-observer.directive';

@NgModule({
    exports: [NgxMutationObserverDirective],
    imports: [NgxMutationObserverDirective],
})
export class NgxMutationObserverModule {}
