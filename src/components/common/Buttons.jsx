import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import { useState } from "react";
function Buttons({ handleClick }) {
  return (
    <div>
      <center>
        <div className="button_div">
          <button onClick={() => handleClick("")} className="button_cat">
            All
          </button>
          <button onClick={() => handleClick(1)} className="button_cat">
            HOT
          </button>
          <button onClick={() => handleClick(2)} className="button_cat">
            COLD
          </button>
          <button onClick={() => handleClick(3)} className="button_cat">
            BAGEL
          </button>
        </div>
      </center>
    </div>
  );
}

export default Buttons;