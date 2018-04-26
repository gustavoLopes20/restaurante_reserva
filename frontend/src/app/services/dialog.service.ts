import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirm(title: string, mensagem:string, btCancel:boolean = true): Observable<boolean> {

      let dialogRef: MatDialogRef<DialogComponent>;

      dialogRef = this.dialog.open(DialogComponent);
      dialogRef.componentInstance.title = title;
      dialogRef.componentInstance.mensagem = mensagem;
      dialogRef.componentInstance.btCancel = btCancel;
    
    return dialogRef.afterClosed();
  }

}
