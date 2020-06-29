import React, { useEffect, useRef, useCallback } from "react";

import "./Model.css";

const Model = ({ children, isOpen, setIsOpen }) => {
  const box = useRef();
  let newClientX = 0;
  let newClientY = 0;
  let curClientX = 0;
  let curClientY = 0;

  const dragMouseDown = (e) => {
    e = e || window.event;
    e.preventDefault();
    curClientX = e.clientX;
    curClientY = e.clientY;
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
  };

  const elementDrag = (e) => {
    e = e || window.event;
    e.preventDefault();
    newClientX = curClientX - e.clientX;
    newClientY = curClientY - e.clientY;
    curClientX = e.clientX;
    curClientY = e.clientY;

    switch (true) {
      case box.current.offsetLeft < 10:
        box.current.style.left = 10 + "px";
        break;
      case box.current.offsetLeft > window.innerWidth - 470:
        box.current.style.left = window.innerWidth - 470 + "px";
        break;
      case box.current.offsetTop < -610:
        box.current.style.top = -610 + "px";
        break;
      case box.current.offsetTop > 0:
        box.current.style.top = 0;
        break;
      default:
        break;
    }
    box.current.style.top = box.current.offsetTop - newClientY + "px";
    box.current.style.left = box.current.offsetLeft - newClientX + "px";
  };

  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  let model = (
    <div className="bg-model">
      <div className="model-box" ref={box}>
        <header onMouseDown={dragMouseDown}>
          <i
            className="fas fa-times model-close"
            onClick={() => setIsOpen(false)}
          ></i>
        </header>
        {children}
      </div>
    </div>
  );

  const handelClick = useCallback(
    (e) => {
      if (box.current !== null) {
        if (box.current.contains(e.target)) {
          return;
        }
      }
      setIsOpen(false);
    },
    [setIsOpen]
  );

  const handelKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    if (model) {
      document.addEventListener("click", handelClick);
      document.addEventListener("keydown", handelKeyDown);
      return () => {
        document.removeEventListener("click", handelClick);
        document.removeEventListener("keydown", handelKeyDown);
      };
    }
  }, [model, handelClick, handelKeyDown]);

  if (!isOpen) {
    model = null;
  }

  return <div>{model}</div>;
};

export default Model;
