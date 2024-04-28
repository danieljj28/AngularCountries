import { Country } from '../../interfaces/country.interface';
import { CountriesService } from './../../services/countries.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: []
})
export class ByCapitalPageComponent implements OnInit{

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor( private countriesService: CountriesService){}

  // Se incializa con los valores del objeto cacheStore, el cual recibe los valores del localStoerage.
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  // Cada page exceptuando Country, tiene su llamada al método especificado para el en el services,
  // pasando el termino necesario para url.
  // El método del service devuelbe un observable al cual nos suscribimos y así podemos mostrar la información

  searchByCapital( term: string): void {
    this.isLoading = true;
    this.countriesService.searchByCapital( term )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      })
  }


}
