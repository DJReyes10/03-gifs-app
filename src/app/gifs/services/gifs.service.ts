import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import type { GiphyReponse } from '../interfaces/giphy.interface';

@Injectable({providedIn: 'root'})
export class GifService {

    private http = inject(HttpClient)

    constructor(){
        this.loadTrendingGifs();
    }

 loadTrendingGifs(){ //Es un objeto que permite realizar las peticiones get, put, delet y patch
    this.http.get<GiphyReponse>( `${ environment.giphyUrl }/gifs/trending`, {
        params:{
            api_key: environment.giphyApiKey,
            limit: 20,
        }
    })
 }
    
}