import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import type { GiphyReponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {

    private http = inject(HttpClient)


    trendingGifs = signal<Gif[]>([])
    trendingGifsLoading = signal(true);

    constructor(){
        this.loadTrendingGifs();
        console.log('Servicio Contratado')
    }

 loadTrendingGifs(){ //Es un objeto que permite realizar las peticiones get, put, delet y patch
    this.http.get<GiphyReponse>( `${ environment.giphyUrl }/gifs/trending`, {
        params:{
            api_key: environment.giphyApiKey,
            limit: 20,
        }
    }).subscribe( (resp) => { //callback
        // resp.data[0].images.original.url

        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);

        console.log({ gifs });
    } )
 }

 searchGifs(query: string) {
    return this.http.get<GiphyReponse>( `${ environment.giphyUrl }/gifs/search`, {
        params:{
            api_key: environment.giphyApiKey,
            limit: 20,
            q: query,
        }
    }).pipe( //Operador RxJS
        map(({ data }) => data ),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items) ),
        
    );
    // .subscribe( (resp) => { //callback
    //     // resp.data[0].images.original.url

    //     const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
    //     console.log({ search: gifs });
    // } )
 }
    
}