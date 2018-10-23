import React, { PureComponent } from "react";
import List from './List'

export default class Select extends PureComponent {
  render() {
    const { selected, handleChange, renderSelect } = this.props;
    return (
      <React.Fragment>
        <label htmlFor="filter">Please select places to show</label>
        <select id="filter" value={selected} onChange={handleChange}>
          <option value="all">All</option>
          <option value="religious">Religious</option>
          <option value="landmark">Landmark</option>
          <option value="museum">Museum</option>
        </select>
        <List selected={selected} renderSelect={renderSelect} />
      </React.Fragment>
    );
  }
}
