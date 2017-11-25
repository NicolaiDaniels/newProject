import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
  export class StockDataService {

    constructor(private http: Http) {}

    getData(url:string) {
      return this.http.get(url)
            .map(this.extractData);
    }

    private extractData(res: Response) {
      return res.json();
    }

    private handleError(error: any) {
      let errMsg = (error.message)  ? error.message : error.status ? `${error.status} - ${error.message}` : 'Server error';
      console.log(errMsg);
      return Observable.throw(errMsg);
    }

  }
