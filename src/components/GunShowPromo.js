import React from 'react';

const GunShowPromo = (props) => {
  let colClasses = [];
  if (props.colSpan === undefined) {
    colClasses = undefined;
  } else {
    if (typeof (props.colSpan) === "object") {
      const { xl, lg, md, sm } = props.colSpan;
      colClasses = [
        (xl && `col-xl-${xl}`),
        (lg && `col-lg-${lg}`),
        (md && `col-md-${md}`),
        (sm && `col-md-${sm}`),
        (!sm && 'col-11')
      ]
    } else if (typeof (props.colSpan === "number")) {
      colClasses = [
        'col-10 col-sm-11',
        `col-lg-${props.colSpan}`
      ]
    }
  }
  return (
    <div className="row no-gutters justify-content-center">
      <img
        id="gunShowPromo"
        /* className={
          colClasses ? colClasses.join(' ') : "col-12 col-lg-6"
        } */
        src = {props.imageUrl}
      />
    </div>
  )
}

export default GunShowPromo;
