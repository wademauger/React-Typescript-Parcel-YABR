import * as React from 'react';
import { EventModel } from '../models/event';
import { Event } from './event';

import '../styles/day.scss';

export interface Props {
  date: number;
  events: Array<EventModel>;
  disabled?: boolean;
  width?: number;
  height?: number;
};

export const Day = props => (
  <div
    className="DayBox"
    style={{
      width: props.width || 100,
      height: props.height || 120,
      opacity: props.disabled ? 0.5 : 1,
    }}
    >
    <div className="Date">
      {props.date}
    </div>
    <div className="DateEvents">
      {props.events.map( (event, index) => (
      <Event
        key={index}
        event={event}
        />
      ))}
    </div>
  </div>
);
