import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Injectable()
export class AdminService {

  constructor(private httpClient: HttpClient, private localStorage: AsyncLocalStorage) { }



}
