import React, { PureComponent } from "react";
import filters from "./Filters";

export default class Checkbox extends PureComponent {
  render() {
    const { checkedItems, handleChange } = this.props;
    return (
      <React.Fragment>
        {filters.map(item => (
          <label htmlFor={item.name} key={item.key}>
            {item.name}
            <input
              id={item.name}
              type="checkbox"
              name={item.name}
              checked={checkedItems.get(item.name)}
              onChange={handleChange}
            />
          </label>
        ))}
      </React.Fragment>
    );
  }
}
