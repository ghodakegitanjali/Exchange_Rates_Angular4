import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class DataService {

    private apiUrl = 'https://api.exchangeratesapi.io/';
    result: any;
    constructor(private http: Http) {}

    getRates(base, date): Observable<any> {
        let url: string;


        if (base) {
            url = this.apiUrl  + date + '?base=' + base;
        } else {
            url = this.apiUrl;
        }

        // Get rates from API
        return this.http.get(url)
            .map(result => this.result = result.json());
        }
}
