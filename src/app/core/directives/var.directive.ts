import {
    Directive, TemplateRef, ViewContainerRef, Input,
} from '@angular/core';

@Directive({
    selector: '[ngVar]',
    standalone: true
})
export class VarDirective {
    @Input()
    set ngVar(context: any) {
        this.context.$implicit = this.context.ngVar = context;
        this.updateView();
    }

    context: any = {};

    constructor(private vcRef: ViewContainerRef, private templateRef: TemplateRef<any>) { }

    updateView() {
        this.vcRef.clear();
        this.vcRef.createEmbeddedView(this.templateRef, this.context);
    }
}