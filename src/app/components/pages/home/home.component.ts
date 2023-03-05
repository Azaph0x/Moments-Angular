import { Component, OnInit } from '@angular/core';

import { Moment } from 'src/app/Moment';
import { MomentService  } from 'src/app/services/moment.service';

import { environment  } from 'src/environments/invironment';

import { faSearch } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  allMoments: Moment[] = [];
  moments: Moment[] = [] // lista com filtro
  baseApiUrl: string = environment.baseApiUrl

  faSearch = faSearch;
  searchTerm: string = '';

  // todo search

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data

      data.map(item => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR')
      })

      this.allMoments = data
      this.moments = data
    });

  }

  search(event: Event) {
    const target = event.target as HTMLInputElement
    const value = target.value

    this.moments = this.allMoments.filter(moment => moment.title.toLowerCase().includes(value))
  }

}
