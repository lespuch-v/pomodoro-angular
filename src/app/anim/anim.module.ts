import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class AnimModule {}

// animations.ts

export const Animations = {
  animeTrigger1: trigger('popOverState', [
    state(
      'show',
      style({
        fontSize: '2em',
        color: "#FF4949"
      })
    ),
    state(
      'hide',
      style({
        fontSize: '2em',
        color: '#F73D93',
      })
    ),
    transition(
      'show => hide',
      animate(
        '500ms ease',
        keyframes([
          style({
            opacity: 1,
            color: 'pink',
            transform: 'translateX(-10px)',
            offset: 0.5,
          }),

          style({
            opacity: 0.8,
            transform: 'translateX(0px)',
            offset: 1,
          }),
        ])
      )
    ),
    transition('show => hide', animate('150ms ease-out')),
    transition('hide => show', animate('150ms ease-in')),
  ]),

};
