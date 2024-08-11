import { AfterViewInit, Component } from '@angular/core';
import {Map} from 'mapbox-gl';
import { environment } from '../../../../environments/environments';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css',
})
export class FullScreenPageComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const map = new Map({
      accessToken: environment.mapbox_key,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
    });
  }
}
