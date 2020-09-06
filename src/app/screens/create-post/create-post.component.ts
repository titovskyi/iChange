import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';

import * as imagePicker from 'nativescript-imagepicker';

import { Page } from 'tns-core-modules/ui/page';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';

import { RadListView, LoadOnDemandListViewEventData } from 'nativescript-ui-listview';
import { Router } from '@angular/router';

const app = require('application');
declare const android: any;

@Component({
    selector: 'ns-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements AfterViewInit {
    public folderEntities: { fileUri: string; text: string; date: string }[] = [];

    public imageList: { fileUri: string; text: string; date: string }[] = [];

    public images: ObservableArray<any> = new ObservableArray<any>();

    private listView: RadListView;

    // #############################################

    public postImages: { fileUri: string; text: string; date: string }[] = [];

    // #############################################

    @Output() private showHomePage: EventEmitter<void> = new EventEmitter<void>();

    // #############################################

    ngAfterViewInit(): void {
        const context = imagePicker.create({
            mode: 'single'
        });

        context
            .authorize()
            .then((val) => {
                this.getGalleryPhotos();
            })
            .then(() => {
                const newImages = this.imageList.splice(0, 12);
                this.images.push(newImages);
            });
    }

    // #############################################

    public onLoadMoreItemsRequested(ev: LoadOnDemandListViewEventData): void {
        this.listView = ev.object;

        if (this.imageList.length > 0) {
            setTimeout(() => {
                const newImages = this.imageList.splice(0, 12);

                this.images.push(newImages);
                this.listView.notifyLoadOnDemandFinished();
            }, 1500);
        } else {
            ev.returnValue = false;
            this.listView.notifyLoadOnDemandFinished(true);
        }
    }

    // #############################################

    public goBack(): void {
        console.log('here go back')
        // this.listView.notifyLoadOnDemandFinished(true);
        this.showHomePage.emit();
    }

    public goNext(): void {}

    // #############################################

    public addImageToPost(imageObject: { fileUri: string; text: string; date: string }): void {
        if (this.postImages.find((image) => image.fileUri === imageObject.fileUri)) {
            return;
        }

        if (this.postImages.length < 5) {
            this.postImages.push(imageObject);
        }
    }

    public removeImageFromPost(imageObj: { fileUri: string; text: string; date: string }): void {
        this.postImages = this.postImages.filter((image) => image.fileUri !== imageObj.fileUri);
    }

    public checkIfChosen(imageObject): boolean {
        return !!this.postImages.find((image) => image.fileUri === imageObject.fileUri);
    }

    // #############################################

    private getGalleryPhotos(): void {
        const MediaStore = android.provider.MediaStore;
        let cursor = null;

        try {
            const context = app.android.context;
            const columns = [MediaStore.MediaColumns.DATA, MediaStore.MediaColumns.DATE_ADDED];
            const uri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;

            cursor = context.getContentResolver().query(uri, columns, null, null, null);

            if (cursor && cursor.getCount() > 0) {
                while (cursor.moveToNext()) {
                    const column_index = cursor.getColumnIndex(MediaStore.MediaColumns.DATA);
                    const date_index = cursor.getColumnIndex(MediaStore.MediaColumns.DATE_ADDED);
                    const imageUri = cursor.getString(column_index) + '';
                    const date = cursor.getString(date_index);
                    const name = imageUri.substring(imageUri.lastIndexOf('.'));
                    const image = { fileUri: imageUri, text: name, date: date };

                    this.imageList.push(image);
                }
                this.imageList = this.imageList.sort((a, b) => {
                    return Number(b.date) - Number(a.date);
                });
            }
        } catch (error) {
            console.log(error);
            console.log('getGalleryPhotos=>', JSON.stringify(error));
        }
    }

    // #############################################
}
