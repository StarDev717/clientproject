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
import * as fromBuildingStore from "../../../buildings/store";

import { Project } from "../../models/project.model";
import "rxjs/add/observable/of";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {EditUserModalComponent} from '../../../users/edit-user-modal/edit-user-modal.component';
import {Router} from '@angular/router';
@Component({
  selector: "app-projects",
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ["projects.component.scss"],
  templateUrl: "./projects.component.html"
})


export class ProjectsComponent implements OnInit, AfterViewInit {
  projects$: Observable<Project[]>;
  projectsError$: Observable<String>;
  projectsLoading$: Observable<boolean>;
  settings = {
    add: {
      confirmCreate: true,
    },

    columns: {
      title: {
        title: 'Title'
      },
      createdBy: {
        title: 'Created By',
        addable: false,
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
      delete : false,
      create: {
        addButtonContent: '<i class="ft-plus"></i>',
        confirmCreate: true
      },
      custom: [
        { name: 'Edit', title: `<i class="ft-edit-2 primary font-medium-1 mr-2"></i>` },
        { name: 'Details', title: `<i class="ft-info info font-medium-1 mr-2"></i>` }
      ],
    }
  };

  data = [];

  constructor(private store: Store<fromStore.ProjectsState>, private modalService: NgbModal, public router : Router) {}

  ngOnInit() {
    this.updateProjectList()
    this.projects$.subscribe(
      (data)=>{
      this.data = data;
      console.log('projects', data)
    },
      (error) => {
        console.log('error', error)
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
      case 'Details':
        console.log("HELLO")
        this.router.navigate(['/projects', event.data.id, `details`])
        return;
      default:
        event.confirm.resolve();
        event.newData.createdBy = localStorage.getItem('userId')
        this.store.dispatch(new fromStore.CreateProject(event.newData));
        return;
    }
  }

  updateProjectList(){
    this.store.dispatch(new fromStore.LoadProjects());
    this.projects$ = this.store.pipe(select(fromStore.getAllProjects));
    this.projectsError$ = this.store.pipe(select(fromStore.getProjectsLoadedError));
    this.projectsLoading$ = this.store.pipe(select(fromStore.getProjectsLoading));
  }

  openContent(data) {
    const modalRef = this.modalService.open(EditUserModalComponent);
    modalRef.componentInstance.data = data;
  }
}
