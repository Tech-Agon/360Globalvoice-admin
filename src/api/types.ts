export type authData = {
  email?: string;
  password?: string;
  name?: string;
  phoneNo?: number | string;
  country?:string;}

export interface userIDdata {
  success: boolean;
  message: string;
  id: number;
}

export interface Candidate {
  name: string;
  country: string;
  biography: string;
  image: File | null;
}

export interface PollData {
  title: string;
  candidates: Candidate[];
}

export interface GoogleNewsParams {
  endpoint?: string;
  language?: string;
}
