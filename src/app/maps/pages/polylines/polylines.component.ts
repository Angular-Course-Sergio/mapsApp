import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { environment } from '../../../../environments/environments';
import { PlacesService } from '../../services/places.service';
import { MapService } from '../../services/map.service';

@Component({
  templateUrl: './polylines.component.html',
  styleUrl: './polylines.component.css',
})
export class PolylinesComponent implements AfterViewChecked {
  @ViewChild('map') divMap?: ElementRef;

  private mapInit: boolean = false;

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) {}

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
      zoom: 14,
    });

    this.mapService.setMap(map);

    const popup = new Popup().setHTML(`
      <h6>Aquí estoy</h6>
      <span>Estoy en este lugar del mundo</span>
      `);

    new Marker({
      color: 'red',
    })
      .setLngLat(this.placesService.userLocation!)
      .setPopup(popup)
      .addTo(map);
  }

  goToMyLocation() {
    this.mapService.flyTo(this.placesService.userLocation!);
  }
}
