import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api/placesApiClient';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private placesHttp = inject(PlacesApiClient);

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

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

  getPlacesByQuery(query: string = '') {
    if (!this.userLocation) return;

    this.isLoadingPlaces = true;

    this.placesHttp
      .get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.userLocation.join(','),
        },
      })
      .subscribe((res) => {
        console.log(res.features);

        this.isLoadingPlaces = false;
        this.places = res.features;
      });
  }
}
