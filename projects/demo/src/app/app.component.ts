import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    signal,
} from '@angular/core';
import { NgxMutationObserverDirective } from '../../../ngx-mutation-observer/src/public-api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [NgxMutationObserverDirective],
})
export class AppComponent implements AfterViewInit, OnInit {
    @ViewChild('resizingElement', { static: false })
    resizingElement: ElementRef | null = null;
    heightDesired = signal(100);
    heightReported = signal<number | null>(null);
    triggeredBy = signal('constructor');
    widthDesired = signal(100);
    widthReported = signal<number | null>(null);

    ngOnInit() {
        setInterval(() => {
            this.heightDesired.set(Math.floor(80 * Math.random()) + 20);
            this.widthDesired.set(Math.floor(80 * Math.random()) + 20);
        }, 5000);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.updateSize('afterViewInit');
        });
    }

    handleMutation(mutationRecord: MutationRecord[]) {
        console.log('onMutation', mutationRecord);
        this.updateSize('onMutation');
    }

    private updateSize(triggeredBy: string) {
        if (!this.resizingElement) {
            return;
        }

        this.heightReported.set(
            this.resizingElement.nativeElement.clientHeight,
        );
        this.widthReported.set(this.resizingElement.nativeElement.clientWidth);
        console.log(this.widthReported(), 'x', this.heightReported());
        this.triggeredBy.set(triggeredBy);
    }
}
