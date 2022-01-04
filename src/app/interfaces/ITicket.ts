import {ISegment} from "./ISegment";

export interface ITicket {
  readonly price: number;
  readonly carrier: string;
  readonly segments: ISegment[];
}