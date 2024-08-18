import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public userLocation?: [number, number];

  constructor() {
    this.getUserLocation();
  }

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },

        (error) => {
          alert('No se pudo obetener la geolocalización');
          console.log(error);
          reject();
        }
      );
    });
  }
}
