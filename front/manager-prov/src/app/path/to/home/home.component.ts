import { Component, OnInit } from '@angular/core';
import { PoGaugeModule,PoContainerModule,PoGaugeRanges } from '@po-ui/ng-components';
import { PoChartType, PoChartOptions, PoChartSerie, PoDialogService } from '@po-ui/ng-components';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  optInPerc: number = 96;
  forecastPerc: number = 80;
  seriesColumn : Array<PoChartSerie> = [];
  categoriesColumn: Array<string> = ['(delay in days)'];
  titleOptin: string = 'Opt-In'
  descOptin: string = 'Clients with opt-in'

  titleForecast: string = 'Forecast relationship (forecast x customers)'
  descForecast: string = 'Forecast quality'

  titleColumn: string = 'top 5 customers without communication (T-code)'

  forecastRanges: Array<PoGaugeRanges> = [
    { from: 0, to: 75, label: 'Lower than expected', color: '#c64840' },
    { from: 75, to: 90, label: 'Within expectation', color: '#ea9b3e' },
    { from: 90, to: 100, label: 'Better than expected', color: '#00b28e' }
  ];

  ngOnInit(): void {
    this.seriesColumn=[
      { label: 'TASDAS', data: [100], type: PoChartType.Column },
      { label: 'T251AS', data: [50], type: PoChartType.Column},
      { label: 'TAS25A', data: [10], type: PoChartType.Column},
      { label: 'T654A1', data: [5], type: PoChartType.Column}
    ];
  }
}
