import Bout from './bout';

export default Athlete;

export interface Athlete {
  _id?: string;
  name: string;
  ssn: string;
  club?: string;
  achievements: {
    diploma: {
      date: Date;
      boutsLeft: number;
    };
    bronz: {
      date: Date;
      boutsLeft: number;
    };
    silver: {
      date: Date;
      boutsLeft: number;
    };
    gold: {
      date: Date;
      boutsLeft: number;
    };
  };
}

export interface AthleteTab {
  _id?: string;
  name: string;
  ssn: string;
  club?: string;
  achievements: {
    diploma: {
      date: Date;
      boutsLeft: number;
    };
    bronz: {
      date: Date;
      boutsLeft: number;
    };
    silver: {
      date: Date;
      boutsLeft: number;
    };
    gold: {
      date: Date;
      boutsLeft: number;
    };
  };
  bouts: Bout[];
}

export interface newAthlete {
  _id?: string;
  name: string;
  ssn: string;
  club?: string;
}

export class AthleteForm {
  constructor(
    public _id?: string,
    public name?: string,
    public ssn?: string,
    public club?: string
  ) {}
}
