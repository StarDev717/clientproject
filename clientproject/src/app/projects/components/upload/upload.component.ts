import { Component } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'upload-component',
  templateUrl: './upload.component.html'
})
export class UploadComponent {
  projectId : number;
  public progress: number;
  public message: string;
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.projectId = this.route.snapshot.params['id'];
      console.log('params',this.projectId)
    });
  }

  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    const uploadReq = new HttpRequest('POST', `http://localhost:51013/api/upload/${this.projectId}/buildings`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
    });
  }
}
