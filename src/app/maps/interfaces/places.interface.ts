export interface PlacesResponse {
  type:        string;
  query:       string[];
  features:    Feature[];
  attribution: string;
}

export interface Feature {
  id:            string;
  type:          FeatureType;
  place_type:    PlaceType[];
  relevance:     number;
  properties:    Properties;
  text_es:       string;
  place_name_es: string;
  text:          string;
  place_name:    string;
  center:        number[];
  geometry:      Geometry;
  context:       Context[];
}

export interface Context {
  id:           string;
  mapbox_id:    string;
  text_es:      string;
  text:         string;
  wikidata?:    Wikidata;
  language_es?: Language;
  language?:    Language;
  short_code?:  ShortCode;
}

export enum Language {
  Es = "es",
}

export enum ShortCode {
  MX = "mx",
  MXSon = "MX-SON",
}

export enum Wikidata {
  Q189138 = "Q189138",
  Q46422 = "Q46422",
  Q681340 = "Q681340",
  Q934086 = "Q934086",
  Q96 = "Q96",
}

export interface Geometry {
  coordinates: number[];
  type:        GeometryType;
}

export enum GeometryType {
  Point = "Point",
}

export enum PlaceType {
  Poi = "poi",
}

export interface Properties {
  foursquare: string;
  landmark:   boolean;
  category:   Category;
  address?:   string;
}

export enum Category {
  AmericanRestaurantAmericanFoodRestaurant = "american restaurant, american food, restaurant",
  WingsFastFood = "wings, fast food",
}

export enum FeatureType {
  Feature = "Feature",
}
