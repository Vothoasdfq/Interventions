import { AbstractControl } from "@angular/forms";
import { VerifierCaracteresValidator } from "./longueur-minimum.component";

describe('', () => {
    it('#7 | Une chaîne avec 10 espaces est invalide', () => {
        let control = { value: ' '.repeat(10) }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
    });

    it('#8 | Une phrase avec des mots est valide', () => {
        let control = { value: 'Vive angular'.repeat(1) }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull;
    });

    it('#9 | Une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        let control = { value: '   je le veux   '.repeat(1) }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull;
    });

});