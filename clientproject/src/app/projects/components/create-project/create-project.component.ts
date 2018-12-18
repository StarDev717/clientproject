import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import * as fromStore from '../../../projects/store';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  @ViewChild('f') floatingLabelForm: NgForm;
  @ViewChild('vform') validationForm: FormGroup;
  regularForm: FormGroup;
  progresses = {
    buildings : 0,
    employees : 0,
  };
  public messages = {
    buildings : 0,
    employees : 0,
  };

  constructor(private http: HttpClient, private store: Store<fromStore.ProjectsState>, ) { }

  ngOnInit() {
    this.regularForm = new FormGroup({
      'title': new FormControl('', [Validators.required]),
      'description': new FormControl('', []),
      // 'buildings': new FormControl('', [Validators.required]),
      // 'employees': new FormControl('', [Validators.required]),
    }, {updateOn: 'blur'});
  }

  onReactiveFormSubmit() {
    console.log('this.regularForm', this.regularForm.value)
    this.store.dispatch(new fromStore.CreateProject(this.regularForm.value));
  }

  upload(files, key) {
    if(files.length === 0)
      return;

    // this.regularForm.value[key] = files[0];


    const formData = new FormData();
    for (let file of files)
      formData.append(file.name, file);

    const uploadReq = new HttpRequest('POST', `http://localhost:51013/api/upload/`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      console.log('event', event)
      if(event.type === HttpEventType.UploadProgress)
        this.progresses[key] = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response){
        let res = <any>event.body;
        this.messages[key] = res.msg.toString();
        this.regularForm.value[key] = res.fileName.toString();
      }
    });
  }

}
