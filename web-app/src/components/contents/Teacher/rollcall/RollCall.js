import React from "react";
import Webcam from "react-webcam";
import "./RollCall.css";

import { Table, Input, Button, Icon } from "antd";

export default class RollCall extends React.Component {
  render() {
    return (
      <div className="RollCall" style={{ marginTop: "5vh", height: "100%" }}>
        <section className="container">
          <div className="left-half">
            <article>
              <h1>Left Half</h1>
              <p>
                Weekends don't count unless you spend them doing something
                completely pointless.
              </p>
            </article>
          </div>
          <div className="right-half">
            <Webcam />
            <CurrentClassTable />
          </div>
        </section>
      </div>
    );
  }
}

class CurrentClassTable extends React.Component {
  state = {
    filterDropdownVisible: false,
    searchText: "",
    filtered: false,
    data: [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park"
      },
      {
        key: "2",
        name: "Joe Black",
        age: 42,
        address: "London No. 1 Lake Park"
      },
      {
        key: "3",
        name: "Jim Green",
        age: 32,
        address: "Sidney No. 1 Lake Park"
      },
      {
        key: "4",
        name: "Jim Red",
        age: 32,
        address: "London No. 2 Lake Park"
      }
    ],
    rawData: [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park"
      },
      {
        key: "2",
        name: "Joe Black",
        age: 42,
        address: "London No. 1 Lake Park"
      },
      {
        key: "3",
        name: "Jim Green",
        age: 32,
        address: "Sidney No. 1 Lake Park"
      },
      {
        key: "4",
        name: "Jim Red",
        age: 32,
        address: "London No. 2 Lake Park"
      }
    ]
  };
  onInputChange = e => {
    this.setState({ searchText: e.target.value });
  };
  onSearch = () => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, "gi");
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: this.state.rawData
        .map(record => {
          const match = record.name.match(reg);
          if (!match) {
            return null;
          }
          return {
            ...record,
            name: (
              <span>
                {record.name
                  .split(
                    new RegExp(`(?<=${searchText})|(?=${searchText})`, "i")
                  )
                  .map(
                    (text, i) =>
                      text.toLowerCase() === searchText.toLowerCase() ? (
                        <span key={i} className="highlight">
                          {text}
                        </span>
                      ) : (
                        text
                      ) // eslint-disable-line
                  )}
              </span>
            )
          };
        })
        .filter(record => !!record)
    });
  };
  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Search name"
              value={this.state.searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>
              Search
            </Button>
          </div>
        ),
        filterIcon: (
          <Icon
            type="smile-o"
            style={{ color: this.state.filtered ? "#108ee9" : "#aaa" }}
          />
        ),
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              filterDropdownVisible: visible
            },
            () => this.searchInput && this.searchInput.focus()
          );
        }
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age"
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        filters: [
          {
            text: "London",
            value: "London"
          },
          {
            text: "New York",
            value: "New York"
          }
        ],
        onFilter: (value, record) => record.address.indexOf(value) === 0
      }
    ];
    return (
      <Table columns={columns} dataSource={this.state.data} size="small" />
    );
  }
}
