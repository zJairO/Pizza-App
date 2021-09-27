import React, { Component } from "react";
import { Button, Container, Icon, Message, Form, Table } from 'semantic-ui-react';
import axios from 'axios';
import { throwStatement } from "@babel/types";

// Ingredients API
const apiPizzas = axios.create({
    baseURL: 'http://localhost:8000/api/pizzas/'
});


class MainForm extends Component {

    // Main state
    state = {
        page: 1,
        pizzas: [],
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        email: '',
        pizza: 1,
        pizzaName: '',
        order: ''
    }

    // Page
    nextPage = () => {
        const { page, pizza } = this.state;
        this.setState({
            page: page + 1
        });
        
        axios.get('http://localhost:8000/api/pizzas/' + pizza)
            .then(res => {
                const pizzaName = res.data.name;
                this.setState({ pizzaName });
            })
    }

    // Previous Step
    prevPage = () => {
        const { page } = this.state;
        this.setState({
            page: page - 1
        });
    }

    // First Name Changer
    firstNameChanger = e => {
        this.setState({ firstName: e.target.value});
    }

    // Last Name Changer
    lastNameChanger = e => {
        this.setState({ lastName: e.target.value});
    }

    // Phone Changer
    phoneChanger = e => {
        this.setState({ phone: e.target.value});
    }

    // Email Changer
    emailChanger = e => {
        this.setState({ email: e.target.value});
    }

    // Address Changer
    addressChanger = e => {
        this.setState({ address: e.target.value});
    }

    // Pizza Changer
    pizzaChanger = e => {        
        this.setState({ pizza: e.target.value });
    }

    // Hamdle Submit
    handleSubmit = e => {
        e.preventDefault();
        const { firstName, lastName, email, phone, address, page, pizza, order } = this.state

        axios.post('http://localhost:8000/api/clients', {
            name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            address: address
        })
        .then(response => {
            console.log("Status: ", response.status);
            console.log("Data: ", response.data);
            //console.log("Client_id: ", response.data.client_id)
            
            axios.post('http://localhost:8000/api/orders', {
                pizza_id: pizza,
                client_id: response.data.client_id,
                delivery_man_id: 1, // default for now
                status_id: 1 //default for now
            })

            .then(res => {
                console.log("Status: ", res.status);
                console.log("Data: ", res.data);
                this.setState({order: res.data.order_id})

            }) .catch(err => {
                console.error('Something went wrong!', err)
                this.setState({page: 4});
            });

            
            this.setState({page: page + 1});

        }) .catch(error => {
            console.error('Something went wrong!', error)
            this.setState({page: 4});
        });

          
    }

    // Constructor
    constructor() {
        super();
        apiPizzas.get('/').then(res => {
            this.setState({ pizzas: res.data })
            //console.log(res.data[0]['name'])
        })
    }
    


    render() {

        // Vars
        const { page, pizzas, firstName, lastName, email, phone, address, pizzaName, order } = this.state;

        switch (page) {
            case 1:
                return (
                    <Container>
                        <Message
                            attached
                            header='Place your order'
                            content='To place your order please fill in all the information'
                        />
                        <Form 
                            className='attached fluid segment'
                        >
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label="First name"
                                    placeholder="First name"
                                    name="firstName"
                                    onChange={this.firstNameChanger}
                                />
                                <Form.Input
                                    fluid
                                    label="Last name"
                                    placeholder="Last name"
                                    name="lastName"
                                    onChange={this.lastNameChanger}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label="Phone"
                                    placeholder="Phone"
                                    name="phone"
                                    onChange={this.phoneChanger}
                                />
                                <Form.Input
                                    fluid
                                    label="Email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={this.emailChanger}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label="Address"
                                    placeholder="Address"
                                    name="address"
                                    onChange={this.addressChanger}
                                />
                            </Form.Group>
                            <Message
                                content='Select the style of your pizza'
                            />
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <select name="pizzas" onChange={this.pizzaChanger}>
                                        {pizzas.map(pizza =>
                                            <option value={pizza.pizza_id}>{pizza.name}</option>
                                        )}
                                    </select>
                                </Form.Field>
                            </Form.Group>
                            <Message
                                content='To continue click on make your order'
                            />
                            <Button onClick={this.nextPage}>MAKE YOUR ORDER</Button>
                        </Form>

                        <Message attached='bottom' warning>
                            <Icon name='info' />
                            By using this website you accept our Terms of use and our Privacy policy.
                        </Message>
                    </Container>
                )
            case 2:
                return (
                    <Container>
                        <Form
                            onSubmit={this.handleSubmit}
                            className='attached fluid segment'
                        >
                        <Message
                            attached
                            header='Review your order'
                            content='Please review your order before submitting'
                        />
                         <Table striped>                        
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>First Name</Table.Cell>
                                    <Table.Cell><b>{firstName}</b></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Last Name</Table.Cell>
                                    <Table.Cell><b>{lastName}</b></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Phone</Table.Cell>
                                    <Table.Cell><b>{phone}</b></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Email</Table.Cell>
                                    <Table.Cell><b>{email}</b></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Address</Table.Cell>
                                    <Table.Cell><b>{address}</b></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Pizza Style</Table.Cell>
                                    <Table.Cell><b>{pizzaName}</b></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                        <Message
                                content='If all the data is correct click on finish'
                            />
                        <Button onClick={this.prevPage}>GO BACK</Button>
                        <Button type='submit'>FINISH</Button>
                        </Form>
                        <Message attached='bottom' warning>
                            <Icon name='info' />
                            By using this website you accept our Terms of use and our Privacy policy.
                        </Message>
                    </Container>
                )
            case 3:
                return (
                    <Container>
                        <Form
                            className='attached fluid segment'
                        >
                        <Message
                            positive
                            header='Thank you'
                        >
                        Thank you for your order <b>{ firstName }</b>, <b>your order No. is { order } </b> . In less than 30 minutes you will have your pizza at home.
                        </Message>
                        </Form>
                        <Message attached='bottom' warning>
                            <Icon name='info' />
                            By using this website you accept our Terms of use and our Privacy policy.
                        </Message>
                    </Container>
                )
            case 4:
                <Container>
                <Form
                    className='attached fluid segment'
                >
                <Message
                    negative
                    header='We are sorry'
                    content='Sorry, something bad is happening on our server, please try again.'
                />
                </Form>
                <Message attached='bottom' warning>
                    <Icon name='info' />
                    By using this website you accept our Terms of use and our Privacy policy.
                </Message>
            </Container>
        }
    }
}


export default MainForm