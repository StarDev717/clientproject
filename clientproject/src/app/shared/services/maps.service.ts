import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MapsService {

  public lat: number = 43.678418;
  public lng: number = -79.809007;
  public zoom: number = 8;

  public icons: any = {
    user :  {
      url: 'https://www.shareicon.net/data/512x512/2017/05/22/886133_map_512x512.png', // gives a data://<value>
      scaledSize: {
        height: 50,
        width: 50
      }
    },
    building :   {
      url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // gives a data://<value>
      scaledSize: {
        height: 30,
        width: 30
      }
    },
  };

  public newCoordinators = new Subject();

  public openWindow = new Subject();



  constructor() { }

}
