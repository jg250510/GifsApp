import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.ts.component.html'
})
export class CardListComponentTsComponent {

  
  @Input()
  public gifs : Gif[] = [];

}
