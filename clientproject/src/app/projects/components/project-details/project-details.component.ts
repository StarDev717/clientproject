import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromUserStore from '../../../users/store';
import {Observable} from 'rxjs/Observable';
import {Project} from '../../models/project.model';
import {User} from '../../../users/models/user.model';
import * as fromBuildingStore from '../../../buildings/store';
import {EditBuildingModalComponent} from '../../../buildings/edit-building-modal/edit-building-modal.component';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  buildingsLoading$: Observable<boolean>;
  buildingsLoaded$: Observable<boolean>;
  employeesLoading$: Observable<boolean>;
  employeesLoaded$: Observable<boolean>;
  reportBuildings$: Observable<any>;
  reportEmployees$: Observable<any>;
  reports$ : Observable<any>
  reportProjections$: Observable<any>
  project$ : Observable<Project>
  users$ : Observable<User[]>
  buildings$ : Observable<User[]>
  projectId: number
  constructor(private route: ActivatedRoute, private store: Store<fromStore.ProjectsState>, private userStore: Store<fromUserStore.UsersState>, private modalService: NgbModal) {
    this.projectId = this.route.snapshot.params.id;
  }
  usersData = [];
  buildingsData = [];
  reportsData = [];
  employeesListForMap = [];
  buildingsListForMap = [];

  currentPage: string = "Projection Data"

  settings = {
    create: {
      createButtonContent: '<i class="ft-plus font-medium-1 mr-2"></i>',
    },
    add: {
      addButtonContent: '<i class="ft-plus font-medium-1 mr-2"></i>',
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
      delete: false,
      create: {
        confirmCreate: true
      },
      custom: [{ name: 'Edit', title: `<i class="ft-edit-2 info font-medium-1 mr-2"></i>` },
      ],
    }
  };

  buildingSettings = {
    add: {
      addButtonContent: '<i class="ft-plus font-medium-1 mr-2"></i>',
      confirmCreate: true,
    },
    columns: {
      title: {
        title: 'Title'
      },
      address: {
        title: 'Address'
      },
      city: {
        title: 'City'
      },
      state: {
        title: 'State'
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
      delete: false,
      create: {
        confirmCreate: true
      },
      custom: [{ name: 'Edit', title: `<i class="ft-edit-2 info font-medium-1 mr-2"></i>` },
      ],
    }
  };

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadSelectedProject({id : this.projectId}));
    this.project$ = this.store.pipe(select(fromStore.getSelectedProject));
    this.store.dispatch(new fromStore.LoadProjectBuildings({id: this.projectId}));
    this.buildings$ = this.store.pipe(select(fromStore.getProjectBuildings));
    this.buildingsLoading$ = this.store.pipe(select(fromStore.getProjectBuildingsLoading));
    this.employeesLoading$ = this.store.pipe(select(fromStore.getProjectEmployeesLoading));
    this.buildingsLoaded$ = this.store.pipe(select(fromStore.getProjectBuildingsLoaded));
    this.employeesLoaded$ = this.store.pipe(select(fromStore.getProjectEmployeesLoaded));

    this.buildings$.subscribe(async (data) => {
      if(data !== undefined && data !== null){
        this.buildingsData = Object.values(data);
      }
    });

    this.store.dispatch(new fromStore.LoadProjectEmployees({id: this.projectId}));
    this.users$ = this.store.pipe(select(fromStore.getProjectEmployees));
    this.users$.subscribe((data) => {
      if(data !== undefined && data !== null){
        this.usersData = Object.values(data);
      }
    });

    this.store.dispatch(new fromStore.LoadProjectReports({id: this.projectId}));
    this.reports$ = this.store.pipe(select(fromStore.getProjectReports));
    this.reports$.subscribe((data) => {
      if(data !== undefined && data !== null){
        this.reportsData = Object.values(data);
        console.log('reports$', this.reportsData)

        for(let report of this.reportsData){
          this.store.dispatch(new fromStore.LoadReportData({id: report.id}));
        }
      }
    });

    this.reportProjections$ = this.store.pipe(select(fromStore.getReportProjections));
    this.reportBuildings$ = this.store.pipe(select(fromStore.getReportBuildings));
    this.reportEmployees$ = this.store.pipe(select(fromStore.getReportEmployees));
    this.reportBuildings$.subscribe((data) => {
      if(data !== undefined && data !== null){
        console.log('reportBuildings$', data)
      }
    });
    this.reportProjections$.subscribe((data) => {
      if(data !== undefined && data !== null){
        console.log('reportProjections$', data)
      }
    });
  }


  onCustom(event) {
    switch (event.action){
      case 'Edit':
        this.openContent(event.data)
        return;
      default:
        event.confirm.resolve();
        return;
    }
  }

  openContent(data) {
    const modalRef = this.modalService.open(EditBuildingModalComponent);
    modalRef.componentInstance.data = data;
  }

  showPage(page: string) {
    this.currentPage = page;
  }
}
