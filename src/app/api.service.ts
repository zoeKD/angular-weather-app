import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(private http: Http) {
  }

  search_city(city){
        return this.http.get(`http://autocomplete.wunderground.com/aq?query=${city}&c=FR`).map(res => {
           return res.json()["RESULTS"].map(item => { return item.name });
        })
    }

  getWeatherData(city, date): Observable<Response> {
    return this.http
             .get(this.buildAPI(city, date))
             .map((response: Response) => {
                 return response.json();
             })
             // .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  private buildAPI(city, date) {
    const requestedCity = city.includes(",") ?  city.split(",")[0].replace(" ", "_") : city.replace(" ", "_");
    const requestedDate = date.replace(/\D/g,"");

    return `http://api.wunderground.com/api/4e5d1c46d03c86f5/history_${requestedDate}/q/FR/${requestedCity}.json`
  }
}
