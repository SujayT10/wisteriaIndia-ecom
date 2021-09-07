import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private oktaAuthService: OktaAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return from(this.handleAccess(req, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {

    // only add access token for secured endpoints
    const securedEndpoints = ["http://localhost:8081/api/orders"];

    if(securedEndpoints.some(url => request.urlWithParams.includes(url))){

      //get access token from secure endpoint
      const accessToken = await this.oktaAuthService.getAccessToken();

      //clone the request and add new header with access token
      request = request.clone({
         setHeaders:{
           Authorization: "Bearer " + accessToken
         }
      });
    }

    return next.handle(request).toPromise();
  }
}
