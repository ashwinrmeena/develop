import React from 'react';
import {Component} from 'react'

import {DropdownButton, Dropdown, Table, Container, Row, Col} from 'react-bootstrap'

// This class is to serach based on company name and return company name with expiry(End date)
class ExpiryDetails extends Component {

    // Fetch the api details in json format as soon as component is mounted
    // This is a lifecycle method
    componentDidMount() {    
        var that = this;
        var url = 'https://nut-case.s3.amazonaws.com/jobs.json'
      
        fetch(url)
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(function(data) {
          that.setState({ json_data: data.data, res_list: data.data });
          console.log(data.data)
        });
      }

    // constructor to initialize the variables
      constructor() {
        super();
        this.state = {
           json_data: [],
           res_list: []
        };
    
    }
// Function to search company names and filter based on the input value
    search_skills(event) {
        var raw_list = this.state.json_data;
        var res_list=[];
        var search_item=this.state.search_item
        raw_list.map((item, key) => 
            {if(item.companyname.toLowerCase().includes(event.target.value))
            {
                res_list.push(item)
            }
          }
        );
        this.setState({res_list: res_list});
        console.log(res_list)
       
    }


    render() {
        return (
             <div>
        <Container>
            <Row>
                <Col sm={5}>       
                <input type="text" placeholder="Search" onChange={this.search_skills.bind(this)}/>
                </Col>
                <Col sm={5}> <h3>Total number of jobs {this.state.res_list.length} </h3></Col>
            </Row>
                <Row>
                 <Table responsive>
                    <thead>
                        <tr>
                        <th>sr.No</th>
                        <th>Company Name</th>
                        <th>Expiry Date </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.res_list.map((item, i) =>(
                        <tr key={i++}>
                            <td>{i}</td>
                            <td>{item.companyname}</td>
                            <td>{item.enddate}</td>
                        </tr>
                     ))}
                    </tbody>
                    </Table>
                </Row>
             </Container>
            </div>
        )
    }
}

export default ExpiryDetails;