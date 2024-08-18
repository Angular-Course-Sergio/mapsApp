import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Map } from 'mapbox-gl';
import { environment } from '../../../../environments/environments';
import { PlacesService } from '../../services/places.service';

@Component({
  templateUrl: './polylines.component.html',
  styleUrl: './polylines.component.css',
})
export class PolylinesComponent implements AfterViewChecked {
  @ViewChild('map') divMap?: ElementRef;

  private mapInit: boolean = false;

  constructor(private placesService: PlacesService) {}

  get isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }

  ngAfterViewChecked(): void {
    if (this.isUserLocationReady && this.divMap && !this.mapInit) {
      this.initMap();
      this.mapInit = true;
    }
  }

  initMap(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    const map = new Map({
      accessToken: environment.mapbox_key,
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.placesService.userLocation,
      zoom: 9,
    });
  }
}
