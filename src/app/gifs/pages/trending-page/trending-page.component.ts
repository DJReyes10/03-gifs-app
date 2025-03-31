import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.service';


@Component({
  selector: 'app-trending-page',
  // imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent { 
  gifService = inject(GifService)

  scrollDivRef = viewChild<ElementRef>('groupDiv')

  //El viewChild y viewChildren sirven para tomar informacion o referencias a piezas del html
  //El viewChild, funciona para un solo elemento
  //El viewChildren sirvan para uno o mas elementos.
onScroll( event: Event) {
  const scrollDiv = this.scrollDivRef()?.nativeElement
  
  if (!scrollDiv )return;

  const scrollTop = scrollDiv.scrollTop;
  const clientlHeight = scrollDiv.clientHeight
  const scrollHeight =  scrollDiv.scrollHeight

  const isAttBottom =  scrollTop + clientlHeight +300 >=scrollHeight

  if (isAttBottom) {
    this.gifService.loadTrendingGifs();
  }

  //El simbolo ? es porque al momento que el componente se construye todavia no existe el html

}
  // gifs = computed ( () => this.gifService.trendingGifs() )
}
