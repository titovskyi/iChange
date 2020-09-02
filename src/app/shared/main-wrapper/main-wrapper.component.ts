import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';

@Component({
    selector: 'ns-main-wrapper',
    templateUrl: './main-wrapper.component.html',
    styleUrls: ['./main-wrapper.component.scss']
})
export class MainWrapperComponent implements OnInit {
    public isSelected: string = 'createPost';

    // #############################################

    constructor(private page: Page, private cd: ChangeDetectorRef) {}

    // #############################################

    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }

    // #############################################

    public onBottomSheetTap(isSelected: string): void {
        this.isSelected = isSelected;
        this.cd.detectChanges();
    }

    // #############################################
}
