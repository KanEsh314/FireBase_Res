import { Component } from '@angular/core';
import { NavController, Loading} from 'ionic-angular';
import firebase from 'firebase';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public loading:Loading;

  public items: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('/items');
  
  constructor(public navCtrl: NavController, public authData: AuthProvider) {

  }

ionViewDidLoad() {
  this.itemRef.on('value', itemSnapshot => {
    // Here we'll work with the list
console.log(itemSnapshot)
    this.items = [];
    itemSnapshot.forEach( itemSnap => {
      this.items.push(itemSnap.val());
      return false;
    });
  });
}

openAddItem() {
	this.navCtrl.push('AddItemPage');
}

getSearch(){
  this.navCtrl.push(AboutPage)
}
}