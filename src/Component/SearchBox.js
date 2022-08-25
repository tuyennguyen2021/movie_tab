import React from "react";

export default function SearchBox(props) {
  return (
    <div className="col col-sm-4">
      <input
        value={props.value}
        className="form-control"
        placeholder="Type to search..."
        type="text"
        onChange={(e) => props.setsearchValue(e.target.value)}
      />
    </div>
  );
}
