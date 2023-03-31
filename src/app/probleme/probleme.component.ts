import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit{
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;

  constructor (private fb: FormBuilder, private typeproblemeService: TypeproblemeService){}
  
  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['' , [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      nom: ['', [VerifierCaracteresValidator.longueurMaximal(50), Validators.required]],
      typeProbleme: ['', [Validators.required]]
    });

    this.typeproblemeService.obtenirTypesProbleme()
    .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
               error => this.errorMessage = <any>error);  

  }


  save(): void {
  }
}