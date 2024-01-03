import { Injectable } from '@angular/core';
import { UserService } from '../userService/user.service';
import { StationService } from '../stationService/station.service';

@Injectable({
  providedIn: 'root'
})
export class UnitOfService {

  constructor(
    public userService: UserService = new UserService(),
    public stationService: StationService = new StationService()
  ) { }
}
