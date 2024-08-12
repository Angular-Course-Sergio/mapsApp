import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';
import { environment } from '../../../../environments/environments';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  // public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(
    -109.95176143233326,
    27.50671078875679
  );

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      accessToken: environment.mapbox_key,
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentLngLat,
      zoom: 13,
    });
  }

  createMarker() {
    if (!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);
  }
}
