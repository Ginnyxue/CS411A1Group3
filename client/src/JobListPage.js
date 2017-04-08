import React, {Component} from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";

class JobListPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = [{
      name: 'Tanner Linsley',
      age: 26,
      friend: {
        name: 'Jason Maurer',
        age: 23,
      }
    }
    ];

    const columns = [{
      header: 'Name',
      accessor: 'name'
    }];

    return <ReactTable
      data={data}
      columns={columns}
    />;
  }
}

export default JobListPage;
