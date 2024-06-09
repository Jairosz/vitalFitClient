import { Injectable } from '@angular/core';
import { UserResponse } from '../types/userresponse';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  usuario : UserResponse | null = null

  
    constructor() { }
}
