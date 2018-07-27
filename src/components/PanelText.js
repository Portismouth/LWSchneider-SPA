import React from 'react';

const PanelText = (props) => {
  let colClasses = [];
  if (props.colSpan === undefined) {
    colClasses = undefined;
  } else {
    if (typeof (props.colSpan) === "object") {
      const { xl, lg, md } = props.colSpan;
      colClasses = [
        (xl && `col-xl-${xl}`),
        (lg && `col-lg-${lg}`),
        (md && `col-md-${md}`),
        'col-10'
      ]
    } else if (typeof (props.colSpan === "number")) {
      colClasses = [
        'col-10',
        `col-lg-${props.colSpan}`
      ]
    } 
  }
  return (
    <div className="row no-gutters justify-content-center mt-2 mt-lg-3">
      <div 
        className={
          colClasses !== undefined
          ? colClasses.join(' ') 
          : "col-10 col-lg-5"
          }
      >
        <p id={props.textId} className="panel-text">{props.panelText}</p>
      </div>
    </div>
  )
}

export default PanelText;
