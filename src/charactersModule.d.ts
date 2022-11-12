declare namespace Character {
  export interface Info {
    count: number;
    pages: number;
    next: string;
    prev?: string;
  }

  export interface Origin {
    name: string;
    url: string;
  }

  export interface Location {
    name: string;
    url: string;
  }

  export interface Result {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: Date;
  }

  export interface Character {
    info: Info;
    results: Result[];
  }
}
