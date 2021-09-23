import { FilterParameter } from "./filterparameter.model";

export class DataFilter {
    parameters: FilterParameter[] = [];
    sortBy: string;
    sortOrder: string;
    pageIndex: number = 0;
    pageSize: number = 20;
    isAnd: boolean = false;

    // this property used in only UI 
    total!: number;
}