import { Component, OnInit } from '@angular/core';
import {InscriptionService} from '../shared/inscription.service'
import { NgForm } from '@angular/forms';
import {Inscription} from '../shared/inscription.model'
import {Ecole} from '../shared/ecole.model'
import { from } from 'rxjs';

declare var M : any;
var ecoles=["edacy","ISI"];
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  providers:[InscriptionService]
})
export class InscriptionComponent implements OnInit {
  ecoles:Ecole[] = [
    {id:1, nom:'ISI'},
    {id:1, nom:'EDACY'},
    {id:1, nom:'ISM'}
  ];

  constructor(private inscriptionService:InscriptionService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshListInscription();
  }

  resetForm(form?: NgForm){
    if(form)
    form.reset();
    this.inscriptionService.selectedInscription = {
      _id:"",
      nom:"",
      prenom:"",
      adresse:"",
      telephone:"",
      email:"",
      ecole:""
    }
  }

  OnSubmit(form?: NgForm){
    if(form.value._id == ""){
      this.inscriptionService.postInscription(form.value).subscribe((res)=>{
        this.resetForm();
        this.refreshListInscription();
        M.toast({html:'enregitrer avec succes' , classes:'rounded'})
      });
    }
    else{
      this.inscriptionService.putInscription(form.value).subscribe((res)=>{
        this.resetForm();
        this.refreshListInscription();
        M.toast({html:'modifier avec succes' , classes:'rounded'})
      });
    }
    
  }

  refreshListInscription(){
    this.inscriptionService.listInscription().subscribe((res)=>{
      this.inscriptionService.inscriptions=res as Inscription[];
    });
  }
  OnEdit(ins:Inscription){
    this.inscriptionService.selectedInscription=ins;
  }

  OnDelete(_id:string,form:NgForm){
    if(confirm("etes vous sure de vouloir supprimer?")== true){
      this.inscriptionService.deleteInscription(_id).subscribe((res) =>{
        this.refreshListInscription();
        this.resetForm(form);
        M.toast({html:'supprimer avec succes' , classes:'rounded'})
      });
    }
  }
    
  

}
