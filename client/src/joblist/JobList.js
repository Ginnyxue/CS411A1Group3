import React, {PropTypes, ReactDOM} from "react";

import {List, Button} from "semantic-ui-react";

class JobList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <List selection verticalAlign='middle'>
        {
          this.props.jobs.map((job) => {
            return (
              <List.Item
                key={job.jobkey}
                onClick={() => {
                  this.props.onClick(job)
                }}>
                <List.Content>
                  <List.Header>{job.jobtitle}</List.Header>
                  <List.Description>{job.snippet}</List.Description>
                </List.Content>
                <List.Content floated='right'>
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      this.props.onDelete(job);
                    }}>
                    Delete
                  </Button>
                </List.Content>
              </List.Item>
            );
          })
        }
      </List>
    </div>);
  }
}

JobList.propTypes = {
  jobs: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default JobList;
