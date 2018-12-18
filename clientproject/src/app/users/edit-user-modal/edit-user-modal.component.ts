import {Component, Input, ViewChild, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {
  @ViewChild('f') floatingLabelForm: NgForm;
  @ViewChild('vform') validationForm: FormGroup;
  @Input() data;
  regularForm: FormGroup;
  radioOptions = ['Option one is this', 'Option two can be something else'];
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log('this.data', this.data.firstName)
    this.regularForm = new FormGroup({
      'firstName': new FormControl(this.data.firstName, [Validators.required]),
      'lastName': new FormControl(this.data.lastName, [Validators.required]),
      'phone': new FormControl(this.data.phone, [Validators.required]),
      'city': new FormControl(this.data.city, [Validators.required]),
      'zip': new FormControl(this.data.zip, [Validators.required]),
      'email': new FormControl(this.data.email, [Validators.required, Validators.email]),
      'address': new FormControl(this.data.address, []),
    }, {updateOn: 'blur'});
  }

  onReactiveFormSubmit() {
    console.log('this.regularForm', this.regularForm)
  }

}
