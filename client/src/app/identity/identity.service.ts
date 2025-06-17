import { ResetPassword } from './../shared/models/ResetPasword';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ActiveAccount } from '../shared/models/ActiveAccount';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  helper = new JwtHelperService();
  baseUrl=environment.baseUrl
  constructor(private http: HttpClient) { }

  register(form:any) {
    return this.http.post(this.baseUrl+'Account/register',form)
  }
  active(param: ActiveAccount) {
    return this.http.post(this.baseUrl+'Account/active-account',param)
  }
  Login(form: any) {
    return this.http.post(this.baseUrl+'Account/Login',form)
  }
  ForGetPassword(email: string) {
    return this.http.get(this.baseUrl+`Account/send-email-password?email=${email}`)
  }
  ResetPassword(param:ResetPassword) {
    return this.http.post(this.baseUrl + "Account/reset-password" , param);
  }

  logout() {
    return this.http.post(this.baseUrl + 'Account/logout', {});
  }

  


}
