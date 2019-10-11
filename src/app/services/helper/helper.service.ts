import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private authService: AuthService,
              private router: Router) { }

  public checkIfAuthorized(): void {
    if (this.authService.isAuthorized) {
      this.router.navigate(['dashboard']);
    }
  }

  public prepareRequestDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }

  public floorToNearest(amount: number, precision: number) {
    return Math.floor(amount / precision) * precision;
  }

  public ceilToNearest(amount: number, precision: number) {
    return Math.ceil(amount / precision) * precision;
  }

  public getAgeStr(dob: string): string {
    const currentYear = new Date().getFullYear();
    const dobYear = new Date(dob).getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const dobMonth = new Date(dob).getMonth() + 1;
    const yearDifferent = (currentYear !== dobYear) ? (currentYear - dobYear) : null;
    let monthDifferent = (currentMonth !== dobMonth) ? (currentMonth - dobMonth) : null;
    let yearSubstr = '';
    let monthSubstr = '';

    if (yearDifferent) {
      yearSubstr = this.getYearSubstr(yearDifferent);
    }

    if (monthDifferent) {
      if (monthDifferent < 0) {
        monthDifferent = 12 - (12 - dobMonth);
      }
      monthSubstr = this.getMonthSubstr(monthDifferent);
    }

    const str1 = yearDifferent ? ` ${yearDifferent} ${yearSubstr}` : '';
    const str2 = monthDifferent ? ` ${monthDifferent} ${monthSubstr} ` : '';

    return str1 + str2;
  }

  private getYearSubstr(yearDifferent: number): string {
    if (yearDifferent === 1) {
      return 'год';
    } else if ((yearDifferent > 1) && (yearDifferent < 5)) {
      return 'года';
    } else {
      return 'лет';
    }
  }

  private getMonthSubstr(monthDifferent: number): string {
    if (monthDifferent === 1) {
      return 'месяц';
    } else if ((monthDifferent > 1) && (monthDifferent < 5)) {
      return 'месяця';
    } else {
      return 'месяцев';
    }
  }

  public setUpTimeFormat(date: Date): string {
    const hours = (date.getHours() < 10) ? ('0' + date.getHours()) : date.getHours();
    const minutes = (date.getMinutes() < 10) ? ('0' + date.getMinutes()) : date.getMinutes();

    return hours + ':' + minutes;
  }

  public getCurrentWeek(currentDate: Date = new Date()): Array<string> {
    const current = currentDate;
    const week = [];

    for (let i = 1; i <= 7; i++) {
      const first = current.getDate() - current.getDay() + i;
      const day = new Date(current.setDate(first)).toISOString().slice(0, 10);
      week.push(day);
    }

    return week;
  }

  public dateIsLess(firstDate: Date, secondDate: Date): boolean {
    secondDate.setHours(0);
    secondDate.setMinutes(0);
    secondDate.setSeconds(0);
    secondDate.setMilliseconds(0);

    return firstDate.getTime() < secondDate.getTime();
  }

  public getWeekNumber(date: any): number {
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    const yearStart: any = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);

    return weekNo - 34;
  }
}
