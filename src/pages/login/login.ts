import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	public loginForm:FormGroup;
	public loading:Loading;

  constructor(public navCtrl: NavController, public authData: AuthProvider, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

  	this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser(){
      if (!this.loginForm.valid){
        console.log(this.loginForm.value);
      
      } else {
        //this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        //.then( authData => {
        //this.navCtrl.setRoot('HomePage');
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;

        this.authData.loginUser(email, password).then(authInfo => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(TabsPage,this.alertpx())
          });
        //})
        
      }, error => {
        this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });

        this.loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
        });
        this.loading.present();
      }
  }

  goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }

  goToSignup(): void { 
      this.navCtrl.push(SignupPage); 
  }

  alertpx(){
    let prompt = this.alertCtrl.create({
      title: 'Assist For You',
      message: "How Many Of Your Dine Here?",
      inputs: [
        {
          name: 'customer',
          placeholder: 'Person'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Save',
          handler: data => {
            this.alertTable();
          }
        }
      ]
    });
    prompt.present();
  }

  alertTable(){
    this.alertCtrl.create({
      title: 'Your Table Number Is',
      subTitle: '5',
      buttons: ['OK']
    }).present();
  }
  
}
