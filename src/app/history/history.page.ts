import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import * as moment from 'moment';
import {LuckMeterService} from '../service/luck-meter.service';
import {StorageService} from '../service/storage.service';

@Component({
  selector: 'app-list',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})
export class HistoryPage implements OnInit, OnDestroy {

  @ViewChild('lineCanvas') lineCanvas;

  lineChart: any;
  labels = [];
  data = [];
  min = 100;
  max = 0;

  countItemsToDisplay = 100;

  interval: any = false;

  constructor(private luck: LuckMeterService, private historyData: StorageService) {
    const sub = this.historyData.baseDataEvent.subscribe(() => {
      this.data = this.historyData.baseData;
      this.labels = this.historyData.labelsList;
      this.initChart();
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.realChart();
      sub.unsubscribe();
    });
  }

  ngOnInit() {
    this.historyData.getBaseList();
  }

  initChart() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,  // this.labels,
        datasets: [
          {
            label: 'Luck history %',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.data,
            spanGaps: false,
          }
        ]
      }
    });
  }

  chartChack() {
    const n = Math.random();
    console.log(' n : ', Math.round(n * 10));
    this.lineChart.data.datasets[0].data.push(Math.round(n * 10));
    this.lineChart.update();
  }

  private realChart() {
    let dumpCounter = 0;
    this.interval = setInterval(() => {
      const percent = this.luck.calc(100).average;
      if (this.luck.getCenter() !== 0) {
        this.lineChart.data.labels.push(moment().format('HH:mm:ss'));
        this.lineChart.data.datasets[0].data.push(percent);

        const l = this.lineChart.data.datasets[0].data.length;
        if (l > this.countItemsToDisplay) {
          this.lineChart.data.datasets[0].data.shift();
          this.lineChart.data.labels.shift();
        }

        this.lineChart.update();
        dumpCounter++;
        if (dumpCounter >= 20) {
          dumpCounter = 0;
          this.historyData.setBaseList(this.lineChart.data.datasets[0].data, this.lineChart.data.labels);
          this.historyData.setLimit(100);
          this.historyData.setMaxMin(this.max, this.min, (this.max + this.min) / 2);
        }
      } else {
        console.log('Center should be seted');
      }

    }, this.luck.interval);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
