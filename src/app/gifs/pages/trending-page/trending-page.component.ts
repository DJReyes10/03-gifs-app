import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';


@Component({
  selector: 'app-trending-page',
  // imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit { 
  scrollStateService = inject(ScrollStateService)
  gifService = inject(GifService)

  scrollDivRef = viewChild<ElementRef>('groupDiv')


  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement
  
    if (!scrollDiv )return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState()
  }

  //El viewChild y viewChildren sirven para tomar informacion o referencias a piezas del html
  //El viewChild, funciona para un solo elemento
  //El viewChildren sirvan para uno o mas elementos.
onScroll( event: Event) {
  const scrollDiv = this.scrollDivRef()?.nativeElement
  
  if (!scrollDiv )return;

  const scrollTop = scrollDiv.scrollTop;
  const clientlHeight = scrollDiv.clientHeight
  const scrollHeight =  scrollDiv.scrollHeight

  debugger;

  const isAttBottom =  scrollTop + clientlHeight +300 >=scrollHeight
  this.scrollStateService.trendingScrollState.set(scrollTop);

  if (isAttBottom) {
    this.gifService.loadTrendingGifs();
  }

  //El simbolo ? es porque al momento que el componente se construye todavia no existe el html

}
  // gifs = computed ( () => this.gifService.trendingGifs() )
}
