import { Component, Input, OnInit } from "@angular/core";
import { MapsAPILoader, MouseEvent } from "@agm/core";
import { Marker } from "../../../shared/models";
import { LocationsService } from "../../../shared/services/locations.service";
import { MapsService } from "../../../shared/services/maps.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  @Input() employees;
  @Input() buildings;
  @Input() reportId;
  public lat: number;
  public employeeIcon : string;
  public buildingIcon : string;
  public lng: number;
  public zoom: number;
  public origin: {};
  public destination: {};
  public openedWindow: number;
  public openedType: string;
  options = {
    suppressMarkers: true
  };
  public markers: Marker[] = this.locationService.getMarkers();

  constructor(
    private locationService: LocationsService,
    private mapApiLoader: MapsAPILoader,
    private mapsService: MapsService,
  ) {
    this.employeeIcon = this.locationService.userIcon;
    this.buildingIcon = this.locationService.buildingIcon;

  }

  ngOnInit() {
    console.log('employees',this.reportId, this.employees);
    console.log('buildings',this.reportId, this.buildings);
    // this.origin = {
    //   lat: this.employee.lat,
    //   lng: this.employee.lng
    // };
    //
    // this.destination = {
    //   lat: this.building.lat,
    //   lng: this.building.lng
    // };
    this.lat = this.employees[0].employeeLat;
    this.lng = this.employees[0].employeeLong;
    this.zoom = this.mapsService.zoom;

    this.setCurrentPosition();
    this.mapApiLoader.load();

    // Zoom to new location after search
    this.mapsService.newCoordinators.subscribe(
      (coords: { lat: number; lng: number; zoom: number }) => {
        if (coords) {
          console.log('coords', coords)
          this.lat = coords.lat;
          this.lng = coords.lng;
          this.zoom = coords.zoom;
          this.mapApiLoader.load();
        }
      }
    );

    // Open window after click on panel
    this.mapsService.openWindow.subscribe(index => {
      this.openedWindow = +index;
    });
  }

  mapClicked($event: MouseEvent) {
    console.log($event);
  }

  clickedMarker(label: string, index: number, type: string) {
    console.log(`Clicked the marker: ${label || index}`);
    this.openedWindow = index;
    this.openedType = type;
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = this.mapsService.lat = position.coords.latitude;
        this.lng = this.mapsService.lng = position.coords.longitude;
        console.log('this.lat', position.coords)
        this.zoom = 10;
      });
    }

    // @Todo: resort the locations
  }

  isInfoWindowOpen(index: number, type: string) {
    return this.openedWindow === index && this.openedType === type;
  }
}
