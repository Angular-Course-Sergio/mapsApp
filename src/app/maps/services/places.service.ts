import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Feature, PlacesResponse } from '../interfaces/places.interface';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private http = inject(HttpClient);

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
    this.isLoadingPlaces = true;

    this.http
      .get<PlacesResponse>(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=10&proximity=-109.96149703496006,27.483862937859172&language=es&access_token=${environment.mapbox_key}`
      )
      .subscribe((res) => {
        this.isLoadingPlaces = false;
        this.places = res.features;
      });
  }
}
