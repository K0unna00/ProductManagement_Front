import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../models/apiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(protected http : HttpClient) { }

  get<T>(action: string): Observable<T> {
    return this.http.get<ApiResponse<T>>(`${action}`).pipe(
      map(response => {
        if (response.isSuccess) {
          return response.data;
        } else {
          throw new Error(response.errorMessage);
        }
      }),
      catchError(this.handleError)
    );
  }

  post<T>(action: string , model : T) : Observable<any>{
    return this.http.post<ApiResponse<T>>(action,model).pipe(
      map(response => {
        if (response.isSuccess) {
          return response.data;
        } else {
          throw new Error(response.errorMessage);
        }
      }),
      catchError(this.handleError)
    );
  }

  update<T>(action : string, id: string, model : T) : Observable<T>{

    console.log(model);

    return this.http.put<ApiResponse<T>>(action + id, model).pipe(
      map(response => {
        if (response.isSuccess) {
          return response.data;
        } else {
          throw new Error(response.errorMessage);
        }
      }),
      catchError(this.handleError)
    );
  }

  delete<T>(action : string) : Observable<any>{
    return this.http.delete<ApiResponse<T>>(action).pipe(
      map(response => {
        if(!response.isSuccess){
          throw new Error(response.errorMessage);
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }



  handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    // if (error.error instanceof ErrorEvent) {
    //   errorMessage = `Error: ${error.error.message}`;
    // } else if (error.error?.errorMessage) {
    //   errorMessage = error.error.errorMessage;
    // }
    return throwError(() => new Error(errorMessage));
  }
}
