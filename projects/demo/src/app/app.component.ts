import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit, OnInit {
    @ViewChild('resizingElement', { static: false })
    resizingElement: ElementRef;
    heightDesired = 100;
    heightReported: number = null;
    triggeredBy = 'constructor';
    widthDesired = 100;
    widthReported: number = null;

    ngOnInit() {
        setInterval(() => {
            this.heightDesired = 80 * Math.random() + 20;
            this.widthDesired = 80 * Math.random() + 20;
        }, 5000);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.updateSize('afterViewInit');
        });
    }

    handleMutation(mutationRecord) {
        console.log('onMutation', mutationRecord);
        this.updateSize('onMutation');
    }

    private updateSize(triggeredBy: string) {
        this.heightReported = this.resizingElement.nativeElement.clientHeight;
        this.widthReported = this.resizingElement.nativeElement.clientWidth;
        this.triggeredBy = triggeredBy;
    }
}
