import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notes } from 'src/app/core/interfaces/notes';
import { NotesService } from 'src/app/core/services/notes.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notes,
    private _NotesService:NotesService){
      console.log(data);
    }
   
    

  noteForm:FormGroup = new FormGroup({
    //                                   case updeate     case add
    title: new FormControl(this.data.title? this.data.title :''),
    content: new FormControl(this.data.content? this.data.content :''),
  })

  handleUserAction():void{
    if(!this.data.title && !this.data.content){
      this.addNewNote()
    }else{
      this.updataNote()
    }
    
  }

  addNewNote():void{
    let userDataAdd = this.noteForm.value;
    console.log(userDataAdd);
    this._NotesService.addNotes(userDataAdd).subscribe({
      next:(response)=>{
        if(response.msg === "done"){
          console.log(response);
          this.dialogRef.close();
        }
       
      }
    })
  }
  updataNote():void{
    let userDataAdd = this.noteForm.value;
    console.log(userDataAdd);
    this._NotesService.updateNotes(userDataAdd,this.data._id).subscribe({
      next:(response)=>{
        if(response.msg === "done"){
          console.log(response);
          this.dialogRef.close();
        }
       
      }
    })
  }
  
}
