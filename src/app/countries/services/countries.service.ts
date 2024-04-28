import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError,map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})

export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  // Objeto creado para guardar los datos de busqueda de cada page. Y así no perderlos a la hora de cambiar
  // de url.

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  }

  constructor(private http: HttpClient){
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(){
    localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ) )
  }

  private loadFromLocalStorage(){
    if( !localStorage.getItem('cacheStore') ) return;
    this.cacheStore = JSON.parse ( localStorage.getItem('cacheStore')! );
  }

  // Método el cual va a hacer la llamada a la Api, teniendo en cuenta la url recibida.
  // La url puede ser de byCountry, byCapital o byRegion.
  // El operador pipe, sirve para poder trabajar con la respuesta del observable antés incluso de que
  // se retorne el valor y por lo tanto de que alguien se haya suscrito.
  private getCountriesRequest( url: string ): Observable<Country[]>{
    return this.http.get<Country[]>( url )
    .pipe(
      catchError( () => of([]) )
    )
  }

  // Método que se diferencia de los otros 3 de abajo.
  // Sirve para mostrar la información ampliada de un país en concreto.
  // El operador Map sirve para la modificación de la respuesta del observable.
  searchCountryByAlphaCode ( code: string ): Observable<Country|null >{
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError( () => {
          return of(null);
        })
      )
  }

  // Los 3 métodos siguientes llaman al  método getCountriesRequest, cada uno le pasa su propio argumento.
  // El operador tap sirve para crear una copia exacta de la respuesta del observable, pero no se puede
  // utilizar su valor fuera del pipe.
  // En este caso el primer tap sirve para guardar los valores necesarios en el objeto cacheStore.
  // El segundo tap simplemente llama  al método que va a persitir los datos en el localStorage.
  searchByCapital ( term: string ): Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = { term, countries}),
        tap( () => this.saveToLocalStorage() )
      )
  }

  searchByCountry( term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCountries = { term, countries}),
        tap( () => this.saveToLocalStorage() )
      )
  }

  searchRegion( region: Region): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byRegion = { region, countries}),
        tap( () => this.saveToLocalStorage() )
      )
  }
}
