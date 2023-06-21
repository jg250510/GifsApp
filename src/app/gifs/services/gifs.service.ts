import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList : Gif[] = [];

  private _tagHistory : string[] = [];
  private apiKey: string ='MxjvRGYLlUYkUkBt6ZIETNaf4IbXvOt9';
  private serviceUrl : string = 'https://api.giphy.com/v1/gifs/'

  constructor(private http : HttpClient) { }

  get tagHistory(){
    return [...this._tagHistory];
  }

  searchTag(tag : string):void{
    if(tag.length === 0) return;
    this.organizaTagHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('q',tag)
    .set('limit',10);

    this.http.get<SearchResponse>(`${this.serviceUrl}search?`, {params})
            .subscribe(resp =>{
              this.gifList = resp.data; 
              console.log(this.gifList);
                           
            })
  }
  
  private organizaTagHistory(tag:string):void{
    tag = tag.toLowerCase();
    if(this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag != tag);
    }
  
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0,10);
  }

}
