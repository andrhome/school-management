import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SubjectType } from '@app/types/common.types';
import * as actions from '@store/actions/subjects.actions';
import * as subjectsReducers from '@store/reducers/subjects.reducer';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'mts-work-characteristic',
  templateUrl: './work-characteristic.component.html',
  styleUrls: ['./work-characteristic.component.scss']
})
export class WorkCharacteristicComponent implements OnInit, OnDestroy {
  subjects: SubjectType[];
  private readonly onDestroy = new Subject<void>();

  public chartColors = {
    yellow: '#FEE500',
    orange: '#FF9900',
    green: '#0AB444',
    blue: '#3591FF',
    red: '#F84242',
    grey: '#E1E1E1',
    line: '#EBEBEB',
    axis: '#A4A9A8',
    labelLight: '#A4A9A8',
    labelDark: '#000000',
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: this.chartColors.labelDark,
          fontSize: 13,
        }
      }], yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true,
          fontColor: this.chartColors.labelLight,
          fontSize: 13,
        }
      }]
    },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  // public barChartPlugins = [pluginDataLabels];

  public labels = [
    {
      id: 'completion',
      translate: 'Завершенность',
      color: this.chartColors.orange,
      colorHover: this.chartColors.orange,
    },
    {
      id: 'creativity',
      translate: 'Креативность',
      color: this.chartColors.green,
      colorHover: this.chartColors.green,
    },
    {
      id: 'concentration',
      translate: 'Концентрация',
      color: this.chartColors.yellow,
      colorHover: this.chartColors.yellow,
    },
    {
      id: 'interest',
      translate: 'Интерес',
      color: this.chartColors.red,
      colorHover: this.chartColors.red,
    },
    {
      id: 'initiative',
      translate: 'Инициатива',
      color: this.chartColors.blue,
      colorHover: this.chartColors.blue,
    },
  ];

  public barChartData: ChartDataSets[] = [
    // {data: [2, 4, 3, 2, 5], label: this.labels[0].id, backgroundColor: this.labels[0].color, hoverBackgroundColor: this.labels.colorHover},
    // {data: [3, 0, 0, 4, 2], label: this.labels[1].id, backgroundColor: this.labels[1].color, hoverBackgroundColor: this.labels.colorHover},
    // {data: [2, 4, 5, 0, 0], label: this.labels[2].id, backgroundColor: this.labels[2].color, hoverBackgroundColor: this.labels.colorHover},
    // {data: [4, 2, 2, 5, 3], label: this.labels[3].id, backgroundColor: this.labels[3].color, hoverBackgroundColor: this.labels.colorHover},
    // {data: [2, 0, 0, 2, 4], label: this.labels[4].id, backgroundColor: this.labels[4].color, hoverBackgroundColor: this.labels.colorHover},
  ];

  constructor(
    private store: Store<subjectsReducers.State>
  ) {
  }

  ngOnInit() {
    this.createDataset();
    this.fetchSubjects();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  fetchSubjects(): void {
    // this.isLoading = true;
    const params = {
      page: 1,
      perPage: 100
    };
    this.store.dispatch(new actions.GetSubjects(params));
    this.store.select(state => state.subjects)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.subjects = res.subjects;
        this.barChartLabels = [];
        this.subjects.forEach((item) => {
          this.barChartData.forEach((dataSet) => {
            dataSet.data.push(this.getDataByType(item.id, dataSet.label));
          });
          this.barChartLabels.push(item.name.split(' '));
        });
      });
  }

  getDataByType(lessonId, type): number {
    return Math.random() * 5;
  }

  createDataset(): void {
    this.labels.forEach((bar) => {
      const dataTypeItem = {
        data: [],
        label: bar.id,
        backgroundColor: bar.color,
        hoverBackgroundColor: bar.colorHover
      };

      this.barChartData.push(dataTypeItem);
    });
  }

  higlightActive(active): void {
    const newData = [];

    this.barChartData.forEach((item, index) => {
      if (item.label === active.id) {
        item.backgroundColor = active.color;
        item.hoverBackgroundColor = active.colorHover;
        newData.unshift(item);
      } else {
        item.backgroundColor = this.chartColors.grey;
        item.hoverBackgroundColor = this.chartColors.grey;
        newData.push(item);
      }
    });

    this.barChartData = newData;
  }
}
