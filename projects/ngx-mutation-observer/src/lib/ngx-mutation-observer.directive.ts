import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Host,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Output,
    SkipSelf
} from '@angular/core';

@Directive({
    selector: '[onMutation]'
})
export class NgxMutationObserverDirective
    implements AfterViewInit, OnChanges, OnDestroy {
    @Input() mutationConfig: MutationObserverInit;
    @Output() onMutation = new EventEmitter<MutationRecord[]>();
    private observing = false;
    private observer: MutationObserver;

    constructor(private readonly elementRef: ElementRef) {}

    ngAfterViewInit() {
        this.observe();
    }

    ngOnChanges(changes) {
        if (this.observing && (changes.mutationConfig || changes.onMutation)) {
            this.unobserve();
            this.observe();
        }
    }

    ngOnDestroy() {
        this.unobserve();
    }

    private observe() {
        if (!this.observing) {
            let config = this.mutationConfig;

            if (!config || typeof config !== 'object') {
                config = {
                    attributes: true,
                    characterData: true,
                    childList: true
                };
            }

            this.observer = new MutationObserver(mutationRecord => {
                this.onMutation.emit(mutationRecord);
            });
            this.observer.observe(this.elementRef.nativeElement, config);
            this.observing = true;
        }
    }

    private unobserve() {
        if (this.observing) {
            this.observer.disconnect();
            this.observing = false;
        }
    }
}
