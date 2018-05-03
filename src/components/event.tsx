import * as React from 'react';
import moment from 'moment';
import TextTruncate from 'react-text-truncate';
import { Tooltip } from 'react-lightweight-tooltip';
import ReactTooltip from 'react-tooltip'
import { EventModel } from '../models/event';

import '../styles/event.scss';

export interface Props {
  event: EventModel;
  labelColor?: string; 
}

const eventToTooltipString = event => (
  event.description ?
  `${event.title}: ${moment(event.startDateTime).format('ddd, MMM D hA')}-${moment(event.endDateTime).format('hA')}\n${event.description}`
  :
  `${event.title}: ${moment(event.startDateTime).format('ddd, MMM D hA')}-${moment(event.endDateTime).format('hA')}`
);

export const Event = props => (
  <div
    className="EventBox"
    style={{
      backgroundColor: props.labelColor ? props.labelColor : 'Green',
    }}
    >
    <p data-tip={eventToTooltipString(props.event)}>
      <TextTruncate
        line={1}
        truncateText={"…"}
        text={props.event.title}
        />
    </p>
    <ReactTooltip place="right" effect="solid"/>
  </div>
);
