import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import { BaseSharedComponent } from '../pages/wizly-analytics/shared/base/base-shared.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise'
import { model } from './model';
import { QPRQueryObject } from './QPRQueryObject';



@Injectable()
export class QPRService extends BaseSharedComponent {

    
    objectid: string;
    modelid: string;
    url: string;
    private apiUrl: string;
    private headers = new Headers({'Content-Type': 'application/json'});

 //   hosts:Host[]; //will be changed acc to line 10 class
 

    constructor(private http: Http)
   
    {
        super();
       this.apiUrl = 'api/LoginService';  // URL to web api
    //  this.apiUrl='http://localhost/publish/api/Project';
}

    // getLogin(UserID :string,Username :string,URL:string,url:string): Observable<any>{
        
    //   // this.apiUrl+= "/" + UserID;
    //    this.apiUrl = 'api/Project';
    //  //  return this.http.get(this.apiUrl).map(response => response.json());
    //      return this.http.get(url+this.apiUrl+"/" + UserID+"/" + url+this.apiUrl+"/" + Username).map(response => response.json());
    // }


    postQPRQueryObject(queryObject: QPRQueryObject,url:string): Observable<any> {
        debugger;
    url=this.baseSession().url;
    this.apiUrl='api/QPRQueryObjectXML';
    let bodyString = JSON.stringify(queryObject); // Stringify payload
 
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option
 
    return this.http.put(url+this.apiUrl, bodyString, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                          .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

   

    
    getLogin(username,password, hostUrl,URL): Promise<model> {
        // hostUrl='http://localhost:62377/';
        debugger;
        let callURL = hostUrl + "api/QPRAuth?webServiceURL="+URL+"&username="+username+"&password="+password;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(callURL)
        .toPromise()
        .then(response => response.json() )
        .catch(this.handleError);
        } 
        // private handleError(error: any): Promise<any> {
        //     console.error('An error occurred', error); // for demo purposes only
        //     return Promise.reject(error.message || error);
        //     } 

 getviewload(username,password,hostUrl,URL,view_id): Promise<model> {
    //let callURL = hostUrl + "api/QPRAuth?webServiceURL="+URL+"&username="+username+"&password="+password;
    debugger;
    let callURL = this.url+"?PGPLUGIN&*44&uip="+this.baseSession().uip+"&FMT=p&tpl=popup_viewsettings.tpl&LAN=en%2c1&MODELID=" +this.modelid+"&OBJECTID=" +this.objectid+"&ZOOM=&VIE=" +this.baseSession().view_id+"&SMI=&PERIOD=latestforall";   
    debugger;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(callURL)
    
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
    } 
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
        }      
 



//Create and Update method
    
}


