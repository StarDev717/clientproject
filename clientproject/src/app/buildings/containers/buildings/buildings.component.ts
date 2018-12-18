import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ViewEncapsulation, Input, AfterViewInit
} from '@angular/core';

import {select, Store} from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import * as fromStore from "../../store";
import { Building } from "../../models/building.model";
import "rxjs/add/observable/of";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {EditBuildingModalComponent} from "../../edit-building-modal/edit-building-modal.component";
@Component({
  selector: "app-buildings",
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ["buildings.component.scss"],
  templateUrl: "./buildings.component.html"
})


export class BuildingsComponent implements OnInit, AfterViewInit {
  buildings$: Observable<Building[]>;
  settings = {
    add: {
      confirmCreate: true,
    },
    columns: {
      firstName: {
        title: 'First Name'
      },
      lastName: {
        title: 'Last Name'
      },
      email: {
        title: 'Email'
      },
      phone: {
        title: 'Phone'
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
      create: {
        confirmCreate: true
      },
      custom: [{ name: 'Edit', title: `<i class="ft-edit-2 info font-medium-1 mr-2"></i>` },
      ],
    }
  };

  data = [];

  constructor(private store: Store<fromStore.BuildingsState>, private modalService: NgbModal) {}

  ngOnInit() {
    this.updateEmployessList()
    this.buildings$.subscribe((data)=>{
      this.data = data;
    })
  }

  ngAfterViewInit() {
    document.getElementsByClassName('ng2-smart-actions')['0'].style.width = '120px'
  }

  onCustom(event) {
    switch (event.action){
      case 'Edit':
        this.openContent(event.data)
        return;
      default:
        event.confirm.resolve();
        this.store.dispatch(new fromStore.CreateBuilding(event.newData));
        return;
    }
  }

  updateEmployessList(){
    this.store.dispatch(new fromStore.LoadBuildings());
    this.buildings$ = this.store.pipe(select(fromStore.getAllBuildings));
  }

  openContent(data) {
    const modalRef = this.modalService.open(EditBuildingModalComponent);
    modalRef.componentInstance.data = data;
  }
}
