import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Logout } from '~/app/store/actions/auth.actions';

@Component({
    selector: 'ns-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    constructor(private store: Store) {}

    ngOnInit(): void {}

    logout() {
        this.store.dispatch(new Logout());
    }
}
