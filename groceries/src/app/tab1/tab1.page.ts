/* eslint-disable prefer-const */
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = 'Grocery';


  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController,
    public dataService: GroceriesServiceService, public inputService: InputDialogServiceService,
    public socialSharing: SocialSharing)  {}

  loadItems(){
    return this.dataService.getItems();
  }

  async removeItem(item, index){
    const toast = await this.toastCtrl.create({
      message: 'Removing - ' + item.name + '...',
      duration: 3000,
    });
    toast.present();

    this.dataService.removeItem(index);
  }

  async shareItem(item, index){
    const toast = await this.toastCtrl.create({
      message: 'Sharing - ' + item.name + '...',
      duration: 3000,
    });
    toast.present();

    let message = 'Grocery item - Name : ' + item.name + ' - Quantity: ' + item.Quantity;
    let subject = 'Shared via Groceries App';

    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log('Shared Succesffully!');
    }).catch(() => {
      // Sharing via email is not possible
      console.error('Error while sharing ', Error);
    });
  }


  async editItem(item, index){
    const toast = await this.toastCtrl.create({
      message: 'Editing - ' + item.name + '...',
      duration: 3000,
    });
    toast.present();

    this.inputService.showPrompt(item, index);
  }


  addItem() {
    console.log('adding item');
    this.inputService.showPrompt();
  }

}






