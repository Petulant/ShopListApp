import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Item } from 'ionic-angular';




declare var firebase;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items=[{
    name:'',
  keyname:''}
  ];
  itemKeys=[];

  name;
  cuisine={
    name:''
  };
  item:any;

  constructor(public navCtrl: NavController,public navParams:NavParams,private alertCtrl: AlertController) {

    firebase.database().ref('/cuisine/').on("value",(snapshot)=>{
      this.items=[]
      snapshot.forEach((snap)=>{
      console.log(snap.key);
  
      
      this.items.push({name:snap.val(),keyname:snap.key});
    
      
      });
      return false;
    });

 
  }
  doRefresh(refresher){
    console.log('Begin async operation',refresher);
 
    setTimeout(()=>{
      console.log('Async operation has ended');
      refresher.complete();
    },1000);
  }

//write to database
  writeCuisine(){
    this.items=[];
    console.log(this.name);
    this.cuisine.name=this.name;
    var database=firebase.database();
    database.ref('/cuisine/').push(this.cuisine);
  }
//update to database
updateDate(item){

  console.log(this.item)

  let alert = this.alertCtrl.create({
    title: 'Update Item',
    message: 'Do you want to update your List?',
    inputs: [
      {
        name: 'Update',
        placeholder: 'Update',
        type:'text'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: ()=> {
          console.log('Cancel clicked');
        }
      },

      {
        text: 'Update',
        handler: (data)=> {
          var database=firebase.database();
          database.ref('/cuisine/' + item).set({name:data.Update});
        }
      },
    
    
    ]
    });
    alert.present();

}

delete(item){
var database=firebase.database();
database.ref('/cuisine/' +item).remove();

}
}

