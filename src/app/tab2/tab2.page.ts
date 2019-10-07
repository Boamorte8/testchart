import { Component, OnInit, EventEmitter } from '@angular/core';
import { ChartService } from '../services/chart/chart.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  dataTemp = [
    {name: 'Fondo de Inversión Colectiva', ammount: 5600},
    {name: 'Renta Variable', ammount: 1800},
    {name: 'Renta Fija', ammount: 1000},
    {name: 'Fondo de Pensiones Voluntarias', ammount: 500},
    {name: 'Operación de Liquidez', ammount: 500},
    {name: 'Derivados', ammount: 700},
    {name: 'Cartera',  ammount: 1000}
  ];
  dataTotal = 0;
  title = '';
  value = '';
  labelsEmitter = new EventEmitter<any>();


  constructor(private chart: ChartService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.dataTotal = this.dataTemp.reduce(this.calculateTotal, 0);
    this.chart.drawDonutChart(this.dataTemp, this.dataTotal, this.labelsEmitter);
    this.labelsEmitter.subscribe(value => {
      console.log(value);
      this.title = value.title;
      this.value = value.value;
    });
  }

  calculateTotal = (accumulator: number, fondo: any) => accumulator + fondo.ammout;

}
