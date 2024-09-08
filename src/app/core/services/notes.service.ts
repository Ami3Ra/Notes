import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Notes } from '../interfaces/notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _HttpClient:HttpClient) { }

  addNotes(noteData:Notes):Observable<any>{
    return this._HttpClient.post(environment.notesUrl , noteData , {
      headers:{
        token:localStorage.getItem('eToken') || ''
      }
    }
    
    );
  }
  getNotes():Observable<any>{
    return this._HttpClient.get(environment.notesUrl ,{
      headers:{
        token:localStorage.getItem('eToken') || ''
      }
    }
    
    );
  }
  deleteNotes(noteId:string):Observable<any>{
    return this._HttpClient.delete(`${environment.notesUrl}${noteId}`,{
      headers:{
        token:localStorage.getItem('eToken') || ''
      }
    }
    
    );
  }
  updateNotes(noteData:Notes,noteId:string):Observable<any>{
    return this._HttpClient.put(`${environment.notesUrl}${noteId}`,noteData , {
      headers:{
        token:localStorage.getItem('eToken') || ''
      }
    });
  }
}
