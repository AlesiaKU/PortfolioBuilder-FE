import '../styles/generator.css';
import Generator1 from '../img/generator1.svg';

function Generator() {
  return (
    <div className="generat-start">
      <div className="gener-txt1">
        <div className="gener-txt1-1">Make your </div>
        <div className="gener-txt1-2">portfolio here</div>
        <div className="gener-txt1-3">RIGHT NOW</div>
        <div className="gener-txt1-4">Follow the steps below to create your new portfolio</div>
      </div>
      <img src={Generator1} className="generator-phot1" />

    </div>
  );
}

export default Generator;