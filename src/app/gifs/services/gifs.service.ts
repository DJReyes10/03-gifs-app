import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import type { GiphyReponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const Gif_Key = 'gifs';

const loadFromLocalStorage = () => {
    const gifsFromLocalStorage = localStorage.getItem(Gif_Key) ?? '{}';
    const gifs = JSON.parse(gifsFromLocalStorage);
    console.log(gifs);
    return gifs;
}




@Injectable({providedIn: 'root'})
export class GifService {

    private http = inject(HttpClient)


    trendingGifs = signal<Gif[]>([])
    trendingGifsLoading = signal(true);

    searchHistory = signal<Record<string, Gif[]>>( loadFromLocalStorage() );
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

    constructor(){
        this.loadTrendingGifs();
    }

    saveGifsToLocalStorage = effect(() => {
        const historyString =JSON.stringify(this.searchHistory());
        localStorage.setItem(Gif_Key, historyString);
    })

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

 searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyReponse>( `${ environment.giphyUrl }/gifs/search`, {
        params:{
            api_key: environment.giphyApiKey,
            limit: 20,
            q: query,
        }
    }).pipe( //Operador RxJS
        map(({ data }) => data ),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items) ),


    //Historial

        tap( items =>{
            this.searchHistory.update( history => ({
               ...history,
               [query.toLowerCase()]: items
            }))
        }) 
            
        
        
    );
    // .subscribe( (resp) => { //callback
    //     // resp.data[0].images.original.url

    //     const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
    //     console.log({ search: gifs });
    // } )
 }

 getHistoryGifs( query: string ):Gif[] {
    return this.searchHistory()[query] ?? [];
 }
}