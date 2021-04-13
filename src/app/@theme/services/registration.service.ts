import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  uploadImage(data):any{
    return this.httpClient.post('https://api.cloudinary.com/v1_1/dpemsdha5/image/upload', data)
  }

  addAttendance(data):any{
    return this.httpClient.post(this.commonService.envUrl() + 'api/attendance', data);

  }

  updateAttendance(data):any{
    return this.httpClient.put(this.commonService.envUrl() + 'api/attendance', data);

  }

  getAttendanceByEmployeeId(id):any{
    return this.httpClient.get(this.commonService.envUrl() + 'api/attendance/latest/byEmployeeId?id='+id);
  }

  getAttendenceByEmpId(data):any{
    return this.httpClient.post(this.commonService.envUrl() + 'api/attendance/latest/byEmployeeIdDateAndShift', data)
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
 
}
