import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { AngularFirestore } from 'angularfire2/firestore';
/*
  Generated class for the DatabaseserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseserviceProvider {

  constructor(public http: Http) {
    console.log('Hello DatabaseserviceProvider Provider');
  }

}
