import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Loading, rootURL } from '../model/type.model';

@Injectable({
    providedIn: 'root'
})

export class AccountService {

    constructor(private http: HttpClient, private router: Router, private store: Store<Loading>) { }

    async login(email: string, password: string) {
        return this.http.post(`${rootURL}/account/signin`, { email, password })
            .toPromise()
            .then((res: any) => {
                localStorage.setItem('token', res.data.token);
                return res;
            })
            .catch(err => err);
    }

    async logout() {
        localStorage.removeItem('token');
        this.store.dispatch({
            type: 'USER_LOGOUT',
            user: {
                _id: null,
                name: null,
                email: null
              }
          });
        return this.router.navigateByUrl('signin');
    }

    async check() {
        const token = localStorage.getItem('token');
        if (!token) {
            //this.store.dispatch({ type: 'LOADED' });
            return Promise.reject('Token not provider!');
        }
        else {
            const headers = new HttpHeaders({ token });
            return this.http.post(
                `${rootURL}/account/check`, // uri
                null, // body
                { headers, observe: 'response' } // headers
            )
                .toPromise()
                .then((res: any) => {
                    if (res.body.code === 1) {
                        //this.store.dispatch({ type: 'LOADED' });
                        return res.body;
                    } else {
                        return this.router.navigateByUrl('/signin');
                    }
                })
                .catch(err => err);
        }
    }

    async changeUserInfo(formData: FormData): Promise<any> {
        const token = localStorage.getItem('token');
        if (!token) {
            //this.store.dispatch({ type: 'LOADED' });
            return this.router.navigateByUrl('/signin');
        }
        const headers = new HttpHeaders({ token });
        return this.http.post(
            `${rootURL}/account/update`,
            formData,
            { headers }
        )
            .toPromise()
            .then((res: any) => {
                this.store.dispatch({
                    type: 'USER_INFO',
                    user: res.data
                });
                return res;
            })
            .catch(err => err);
    }
}
