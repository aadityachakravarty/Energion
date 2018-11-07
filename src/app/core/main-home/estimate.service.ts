import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EstimateService {

  constructor(private httpClient: HttpClient) { }

  onEstimate(address) {
    return this.httpClient.post('https://api-egn.nvixion.tech/matrix/est', address);
  }
}
