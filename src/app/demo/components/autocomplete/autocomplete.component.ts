import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'ms-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  autocompleteHTML: string = `
<md-input-container>
  <input type="text" mdInput [mdAutocomplete]="auto">
</md-input-container>

<md-autocomplete #auto="mdAutocomplete">
  <md-option *ngFor="let option of options" [value]="option">
    {{ option }}
  </md-option>
</md-autocomplete>
`;

  formControl: FormControl;

  options: any[];

  constructor() { }

  ngOnInit() {
    this.formControl = new FormControl();

    this.options = [
      'Apple',
      'Apricot',
      'Avocado',
      'Banana',
      'Bilberry',
      'Blackberry',
      'Blackcurrant',
      'Blueberry',
      'Boysenberry',
      'Currant',
      'Cherry',
      'Cherimoya',
      'Cloudberry',
      'Coconut',
      'Cranberry',
      'Cucumber',
      'Custard apple',
      'Damson',
      'Date',
      'Dragonfruit',
      'Durian',
      'Elderberry',
      'Feijoa',
      'Fig',
      'Goji berry',
      'Gooseberry',
      'Grape',
      'Raisin',
      'Grapefruit',
      'Guava',
      'Honeyberry',
      'Huckleberry',
      'Jabuticaba',
      'Jackfruit',
      'Jambul',
      'Jujube',
      'Juniper berry',
      'Kiwi',
      'Kumquat',
      'Lemon',
      'Lime',
      'Loquat',
      'Longan',
      'Lychee',
      'Mango',
      'Marionberry',
      'Melon',
      'Cantaloupe',
      'Honeydew',
      'Watermelon',
      'Miracle fruit',
      'Mulberry',
      'Nectarine',
      'Nance',
      'Olive',
      'Orange',
      'Blood orange',
      'Clementine',
      'Mandarine',
      'Tangerine',
      'Papaya',
      'Passionfruit',
      'Peach',
      'Pear',
      'Persimmon',
      'Physalis',
      'Plantain',
      'Plum',
      'Prune (dried plum)',
      'Pineapple',
      'Plumcot (or Pluot)',
      'Pomegranate',
      'Pomelo',
      'Purple mangosteen',
      'Quince',
      'Raspberry',
      'Salmonberry',
      'Rambutan',
      'Redcurrant',
      'Salal berry',
      'Salak',
      'Satsuma',
      'Star fruit',
      'Solanum quitoense',
      'Strawberry',
      'Tamarillo',
      'Tamarind',
      'Ugli fruit',
      'Yuzu',
    ];
  }

  getEscaped(text: string) {
    return _.escape(text);
  }

}
