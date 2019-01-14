import React from 'react';

const ScrollButton = props => (
  <div
    className={
      props.arrowUp
      ? "scroll-button-up row no-gutters justify-content-center flex-column"
        : "scroll-button row no-gutters justify-content-center flex-column"
    }
    onClick={props.handleRotateWindstop
      ? (e) => (props.handleChangePanels(e), props.handleRotateWindstop(e))
      : props.handleChangePanels
    }
  >
      {!props.arrowUp &&
      <div className="scroll-text mb-2">
        {props.buttonText && props.buttonText}
      </div>
      }
      <img
        src="/wp-content/uploads/2018/06/scroll-arrow.svg"
        alt="arrow-down"
      />
      {props.arrowUp && 
      <div className="scroll-text d-none d-lg-block mb-2">
        {props.buttonText && props.buttonText}
      </div>
      }
  </div>
);

export default ScrollButton;
