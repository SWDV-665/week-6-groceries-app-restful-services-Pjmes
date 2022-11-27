import { Injectable } from '@angular/core';
import { GroceriesServiceService } from './groceries-service.service';
import { AlertController } from '@ionic/angular';

@Injectable()
export class InputDialogServiceService {

  constructor(public dataService: GroceriesServiceService, public alertCtrl: AlertController) { }

  async showPrompt(item?, index?) {
    const prompt = this.alertCtrl.create({
      header: item ? 'Edit Item' : 'Add Item',
      message: item ? 'Please edit items...' : 'Please enter item...',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {//Cannot add a drop down to alerts in Ion. Added a min max field to click the quantities up or down.
          name: 'quantity',
          placeholder: 'Quantity',
          type: 'number',
          min: 1,
          max: 100,
          value: item ? item.quantity : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          // eslint-disable-next-line @typescript-eslint/no-shadow
          handler: data => {
            console.log('Saved clicked', data);
            if (index !== undefined){
              item.name = data.name;
              item.quantity = data.quantity;
              this.dataService.editItem(item, index);
            }
            else{
            this.dataService.addItem(data);
            }
          }
        }
      ]
    });
    (await prompt).present();
  }
}
