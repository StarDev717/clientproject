import { Injectable } from '@angular/core';
import { Marker } from '../models';
import {MapsService} from './maps.service';

@Injectable()
export class LocationsService {

  userIcon = this.mapsService.icons.user;
  buildingIcon = this.mapsService.icons.building;

  // @Todo: replace markers by an API
  markers: Marker[] = [
    {
      lat: 43.678418,
      lng: -79.809007,
      title: 'A',
      origin:{
        lat: 43.678418,
        lng: -79.809007,
      },
      logo: 'https://admin.atmiyaevents.com/public/uploads/63beb1d68deda474d938164b8532717f.jpg?1532702665575',
      name: 'Ankur Patel',
      icon: this.userIcon,
      draggable: false,
      street: '123 Yonge Street',
      city: 'Toronto',
      state: 'ON',
      postalcode: '75201',
      email: 'test@example.com',
      phone: '111-111-1111',
      website: 'http://example.com',
      detail: 'InfoWindow content'
    },
    {
      lat: 43.678418,
      lng: -80.809007,
      title: 'B',
      origin:{
        lat: 43.678418,
        lng: -80.809007,
      },
      name: 'Arpan Patel',
      logo: 'https://admin.atmiyaevents.com/public/uploads/63beb1d68deda474d938164b8532717f.jpg?1532702665575',
      icon: this.userIcon,
      draggable: false,
      street: '123 Yonge Street',
      city: 'Toronto',
      state: 'ON',
      postalcode: '75201',
      email: 'test@example.com',
      phone: '111-111-1111',
      website: 'http://example.com',
      detail: 'InfoWindow content'
    },
    {
      lat: 43.978418,
      lng: -78.809007,
      title: 'C',
      origin:{
        lat: 43.978418,
        lng: -78.809007,
      },
      name: 'Vipul Patel',
      logo: 'https://admin.atmiyaevents.com/public/uploads/63beb1d68deda474d938164b8532717f.jpg?1532702665575',
      icon: this.buildingIcon,
      draggable: false,
      street: '2222 McKinney Ave Suite 120',
      city: 'Toronto',
      state: 'ON',
      postalcode: '75201',
      email: 'test@example.com',
      phone: '111-111-1111',
      website: 'http://example.com',
      detail: 'InfoWindow content'
    }
  ];

  constructor(private mapsService: MapsService) { }

  getMarkers() {
    return this.markers;
  }

}
