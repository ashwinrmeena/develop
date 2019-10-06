import React from 'react';
import {Component} from 'react'
import './../App.css';
import {Button} from 'react-bootstrap';
import {DropdownButton, Dropdown, Table, Container, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';


class MainPage extends Component {
// Execute when the component is mounted [Lifecycle method]
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
// // Function to search skills and filter based on the input value
      search_skills(event) {
        var raw_list = this.state.json_data;
        var res_list=[];
        var search_item=this.state.search_item
        raw_list.map((item, key) => 
            {if(item.skills.toLowerCase().includes(event.target.value))
            {
                res_list.push(item)
            }
          }
        );
        this.setState({res_list: res_list});
        console.log(res_list)
       
    }
// Function to search Experience and filter based on the input value
    search_experience(event) {
        var raw_list = this.state.json_data;
        var res_list=[];
        var search_item=this.state.search_item
        raw_list.map((item, key) => 
            {if(item.experience.includes(event.target.value))
            {
                res_list.push(item)
            }
          }
        );
        this.setState({res_list: res_list});
        console.log(res_list)
       
    }
// // Function to search location and filter based on the input value
    search_location(event) {
        console.log("location")
        var raw_list = this.state.json_data;
        var res_list=[];
        var search_item=this.state.search_item
        raw_list.map((item, key) => 
            {if(item.location.includes(event.target.value))
            {
                res_list.push(item)
            }
          }
        );
        this.setState({res_list: res_list});
        console.log(res_list)
       
    }
    // Constructor to initialize variables
    constructor() {
        super();
        this.state = {
           json_data: [],
           res_list: [],
           search_item: 'skills',
           filter: 'skills'
        };
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    // This method is called when input event changes
    handleOnChange = (event) => {
        
        if(event=='a') {
            this.setState({search_item: 'Experience'});
        }
        else if(event=='b')
        {
            this.setState({search_item: 'Skills'});
        }
        else {
            this.setState({search_item: 'Location'});
        }
    }
// Notify about which drop down element selected
    conditional_fun(event) {
        if(this.state.filter=='skills') {
            this.search_skills(event)
        }
        else if(this.state.filter=='experience') {
            this.search_experience(event)
        }
        else {
            this.search_location(event)
        }
    }
    
    render() {
      return (
        <div> 

        <Container>
            <Row>
                <Col sm={5}>       
                    <DropdownButton  size={100} onSelect={this.handleOnChange} title={this.state.search_item}>
                    <Dropdown.Item as="button" eventKey="a">Experiance</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey="b">Skill</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey="c">Location</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col sm={5}> <input id="inputbox" type="text" placeholder="Search" onChange={this.conditional_fun.bind(this)}/></Col>
                <Col sm={2}><Link  to="/ExpiryDetails">ExpiryDetails</Link> </Col>
            </Row>
            <Row>
                  <Table responsive>
                    <thead>
                        <tr>
                        <th>sr.No</th>
                        <th>Experience</th>
                        <th>Skill</th>
                        <th>Location</th>
                        <th>Company Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.res_list.map((item, i) =>(
                        <tr key={i}>
                            <td>{i++}</td>
                            <td>{item.experience}</td>
                            <td>{item.skills}</td>
                            <td>{item.location}</td>
                            <td>{item.companyname}</td>
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

export default MainPage;
