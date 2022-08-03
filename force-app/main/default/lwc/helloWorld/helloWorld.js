import { api, LightningElement, track, wire } from 'lwc';

import {NavigationMixin} from 'lightning/navigation';

export default class helloWorld extends NavigationMixin (LightningElement) {
  @api title;
  @api greetings;
  @track greeting;
   
    //Using @wire decorator in lwc for the lightning data table
    @track accData;
    @track errorAccData; 

    @track columnTable =[
        {label:'Name',fieldName:'Name',type:'text'},
        {label:'Phone',fieldName:'Phone',type:'text'},
        {label:'Industry',fieldName:'Industry',type:'text'},
        {label:'Site',fieldName:'Site',type:'text'},

    ];
/*
    @wire(getAccountList)
    
    dataTableAcc({data, error}){
         if(data){
           this.accData = data;
        }
        else if(error){
          this.errorAccData = error;  
        } 

    }*/
/***imperative CALL  */
getAccountLists(){
    getAccountList().then(
        result=>{
            this.accData=result;
        }
    )
    .catch(error=>{
        console.log('error#' +error) ;
    })
}







}