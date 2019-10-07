import { Injectable, EventEmitter } from '@angular/core';

import { Platform } from '@ionic/angular';

import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  dataDonutChart: any[] = [];
  prevData = [];
  data = [];

  margin = 50;
  width: number;
  height: number;
  radius: number;
  innerRadius: number;
  minHeightOrWidth: number;

  color = d3.scaleOrdinal()
        .range([
          '#E83E7F', '#FD7BAD', '#EA6200', '#FFB640', '#42D7CE',
          '#01BDE9', '#A3B7D6', '#878787', '#008FD9'
        ]);

  svg: any;
  g: any;
  arc: any;
  arcOver: any;
  pie: any;
  path: any;
  duration = 850;
  transition: any;
  labelArc: any;
  labelTotal: any;

  constructor(private platform: Platform) {
    this.width = 900 - (this.margin * 2);
    this.height = 900 - (this.margin * 2);
    this.minHeightOrWidth = Math.min(this.height, this.width);
    this.radius = this.minHeightOrWidth / 2;
    this.innerRadius = this.radius - 50;
  }

  drawDonutChart(data: any[], total: number, labelEmitter: EventEmitter<any>) {
    this.initDonutSvg();
    this.drawDonut(data, total, labelEmitter);
  }

  initDonutSvg() {
    this.svg = d3.select('#donutChart')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 ' + this.minHeightOrWidth + ' ' + this.minHeightOrWidth);

    this.g = this.svg.append('g')
        .attr('transform', 'translate(' + this.radius + ',' + this.radius + ')');

    this.arc = d3.arc()
        .outerRadius(this.radius - 10)
        .innerRadius(this.innerRadius);

    this.pie = d3.pie()
        .sort(null)
        .value((d: any) => d.ammount);

    this.transition = d3.transition()
        .duration(this.duration)
        .ease(d3.easeQuadIn);

    this.labelArc = d3.arc()
        .outerRadius(this.radius - (this.radius - 10))
        .innerRadius(this.radius - (this.radius - 10));

  }

  drawDonut(data = [], total: number, labelEmitter: EventEmitter<any>) {
    const path = this.g.selectAll('g')
        .data(this.pie(data))
        .enter()
        .append('path').attr('class', 'arc')
        // .transition(this.transition)
        .attr('d', this.arc)
        .style('fill', (d: any) => this.color(d.data.name))
        .style('cursor', 'pointer');

    labelEmitter.emit({
      title: 'Total',
      value: total
    });

    // const labels = this.svg.append('g')
    //     .attr('class', 'label-container');

    // labels.append('text')
    //     .attr('transform', 'translate(' + (this.height / 2) + ',' + (this.width / 2) + ')')
    //     .attr('class', 'label-title')
    //     .text('Prueba title');

    // labels.append('text')
    //     .attr('transform', (d: any) => 'translate(' + this.labelTotal.centroid(d) + ')')
    //     .attr('class', 'label-text')
    //     .text('Prueba text');

    const part = this.g.selectAll('path')
            .on('click', onClick)
            .on('mouseenter', onHover)
            .on('mouseout', onHoverOut);

    function onClick(data) {
      console.log('On Click', data);

    }

    function onHover(data, ...params) {
      const arcOver = d3.arc()
            .outerRadius(this.radius)
            .innerRadius(this.innerRadius - 10)
            .startAngle(data.startAngle)
            .endAngle(data.endAngle);
      d3.select(this)
      .transition()
      .duration(this.duration)
      // .transition(this.transition)
      // .attr('d', arcOver)
      .attr('stroke', this.style.fill)
      .attr('stroke-width', 15)
      .style('opacity', '.85');

    }

    function onHoverOut(data) {

      d3.select(this)
      // .transition(this.transition)
      // .attr('d', this.arc)
      .attr('stroke-width', 0)
      .style('opacity', '1');
    }
    // g.append('text').attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
    //     .attr('dy', '.35em')
    //     .text((d: any) => d.data.party);

    // g.append('text').attr('transform', (d: any) => 'translate(' + this.labelPer.centroid(d) + ')')
    //     .attr('dy', '.35em')
    //     .text((d: any) => d.data.electionP + '%');
  }



  updateDonut(data) {
    let prevPieById = [];
    let currentDonut = this.pie(data)
  }
}
