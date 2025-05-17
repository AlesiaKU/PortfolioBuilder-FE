import React from "react";

const MarqueeText = ({ text, reverse }) => {
  return (
    <div className={`marquee-container ${reverse ? 'reverse' : ''}`}>
  <div className="marquee">
    <span>{text}&nbsp;&nbsp;</span>
    <span>{text}&nbsp;&nbsp;</span>
    <span>{text}&nbsp;&nbsp;</span> {/* Три повторения, без лишних отступов */}
  </div>
</div>

  );
};

export default MarqueeText;
