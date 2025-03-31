import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from '../../../services/gifs.service';

interface MenuOption {
  label: string;
  subLabel: string;
  route: string;
  icon: string;
}



@Component({
  selector: 'gifs-side-menu-options',
  imports: [ RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class GifsSideMenuOptionsComponent {

  gifService = inject(GifService)
menuOptions:MenuOption[]= [
{
  label: 'Trending',
  subLabel: 'Gifs Populares',
  route: '/dashboard/trending',
  icon: 'fa-solid fa-chart-line',
  
},
{
  label: 'Buscador',
  subLabel: 'Buscar gifs',
  route: '/dashboard/search',
  icon: 'fa-brands fa-searchengin',
  
},
// {
//   label: 'Historial',
//   subLabel: 'Hisorial de gifs',
//   route: '/dashboard/search',
//   icon: 'fa-solid fa-clock-rotate-left',
// }
]


 }
