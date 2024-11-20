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
    SimpleChanges,
    SkipSelf,
} from '@angular/core';

@Directive({
    selector: '[onMutation]',
})
export class NgxMutationObserverDirective
    implements AfterViewInit, OnChanges, OnDestroy
{
    @Input() mutationConfig: MutationObserverInit = {
        attributes: true,
        characterData: true,
        childList: true,
    };
    @Output() onMutation = new EventEmitter<MutationRecord[]>();
    private observer: MutationObserver | null = null;

    constructor(private readonly elementRef: ElementRef) {}

    ngAfterViewInit() {
        this.observe();
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
            this.onMutation.emit(mutations);
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
