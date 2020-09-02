import { AfterViewInit, Component, OnInit } from '@angular/core';

import * as imagePicker from 'nativescript-imagepicker';

// import { Folder, FileSystemEntity, path } from 'tns-core-modules/file-system/file-system';
import { ImageSource } from 'tns-core-modules/image-source';

import { Page } from 'tns-core-modules/ui/page';
import { knownFolders, path, Folder, FileSystemEntity } from 'tns-core-modules/file-system';
import * as fs from 'tns-core-modules/file-system';
import { RadListView } from 'nativescript-ui-listview';

const app = require('application');
declare const android: any;

@Component({
    selector: 'ns-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit, AfterViewInit {
    public folderEntities = [];

    public imageList: Array<any> = [];

    constructor(private page: Page) {
        // let context = imagePicker.create({
        //     mode: 'single'
        // });
        //
        // context
        //     .authorize()
        //     .then((val) => {
        //         let tempPicturePath = android.os.Environment.getExternalStoragePublicDirectory(
        //             android.os.Environment.DIRECTORY_DCIM + '/Camera'
        //         ).getAbsolutePath();
        //         let MediaStore = android.provider.MediaStore;
        //
        //         console.log(MediaStore.Images.Media.INTERNAL_CONTENT_URI, 'MediaStore');
        //         console.log(MediaStore.Images.Media.INTERNAL_CONTENT_URI, 'MediaStore');
        //         console.log(MediaStore.Images, 'MediaStore');
        //
        //         // let temp = android.os.Environment.getExternalStoragePublicDirectory(
        //         //     MediaStore.Images.Media.INTERNAL_CONTENT_URI
        //         // ).getAbsolutePath();
        //
        //
        //         // let tempFolder = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
        //
        //         // console.log(tempFolder);
        //         // tempFolder.getEntities().then((entities) => {
        //         //     console.log(entities);
        //         // })
        //         // console.log(temp, 'temptemptemptemptemptemptemp');
        //         // console.log(tempFolder, 'tempFolder');
        //         let folder: Folder = Folder.fromPath(tempPicturePath);
        //
        //         folder.getEntities().then((entities: FileSystemEntity[]) => {
        //             console.log(entities.length);
        //             entities.forEach((entity) => {
        //                 this.folderEntities.push({
        //                     name: entity.name,
        //                     path: path.join(entity.path),
        //                     modified: entity.lastModified.toString()
        //                 });
        //             });
        //         });
        //     })
        //     .then(() => {
        //         this.folderEntities.sort((a, b) => {
        //             return <any>new Date(b.modified) - <any>new Date(a.modified);
        //         });
        //     });
    }

    // #############################################

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        let context = imagePicker.create({
            mode: 'single'
        });

        context.authorize().then((val) => {
            this.getGalleryPhotos();
        });
    }

    // #############################################

    public onTap() {}

    getGalleryPhotos() {
        let MediaStore = android.provider.MediaStore;
        console.log('getGalleryPhotos');
        let photoList: Array<any> = [];
        let cursor = null;
        try {
            var context = app.android.context;
            let columns = [MediaStore.MediaColumns.DATA, MediaStore.MediaColumns.DATE_ADDED];
            let order_by = MediaStore.Images.Media.START;
            let uri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;

            cursor = context.getContentResolver().query(uri, columns, null, null, null);

            if (cursor && cursor.getCount() > 0) {
                while (cursor.moveToNext()) {
                    if (cursor.getColumnIndex(MediaStore.MediaColumns.DATA) > 5) {
                        break;
                    }

                    let column_index = cursor.getColumnIndex(MediaStore.MediaColumns.DATA);
                    let date_index = cursor.getColumnIndex(MediaStore.MediaColumns.DATE_ADDED)
                    let imageUri = cursor.getString(column_index) + '';
                    let date = cursor.getString(date_index);
                    let name = imageUri.substring(imageUri.lastIndexOf('.'));
                    // if(imageUri.indexOf('Camera') !== -1) {
                        let image = { fileUri: imageUri, text: name, date: date };
                        this.imageList.push(image);
                    // }
                }
                this.imageList = this.imageList.sort((a, b) => {
                    return b.date - a.date;
                });
            }

            var that = this;
            setTimeout(function () {
                let listview: RadListView = <RadListView>that.page.getViewById('listID');
            }, 2000);
        } catch (error) {
            console.log(error);
            console.log('getGalleryPhotos=>', JSON.stringify(error));
        }
    }
}
