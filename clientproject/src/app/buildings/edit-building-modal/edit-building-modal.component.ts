import {Component, Input, ViewChild, OnInit} from "@angular/core";
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import * as fromStore from '../store';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-edit-building-modal',
  templateUrl: './edit-building-modal.component.html',
  styleUrls: ['./edit-building-modal.component.scss']
})
export class EditBuildingModalComponent implements OnInit {
  @ViewChild('f') floatingLabelForm: NgForm;
  @ViewChild('vform') validationForm: FormGroup;
  @Input() data;
  regularForm: FormGroup;
  radioOptions = ['Option one is this', 'Option two can be something else'];
  constructor(private store: Store<fromStore.BuildingsState>, public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.regularForm = new FormGroup({
      'firstName': new FormControl(this.data.firstName, [Validators.required]),
      'lastName': new FormControl(this.data.lastName, [Validators.required]),
      'email': new FormControl(this.data.email, [Validators.required, Validators.email]),
    }, {updateOn: 'blur'});
  }

  updateInput(event, field) {
    console.log('data', event.target.value)
    this.data = {
      ...this.data,
      [field]: event.target.value
    }

  }

  onReactiveFormSubmit() {
    console.log('this.regularForm', this.regularForm)
    this.regularForm.value.id = this.data.id;
    this.store.dispatch(new fromStore.UpdateBuilding(this.data));
  }

}
