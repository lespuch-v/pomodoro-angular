import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { Animations } from './anim/anim.module';
const randomColor = require('randomcolor');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [Animations.animeTrigger1],
})
export class AppComponent {
  myColor = randomColor();

  buttonValues: number[] = [25, 50, 90];
  buttonBreaks: number[] = [2, 5, 15];

  mainImage = 'assets/images/pom.png';
  myTimer: any;
  takeUserTime: any;
  mainTimer: string = '';
  seconds: number = 59;
  status = 'STATUS';
  isTimerRunning = false;

  isTimeSelected = false;
  selectedTime: number = 0;
  debugValues: any;
  startNew_round = false;

  // user custom input
  userInput: any;

  // * Animations
  show = false;
  get stateName() {
    return this.show ? 'show' : 'hide';
  }
  toggle() {
    this.show = !this.show;
  }

  //* Animations

  // Pomodoro Start
  handleStart($event: MouseEvent) {
    const button = event?.target as HTMLButtonElement;
    this.debugValues = button.id;
    this.selectedTime--;
    this.isTimerRunning = !this.isTimerRunning;

    // Observable
    this.myTimer = timer(1000, 1000);
    this.isTimeSelected = false;
    this.takeUserTime = this.myTimer.subscribe((val: number) => {
      this.myColor = randomColor();
      this.handleCalculations();
      this.seconds--;
      if (this.selectedTime == 0 && this.seconds == 0) {
        this.isTimerRunning = !this.isTimerRunning;
        this.status = "Time's Up!";
        this.mainTimer = '00:00';
        this.show = !this.show;
        this.startNew_round = true;
        this.isTimeSelected = false;
        this.takeUserTime.unsubscribe();
        this.userInput = null;
      }
      if (this.seconds < 0) {
        this.selectedTime--;
        this.seconds = 59;
      }
    });
  }
  // Select time
  handleOption($event: MouseEvent) {
    this.isTimeSelected = !this.isTimeSelected;
    const selectButton = $event?.target as HTMLButtonElement;
    this.debugValues = selectButton.id;
    this.selectedTime = Number(selectButton.id);
    this.toggle();

    // Status change
    if (
      this.selectedTime == 25 ||
      this.selectedTime == 50 ||
      this.selectedTime == 90
    ) {
      this.status = 'WORKING';
    } else if (
      this.selectedTime == 2 ||
      this.selectedTime == 10 ||
      this.selectedTime == 15
    ) {
      this.status = 'BREAK';
    }

    // Trigger restart function
    if (this.startNew_round === true) {
      this.restart(this.selectedTime);
    }
  }

  handleCalculations() {
    this.mainTimer = String(
      `${this.selectedTime}:${
        this.seconds > 9 ? this.seconds : '0' + this.seconds
      }`
    );
  }

  restart(userSelection: number) {
    // RESTART CODE
    this.startNew_round = false;
    this.selectedTime = userSelection;
    this.mainTimer = '00:00';
    this.seconds = 59;
  }

  // Handle user custom timer
  handleCustomTimer($event: any) {
    const inputValue = $event as HTMLInputElement;
    this.userInput = inputValue;
    console.log(inputValue);
    this.toggle();

    if (this.userInput < 0) {
      this.userInput = 0;
    }

    if (this.userInput != 0 || null) {
      if (this.userInput == null) {
        this.selectedTime = 0;
      } else {
        this.selectedTime = this.userInput;
      }
      this.isTimeSelected = true;
      // this.status = 'WORKING';
      this.mainTimer = '00:00';
      this.seconds = 59;
    }
  }
  handleCustomTimerClick($event: any) {
    console.log($event.target.classList[0]);
    if ($event.target.classList[0] == 'break') {
      this.status = 'BREAK';
    } else if ($event.target.classList[0] == 'work') {
      this.status = 'WORKING';
    }
  }

  constructor() {}

  title = 'pomodoro';
}
