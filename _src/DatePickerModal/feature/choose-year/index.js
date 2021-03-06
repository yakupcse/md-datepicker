import * as D from 'lib/dateutils';

function getYears(actions, min, max) {
  const ret = [];
  const miny = min.getFullYear();
  const maxy = max.getFullYear();
  for (let y = miny; y < maxy; y++) {
    const dtm = new Date(y, 0, 1);
    ret.push(
      <button
        className='dpm-picker-item'
        onClick={event => {
          event.stopImmediatePropagation();
          actions.setCurrentYear(dtm);
        }}
      >
        {y}
      </button>
    );
  }
  return ret;
}

export default function renderChooseYear(props) {
  const { actions, config: { min, max } } = props;

  return <div className="choose-year dpm-picker" ariaLabel='Choose a year.'>
    <div
      className='dpm-picker-header'
      ariaLabel='Select another year.'
    >
      Select a year.
    </div>
    <div className='dpm-picker-wrap'>
      <div className='dpm-picker-outer'>
        <div className='dpm-picker-inner'>
          {getYears(actions, D.minYear(min), D.maxYear(max))}
        </div>
      </div>
    </div>
  </div>;
}
