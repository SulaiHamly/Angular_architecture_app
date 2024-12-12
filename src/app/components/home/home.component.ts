import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SalesChartComponent } from '../../sales-chart/sales-chart.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, SalesChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
