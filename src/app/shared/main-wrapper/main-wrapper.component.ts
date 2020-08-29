import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'ns-main-wrapper',
    templateUrl: './main-wrapper.component.html',
    styleUrls: ['./main-wrapper.component.scss']
})
export class MainWrapperComponent implements OnInit {
    title: string = 'Hello Auth';


    ngOnInit(): void {
        console.log(this.title);
    }
}
