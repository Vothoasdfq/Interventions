import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';

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
      typeProbleme: ['', [Validators.required]],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
      telephone: [{value: '', disabled: true}]
    });

    this.typeproblemeService.obtenirTypesProbleme()
    .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
               error => this.errorMessage = <any>error);  

  }

  appliquerNotifications(typeNotification: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const courrielGroup = this.problemeForm.get('courrielGroup');
    const telephoneControl = this.problemeForm.get('telephone');
    
    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();
    
    if (typeNotification == "parCourriel"){
      courrielControl.enable();
      courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);

      courrielConfirmationControl.enable();
      courrielConfirmationControl.setValidators([Validators.required]);

      courrielGroup.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);

    } else if (typeNotification == "parTelephone"){
      telephoneControl.enable();
      telephoneControl.setValidators([Validators.required, Validators.pattern('[0-9]+')]);
    }

    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    courrielGroup.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
  }

  save(): void {
  }
}