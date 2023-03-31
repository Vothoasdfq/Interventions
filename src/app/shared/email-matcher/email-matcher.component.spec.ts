import { AbstractControl } from "@angular/forms";
import { ProblemeComponent } from "src/app/probleme/probleme.component";
import { emailMatcherValidator } from "./email-matcher.component";

describe('', () => {
    let component: ProblemeComponent;
    
    it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
        component.appliquerNotifications("parCourriel");

        let zone = component.problemeForm.get('courriel');
        expect(zone.enable).toBeTruthy();
    });
  
    it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
      
    });
  
    it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
      
    });
  
    it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
      
    });
  
    it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
      
    });
  
    it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
      
    });
  
    it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
      
    });
  
    it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
      
    });
  
    it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
      
    });
});