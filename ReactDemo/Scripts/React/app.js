import axios from "axios";
import React from "react";
import AddEditCustomer from './CustomerMaster/AddEditCustomer';

import DeleteCustomer from './CustomerMaster/DeleteCustomer';
import { createRoot } from 'react-dom/client';


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Customerlist: [],
            //Id: 0,
            IsModalOpen: false,
            IsDeleteModalOpen: false
            
        }
    }

    componentDidMount() {
        this.getCustomer()
    }
    getCustomer = () => {
        fetch("/Customer/CustomerList").then(response => response.json())
            .then(data => {
                this.setState({ Customerlist: data.CustomerList })
            })
    }
    render() {
        const List1 = this.state.Customerlist.map((list, i) => {
            return (
                <tr key={i}>
                   
                    <td>{list.Name}</td>
                    <td>{list.Address}</td>
                    <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#AddEditModal" onClick={() => { this.setState({ IsModalOpen: true, Id: list.Id }) }}>Edit</button>
                        <span>|</span>
                        <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#deleteCustomer" onClick={() => { this.setState({ IsDeleteModalOpen: true, Id: list.Id }) }}>Delete</button>
                
                    </td>
                </tr>
            )
        })
        return (
            <div>
                <div className="float-left mr-4 mb-2">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#AddEditModal" onClick={() => { this.setState({ IsModalOpen: true }) }}>Add Customer</button>
                </div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>                           
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>   
                            <th> Action</th>
                        </tr>

                    </thead>
                    <tbody>  
                        {List1}
                    </tbody>                
                </table>
                {this.state.IsModalOpen == true ? <AddEditCustomer id={this.state.Id} CloseModal={() => { this.setState({ IsModalOpen: false }) }} /> : null}
                {this.state.IsDeleteModalOpen == true ? <DeleteCustomer id={this.state.Id} CloseModal={() => { this.setState({ IsDeleteModalOpen: false }) }} reload={this.getCustomer} /> : null}
            </div>
        )
    }
}


const container = document.getElementById('Customerlist');
const root = createRoot(container);
root.render(<Index />);
export default Index;
