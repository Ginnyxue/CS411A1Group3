import React, {ReactDOM} from "react";
import {Button, Popup} from "semantic-ui-react";

const markerSize = 30;
const markerStyle = {
  background: "blue",
  width: markerSize,
  height: markerSize,
  borderRadius: markerSize / 2,
};

class JobMarker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false
    };
  }

  render() {
    return (<div style={markerStyle}>
    </div>);
    /*
      <Popup
        hoverable={true}
        trigger={<div style={markerStyle}/>}
      >
        <Popup.Header>
        </Popup.Header>
        <Popup.Content>
          {this.props.job.snippet}
        </Popup.Content>
      </Popup>
    </div>);
    */
  }
}

JobMarker.propTypes = {
  job: React.PropTypes.object,
};

export default JobMarker;
