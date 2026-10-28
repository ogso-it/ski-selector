import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { DataServiceService, SkiProfile } from '../data-service.service';

/*
 * Champs renseignés par chaque étape, dans l'ordre du questionnaire.
 * L'étape N n'est accessible que si les étapes 1 → N-1 sont complètes.
 */
const STEP_FIELDS: (keyof SkiProfile)[][] = [
  ['height', 'weight'],   // step1
  ['skiLevel'],           // step2
  ['terrainType'],        // step3
  ['typeSnow'],           // step4
  ['turns'],              // step5
  ['stable'],             // step6
  ['skiStyleFun']         // step7
];

function firstIncompleteStep(profile: SkiProfile): number {
  const index = STEP_FIELDS.findIndex(fields =>
    fields.some(field => profile[field] === null || profile[field] === undefined || profile[field] === '')
  );

  return index === -1 ? STEP_FIELDS.length + 1 : index + 1;
}

/**
 * Redirige vers la première étape incomplète si l'utilisateur
 * tente d'accéder directement à une étape plus avancée.
 * `data.step` = numéro de l'étape (8 pour la page résultats).
 */
export const stepGuard: CanActivateFn = route => {
  const router = inject(Router);
  const profile = inject(DataServiceService).profile;

  const requestedStep: number = route.data['step'] ?? 1;
  const allowedStep = firstIncompleteStep(profile);

  if (requestedStep <= allowedStep) {
    return true;
  }

  return router.createUrlTree([`/ski/step${allowedStep}`]);
};
