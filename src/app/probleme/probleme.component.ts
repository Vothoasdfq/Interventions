import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { IProbleme } from './probleme';
import { Router } from '@angular/router';
import { ProblemeService } from './probleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit{
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  probleme: IProbleme;
  errorMessage: string;
  route: Router;

  constructor (private fb: FormBuilder, private typeproblemeService: TypeproblemeService, private problemeService: ProblemeService){}
  
  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['' , [ Validators.required]],
      nom: ['', [ Validators.required]],
      typeProbleme: ['', [Validators.required]],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
      telephone: [{value: '', disabled: true}],
      notification: ['pasNotification'],
      descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
      noUnite: '',
      dateProbleme: {value: Date(), disabled: true}
    });

    this.typeproblemeService.obtenirTypesProbleme()
    .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
               error => this.errorMessage = <any>error);

    this.problemeForm.get('notification').valueChanges
    .subscribe(value => this.appliquerNotifications(value));
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
      telephoneControl.setValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)]);
    }

    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    courrielGroup.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
  }

  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
        // Copy the form values over the problem object values
        this.probleme = this.problemeForm.value;
        this.probleme.id = 0;
        // Courriel est dans un groupe alors que this.probleme n'a pas de groupe.  Il faut le transférer explicitement.
         if(this.problemeForm.get('courrielGroup.courriel').value != '')
        {
          this.probleme.courriel = this.problemeForm.get('courrielGroup.courriel').value;
        }

        this.probleme.noTypeProbleme = this.problemeForm.get('typeProbleme').value;

        this.problemeService.saveProbleme(this.probleme)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
          })
      } else if (!this.problemeForm.dirty) {
          this.onSaveComplete();
      }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    //this.route.navigate(['/accueil']);
  }
}