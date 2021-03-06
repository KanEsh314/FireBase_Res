import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(afAuth: AngularFireAuth,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      const authObserver = afAuth.authState.subscribe( user => {
      if (!user) {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = TabsPage;
        authObserver.unsubscribe();
      }
    });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

