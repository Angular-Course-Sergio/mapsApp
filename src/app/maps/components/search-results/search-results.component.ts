import { Component, inject, Input } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { LngLatLike } from 'mapbox-gl';
import { MapService } from '../../services/map.service';
import { Feature } from '../../interfaces/places.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent {
  public selectedId: string = '';

  private placesService = inject(PlacesService);
  private mapService = inject(MapService);

  get isLoadingPlaces() {
    return this.placesService.isLoadingPlaces;
  }

  get loadedPlaces() {
    return this.placesService.places;
  }

  flyToPlace(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
  }
}
