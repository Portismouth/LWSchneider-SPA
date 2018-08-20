import React from 'react'

import InteractiveCallout from './InteractiveCallout'

const PartCallouts = (props) => {
  const callouts = props.callouts.map((callout, i) => (
    <li 
      key={callout.callout}
    >
      {(callout.callout_image) ?
        <InteractiveCallout
          text={callout.callout}
          image={callout.callout_image}
        />
        : callout.callout
      }
    </li>
  ))
  return (
    <ul
      className="part-callouts" 
      style={props.style}
    >
      {callouts}
    </ul>
  )
}

export default PartCallouts;
