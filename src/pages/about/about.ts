import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

	public menuList:Array<any>;
	public loadedmenuList:Array<any>;
	public menuRef:firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authData: AuthProvider) {
  	this.menuRef = firebase.database().ref('/menus');

  	this.menuRef.on('value', menuList => {
  		let menus = [];
  		menuList.forEach(menu => {
  			menus.push(menu.val());
  			return false;
  		});

  		this.menuList = menus;
  		this.loadedmenuList = menus;
  	});
  }

  initializeItems() {
  	this.menuList = this.loadedmenuList;
  	//console.log(this.menuList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  getItems(searchbar){

  	console.log("Working");

  	this.initializeItems();

  	var q = searchbar.target.value;

  	if (!q) {
  		return;
  	}

  	this.menuList = this.menuList.filter((v) => {
  		if(v.foodname && q){
  			if(v.foodname.toLowerCase().indexOf(q.toLowerCase()) > -1){
  				return true;
  			}
  			return false;
  		}
  	});

  	console.log(q,this.menuList.length);

  }

}
