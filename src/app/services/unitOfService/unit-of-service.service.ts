import { Injectable } from '@angular/core';
import { UserService } from '../userService/user.service';
import { OfficeService } from '../stationService/office.service';

@Injectable({
  providedIn: 'root'
})
export class UnitOfService {

  constructor(
    public userService: UserService,
    public officeService: OfficeService
  ) { }
}
