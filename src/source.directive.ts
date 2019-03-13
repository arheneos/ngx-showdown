import { Directive, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShowdownComponent } from './showdown.component';

/**
 * @example
 * Setup as standalone
 * ```typescript
 * import { NgModule } from '@angular/core';
 * import { HttpClientModule } from '@angular/common/http';
 * import { ShowdownComponent, SrcDirective } from 'ngx-showdown';
 *
 * @NgModule({
 *    declarations: [ ShowdownComponent, SrcDirective ],
 *    imports: [ HttpClientModule ]
 * })
 * export class AppModule {}
 * ```
 *
 * Bind url `src` directive
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *     selector: 'some',
 *     template: '<showdown [src]="url" smartIndentationFix>**Loading...**</showdown>
 * })
 * class SomeComponent {
 *     url: string = 'https://unpkg.com/ngx-showdown/README.md';
 *     // ...
 * }
 * ```
 *
 * Set static url
 * ```html
 * <showdown src="README.md" [options]="{noHeaderId: true}"></showdown>
 * ```
 *
 * Set template reference variable
 * ```html
 * <showdown #source="source" src="README.md"></showdown>
 * ```
 */
@Directive({
    selector: 'showdown[src],[showdown][src]',
    exportAs: 'source'
})
export class SourceDirective implements OnChanges {

    /**
     * The source url of the markdown content.
     *
     * @example
     * Set static url to `src` directive.
     * ```html
     * <showdown src="https://unpkg.com/ngx-showdown/README.md"></showdown>
     * ```
     *
     * Bind url to `src` directive.
     * ```html
     * <input type="text" #url placeholder="url" />
     * <button (click)="src = url.value">Load</button>
     * <showdown [src]="src">**Loading...**</showdown>
     * ```
     */
    @Input() src: string;

    constructor(private _showdownComponent: ShowdownComponent, private _http: HttpClient) {
    }

    /**
     * A angular lifecycle method, Use to call to `this#load` method on src init/changes
     * @internal
     */
    ngOnChanges(): void {
        this.load();
    }

    public load(): void {
        if (this.src) {
            this
              ._http
              .get(this.src, {responseType: 'text'})
              .subscribe((response: string) => {
                  this._showdownComponent.render(response);
              });
        }
    }

}