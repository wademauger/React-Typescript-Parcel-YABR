import * as React from 'react';
import moment from 'moment';
import { weekGen } from '../utils/weekGen';
import { Day } from './day';
import { Event } from './models/event';

window.moment = moment;

const currentMonth = moment().month();
const daysBeforeMonth = moment().startOf('month').weekday();
const daysAfterMonth = 6 - moment().endOf('month').weekday()

const eventDisplayedFilter = (startDate: Date, endDate: Date, event: Event) => {
  const isAfterStart = event.startDateTime.getTime() < startDate.getTime();
  const isBeforeEnd = event.endDateTime.getTime() < endDate.getTime();
  return isAfterStart && isBeforeEnd;
};

const eventsTodayFilter = (today: Date, allEvents: Array<Event>) => {
  return allEvents.filter(thisEvent => {
    if (thisEvent.startDateTime.getYear() !== today.getYear()) return false;
    if (thisEvent.startDateTime.getMonth() !== today.getMonth()) return false;
    if (thisEvent.startDateTime.getDate() !== today.getDate()) return false;
    return true;
  });
};

export const Week = ({weekStartDay, allEvents}) => {
  const endOfMonth = moment().month((new Date()).getMonth()).endOf('month')
  const weekDateObjects = weekGen(weekStartDay, endOfMonth.toDate().getDate());
  return weekDateObjects.map(thisDate => (
    <Day
      key={thisDate.getDate()}
    date={thisDate.getDate()}
    events={eventsTodayFilter(thisDate, allEvents)}
    />
  ));
};

export const Calendar = props => (

  <div>
    {[-14, -7, 0, 7, 14, 21].map( dateIndex => (
    <div style={{display: 'inline-block'}}>
      <Week 
        allEvents={[
          {
            title: 'Bowling',
            startDateTime: new Date(),
            endDateTime: new Date(),
            description: 'We\'re going bowling, deal with it.'
          },
          {
            title: 'Karaoke',
            startDateTime: new Date(),
            endDateTime: new Date(),
          },
          {
            title: 'Docker Talk',
            startDateTime: new Date(),
            endDateTime: new Date(),
          },
          ]}
          key={dateIndex}
      weekStartDay={moment().day(dateIndex).toDate()}
      />
    </div>
    ))}
  </div>
);
