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
    window.today = today;
    if (thisEvent.startDateTime.getYear() !== today.getUTCFullYear()) return false;
    if (thisEvent.startDateTime.getMonth() !== today.getMonth()) return false;
    if (thisEvent.startDateTime.getDate() !== today.getDate()) return false;
    return true;
  });
};

export const Week = ({weekStartDay, allEvents}) => {
  const endOfMonth = moment().month((new Date(weekStartDay)).getMonth()).endOf('month')
  const weekDateObjects = weekGen(new Date(weekStartDay), endOfMonth.toDate().getDate());
  // weekDateObjects.map(obj => console.log(moment(obj).format('MM/DD/YYYY')));
  return weekDateObjects.map(thisDate => (
    <Day
      key={thisDate.getDate()}
      date={`${moment(thisDate).format('MMM DD')}`}
      events={eventsTodayFilter(thisDate, allEvents)}
      />
  ));
};

export const CurrentCalendar = props => (
  <div>
    {[-7, 0, 7, 14, 21].map( dateIndex => (
    <div style={{display: 'inline-block'}}>
      <Week 
        allEvents={[
          {
            title: 'Bowling',
            startDateTime: new Date('3/28/2018 14:00'),
            endDateTime: new Date('3/28/2018 16:00'),
            description: 'We\'re going bowling, deal with it.'
          },
          {
            title: 'Karaoke',
            startDateTime: new Date('4/10/2018 18:00'),
            endDateTime: new Date('4/10/2018 20:00'),
          },
          {
            title: 'Docker Talk',
            startDateTime: new Date('4/11/2018 10:00'),
            endDateTime: new Date('4/11/2018 12:00'),
          },
          ]}
          key={dateIndex}
      weekStartDay={moment().day(dateIndex).toDate()}
      />
    </div>
    ))}
  </div>
);

/**
 * Takes a start date, and end date, and a list of events,
 * and returns a list of react weeks
 * pre- populated with days pre- populated with events
 * @param startDate  The calendar will start with this whole week
 * @param endDate    The calendar will end with this whole week
 * @param allEvents  The calendar will render these events
 * @returns Array<Week> the resulting react calendar component
 */
export const RangeCalendar = ({ startDate, endDate, allEvents}) => {
  const firstDay = moment(new Date(startDate)).day('Sunday');
  const lastSunday = moment(new Date(endDate)).day('Sunday');
  const numWeeks = lastSunday.diff(firstDay, 'week');
  const weeks = [];
  for (
    let weekStartDay = firstDay ;
    lastSunday.diff(weekStartDay, 'week') >= 0 ;
    weekStartDay = weekStartDay.add(1, 'week')
  ) {
    console.log(`Making a week starting on ${weekStartDay.format('MM/DD/YYYY')}`)
    weeks.push(
      <div style={{display: 'inline-block'}}>
        { Week({weekStartDay, allEvents}) }
      </div>
    );
  }
  return weeks;
};

