import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ViewEncapsulation, Input
} from "@angular/core";

import {select, Store} from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import * as fromStore from "../../store";
import { User } from "../../models/user.model";
import "rxjs/add/observable/of";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {EditUserModalComponent} from "../../edit-user-modal/edit-user-modal.component";
import {MapComponent} from "../../../map/components/map/map.component";
import {Router} from "@angular/router";
@Component({
  selector: "app-users",
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ["users.component.scss"],
  templateUrl: "./users.component.html"
})


export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  selectedColumnFilter: string = "firstName";
  rows = [];

  temp = [];
  display='none';


  monthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  settings = {
    columns: {
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      },
    },
    attr: {
      class: "table table-responsive"
    },
    delete:{
      deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>'
    },
    actions: {
      edit: false,
      custom: [
        { name: 'Edit', title: `<i class="ft-edit-2 info font-medium-1 mr-2"></i>` },
        { name: 'Details', title: `<i class="ft-info info font-medium-1 mr-2"></i>` },
      ],
    }
  };

  data = [
    {
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
    {
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    },
    {
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
    {
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    },
    {
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
    {
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    },
    {
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
    {
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    },
    {
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
    {
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    },
    {
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
    {
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    },
    {
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
    {
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    },
    {
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
    {
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    },
    {
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
    {
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    },
    {
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
    {
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    }
  ];

  building = {
    title : "1900 West Loop South",
    address: "1900 West Loop South Fwy",
    lat: 29.747741,
    lng: -95.457658,
    city: "Houston",
    state: "TX",
    country: "USA",
    zip: "77027"
  }

  employee = {
    firstName : "Ankur",
    lastName: "Patel",
    address: "2001 Gemini St",
    lat: 29.567129,
    lng: -95.110846,
    city: "Houston",
    state: "TX",
    country: "USA",
    phone: "8326149706",
    email: "ankur@pronetcre.com",
    logo: 'https://admin.atmiyaevents.com/public/uploads/63beb1d68deda474d938164b8532717f.jpg?1532702665575',
    name: 'Ankur Patel',
    icon: 'https://www.ftsgps.com/wp-content/uploads/2017/05/icon-location-100.png',
    zip: "77058"
  }

  employeeData = this.employee

  constructor(private store: Store<fromStore.UsersState>, private modalService: NgbModal, private router: Router,) {}

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadUsers());
    this.users$ = this.store.pipe(select(fromStore.getAllUsers));
  }

  onCustom(event) {
    console.log('event', event)
    switch(event.action){
      case "Edit":
        this.openContentMap(event.data)
        console.log('event.action', event.action)
        return;
      case "Details":
        this.router.navigate(['/projects',3])
        return;
    }
  }

  openModal(){
    this.display='block';
  }

  openContent(data) {
    const modalRef = this.modalService.open(EditUserModalComponent);
    modalRef.componentInstance.data = data;
  }

  openContentMap(data) {
    const modalRef = this.modalService.open(MapComponent, { size: 'lg'});
    modalRef.componentInstance.employee = this.employee;
    modalRef.componentInstance.building = this.building;
  }

  onCloseHandled(){
    this.display='none';
  }

}
