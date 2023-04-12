import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';

import { ProblemeComponent } from './probleme.component';
import { TypeproblemeService } from './typeprobleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[TypeproblemeService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2))
    expect(zone.valid).toBeFalsy();
  });

  it('#2 | Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3))
    expect(zone.valid).toBeTruthy();
  });

  it('#3 | Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200))
    expect(zone.valid).toBeTruthy();
  });

  it('#4 | Zone PRÉNOM invalide avec aucune valeur', () => {
    let zone = component.problemeForm.controls['prenom'];
    let errors = zone.errors || {}
    expect(errors['aucuneValeur']).toBeFalsy();
  });

  it('#5 | Zone PRÉNOM invalide avec 10 espaces', () => {
    let zone = component.problemeForm.controls['prenom'];
    let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    zone.setValue(' '.repeat(10));
    let result = validatorFn(zone as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBe(true);
  });

  it('#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    zone.setValue('  a'.repeat(1));
    let result = validatorFn(zone as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBe(true);
  });

  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
   component.appliquerNotifications("");

   let zone = component.problemeForm.get('telephone');
   expect(zone.status).toEqual('DISABLED');

  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications("");

    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBeNull();
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications("");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.disabled).toBeTruthy();
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications("");

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.appliquerNotifications("parCourriel");

    let zone = component.problemeForm.get('telephone');
    expect(zone.disabled).toBeTruthy();
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications("parCourriel");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.enabled).toBeTruthy();
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
      component.appliquerNotifications("parCourriel");

      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
      expect(zone.enabled).toBeTruthy();
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications("parCourriel");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('');
    expect(zone.valid).toBeFalsy();
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications("parCourriel");

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('');
    expect(zone.valid).toBeFalsy();
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications("parCourriel");
    
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('abcdefgh');
    expect(zone.valid).toBeFalsy();
  });

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne INVALID', () => {
    component.appliquerNotifications("parCourriel");
    
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation')

    zoneCourriel.setValue('');
    zoneConfirmation.setValue('abcdef@test.com')

    let groupe = component.problemeForm.get('courrielGroup');
 
    expect(groupe.invalid).toBeTruthy();
  });

  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne INVALID', () => {
    component.appliquerNotifications("parCourriel");
    
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation')

    zoneCourriel.setValue('abcdef@test.com');
    zoneConfirmation.setValue('')

    let groupe = component.problemeForm.get('courrielGroup');
 
    expect(groupe.invalid).toBeTruthy();
  });

  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotifications("parCourriel");
    
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation')

    zoneCourriel.setValue('abcdef@test.com');
    zoneConfirmation.setValue('courrielreel@domainereel.com')

    let groupe = component.problemeForm.get('courrielGroup');
 
    expect(groupe.invalid).toBeTruthy();
  });

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.appliquerNotifications("parCourriel");
    
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation')

    zoneCourriel.setValue('abcdef@test.com');
    zoneConfirmation.setValue('abcdef@test.com')

    let groupe = component.problemeForm.get('courrielGroup');
 
    expect(groupe.valid).toBeTruthy();
  });

  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    component.appliquerNotifications("parTelephone");
    
    let zone = component.problemeForm.get('telephone');
    expect(zone.enabled).toBeTruthy();
  });

  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications("parTelephone");
    
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.disabled).toBeTruthy();
  });

  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications("parTelephone");
    
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.disabled).toBeTruthy();
  });

  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.appliquerNotifications("parTelephone");
    
    let zone = component.problemeForm.get('telephone');
    zone.setValue('');

    expect(zone.invalid).toBeTruthy();
  });

  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.appliquerNotifications("parTelephone");
    
    let zone = component.problemeForm.get('telephone');
    zone.setValue('abcde-ghrd');

    expect(zone.invalid).toBeTruthy();
  });

  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications("parTelephone");
    
    let zone = component.problemeForm.get('telephone');
    zone.setValue('123456789');

    expect(zone.invalid).toBeTruthy();
  });

  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications("parTelephone");
    
    let zone = component.problemeForm.get('telephone');
    zone.setValue('12345678900');

    expect(zone.invalid).toBeTruthy();
  });

  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications("parTelephone");
    
    let zone = component.problemeForm.get('telephone');
    zone.setValue('1234567890');

    expect(zone.valid).toBeTruthy();
  });
  
});
