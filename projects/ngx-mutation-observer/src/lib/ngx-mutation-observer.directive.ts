import {
    afterNextRender,
    Directive,
    ElementRef,
    EventEmitter,
    Host,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    Optional,
    Output,
    SimpleChanges,
    SkipSelf,
} from '@angular/core';

@Directive({
    selector: '[onMutation]',
})
export class NgxMutationObserverDirective implements OnChanges, OnDestroy {
    @Input() mutationConfig: MutationObserverInit = {
        attributes: true,
        characterData: true,
        childList: true,
    };
    @Output() onMutation = new EventEmitter<MutationRecord[]>();
    private observer: MutationObserver | null = null;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly ngZone: NgZone
    ) {
        afterNextRender(() => {
            this.observe();
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            this.observer &&
            (changes['mutationConfig'] || changes['onMutation'])
        ) {
            this.unobserve();
            this.observe();
        }
    }

    ngOnDestroy() {
        this.unobserve();
    }

    private observe() {
        if (this.observer) {
            return;
        }

        let config = this.mutationConfig;

        if (!config || typeof config !== 'object') {
            config = {
                attributes: true,
                characterData: true,
                childList: true,
            };
        }

        this.observer = new MutationObserver(mutations => {
            this.ngZone.run(() => {
                this.onMutation.emit(mutations);
            });
        });
        this.observer.observe(this.elementRef.nativeElement, config);
    }

    private unobserve() {
        if (!this.observer) {
            return;
        }

        this.observer.disconnect();
        this.observer = null;
    }
}
