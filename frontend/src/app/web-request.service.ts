import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http : HttpClient) { 
    this.ROOT_URL = 'http://localhost:3000';
  }

  get(){
    
  }
}
