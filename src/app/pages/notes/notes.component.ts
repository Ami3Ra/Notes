import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Notes } from 'src/app/core/interfaces/notes';
import { NotesService } from 'src/app/core/services/notes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  allNotes:Notes[]=[];
  searchValue:string = '';
  constructor(public dialog: MatDialog,
    private _NotesService:NotesService
  ) {}

  ngOnInit(): void {
      this._NotesService.getNotes().subscribe({
        next:(response)=>{
          if(response.msg === "done"){
            console.log(response);
            this.allNotes = response.notes;
          }
        }
      })
  }

  openDialog(noteData?:Notes): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data:{title:noteData?.title,content:noteData?.content,_id:noteData?._id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }


  deleteNotes(noteId:string,noteIndex:number):void{
    console.log(noteId,noteIndex);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then(()=>{
          this._NotesService.deleteNotes(noteId).subscribe({
            next:(response)=>{
              console.log(response)
              if(response.msg === "done"){
                this.allNotes.splice(noteIndex,1)
                this.ngOnInit();
              }
              
            }
          })
        })
      }
    });
  }
  updateNotes(noteDetailes:Notes,noteIndex:number){
    console.log(noteDetailes , noteIndex);
    this.openDialog({title:noteDetailes.title,content:noteDetailes.content,_id:noteDetailes._id})
  }

}
