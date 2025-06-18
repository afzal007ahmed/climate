export interface OpenCageResponse {
  documentation: string;
  licenses: License[];
  rate: Rate;
  results: OpenCageResult[];
  status: Status;
  stay_informed: StayInformed;
  thanks: string;
  timestamp: Timestamp;
  total_results: number;
}

export interface License {
  name: string;
  url: string;
}

export interface Rate {
  limit: number;
  remaining: number;
  reset: number;
}

export interface Status {
  code: number;
  message: string;
}

export interface StayInformed {
  blog: string;
  twitter: string;
}

export interface Timestamp {
  created_http: string;
  created_unix: number;
}

export interface OpenCageResult {
  annotations: Annotations;
  bounds: Bounds;
  components: Components;
  confidence: number;
  formatted: string;
  geometry: Geometry;
}

export interface Annotations {
  DMS?: LatLngString;
  MGRS?: string;
  Maidenhead?: string;
  Mercator?: {
    x: number;
    y: number;
  };
  OSM?: {
    edit_url: string;
    note_url: string;
    url: string;
  };
  UN_M49?: {
    regions: Record<string, string | number>;
    statistical_groupings: string[];
  };
  callingcode?: number;
  currency?: Currency;
  timezone?: Timezone;
  what3words?: {
    words: string;
  };
  wikidata?: string;
}

export interface LatLngString {
  lat: string;
  lng: string;
}

export interface Currency {
  alternate_symbols: string[];
  decimal_mark: string;
  html_entity: string;
  iso_code: string;
  iso_numeric: string;
  name: string;
  smallest_denomination: number;
  subunit: string;
  subunit_to_unit: number;
  symbol: string;
  symbol_first: number;
  thousands_separator: string;
}

export interface Timezone {
  name: string;
  now_in_dst: number;
  offset_sec: number;
  offset_string: string;
  short_name: string;
}

export interface Bounds {
  northeast: Geometry;
  southwest: Geometry;
}

export interface Components {
  [key: string]: string | undefined;
  city?: string;
  town?: string;
  village?: string;
  country: string;
  country_code: string;
  state?: string;
  postcode?: string;
  suburb?: string;
  continent?: string;
}

export interface Geometry {
  lat: number;
  lng: number;
}
