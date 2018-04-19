import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public title: string;
  public mensagem: string;
  public btCancel:boolean;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit() {


  }

  onKeyDown(event: any) {
    let tecla:number = event.keyCode;
    if (tecla == 13)
      this.dialogRef.close(true);
  }

  onClickBt(confirm:boolean){
    this.dialogRef.close(confirm);
  }


}
