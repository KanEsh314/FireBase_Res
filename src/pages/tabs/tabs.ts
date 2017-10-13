import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;

  constructor(public navCtrl:NavController,public authData: AuthProvider) {

  }

getLogout(){
  this.authData.logoutUser().then(logInfo => {
    this.navCtrl.setRoot(LoginPage);
  });
}
}
