import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private httpClient: HttpClient, 
    private commonService: CommonService
  ) { }

  
  
  addEmployee(empData): any {
    return this.httpClient.post(this.commonService.envUrl() + 'api/employee/add', empData);
  }

  updateEmployee(empData): any {
    return this.httpClient.put(this.commonService.envUrl() + 'api/employee/update', empData);

  }

  getEmployeeById(id):any{
    return this.httpClient.get(this.commonService.envUrl() + 'api/employee?id='+id);

  }

  getAllEmployee():any{
    return this.httpClient.get(this.commonService.envUrl() + 'api/employee/all');

  }

  updateAttendance(data):any{
    return this.httpClient.put(this.commonService.envUrl() + 'api/attendance', data);

  }

  getAttendanceByEmployeeId(id):any{
    return this.httpClient.get(this.commonService.envUrl() + 'api/attendance/latest/byEmployeeId?id='+id);
  }

  deleteEmployee(id): any{
    return this.httpClient.delete(this.commonService.envUrl() + 'api/employee?id='+id);

  }

  addQr(data){
    return this.httpClient.post(this.commonService.envUrl() + 'api/employee/add/document', data);

  }

  empIdExistOrNot(id):any{
    return this.httpClient.get(this.commonService.envUrl() + 'api/employee/exist?id='+id);
  }

  addAttendance(data):any{
    return this.httpClient.post(this.commonService.envUrl() + 'api/attendance', data);

  }


  //Image upload...
  uploadImage(data):any{
    return this.httpClient.post('https://api.cloudinary.com/v1_1/dpemsdha5/image/upload', data)
    //, {
      // reportProgress: true,
      // observe:'events'
  // }
    // .pipe(
    //    map(event => this.getEventMessage(event, data)),
    //    catchError(this.handleError)
    // );
  }

  private getEventMessage(event: HttpEvent<any>, data) {

    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);

      case HttpEventType.Response:
        return this.apiResponse(event);
        
      default:
        return `File "${data.get('profile').name}" surprising upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { status: 'progress', message: percentDone };
  }

  private apiResponse(event) {
    return event.body;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
 
}
