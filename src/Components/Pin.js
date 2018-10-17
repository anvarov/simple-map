import React, { PureComponent } from "react";
import ICONS from "./Icons";

const pinStyle = {
  cursor: "pointer",
  border: "none",
  background: "none",
};
export default class Pin extends PureComponent {
  render() {
    const { size = 10, onClick, place } = this.props;

    return (
      <button
        type="button"
        aria-label={place.type}
        height={size}
        style={{ ...pinStyle }}
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: ICONS[place.type] }}
      />
    );
  }
}
