import { TestBed, inject } from '@angular/core/testing';

import { ValidaDocumentosService } from './valida-documentos.service';

describe('ValidaDocumentosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidaDocumentosService]
    });
  });

  it('should be created', inject([ValidaDocumentosService], (service: ValidaDocumentosService) => {
    expect(service).toBeTruthy();
  }));
});
