import React, { Component } from 'react';
//import { Dropdown } from '../node_modules/semantic-ui-react/index.js';
//import axios from 'axios';
//import { Link } from 'react-dom/client';
//import app from '../app.js';
//import Index from './app.js';
class AddEditSales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            Date_Sold: '',
            CustomerName: '',
            ProductName: '',
            StoreName: '',
            Customerlist: [],
        }
    }
    componentDidMount() {
        this.getCustomer()
        if (this.props.id > 0) {
            fetch("/Sales/GetById?id=" + this.props.id)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        id: data.Id,
                        Date_Sold: data.Date_Sold,
                        CustomerName: data.CustomerName,
                        ProductName: data.ProductName,
                        StoreName: data.StoreName,
                        Customer_Id: data.Customer_Id,

                    })
                })
        }
    }
    getCustomer = () => {
        fetch("/Customer/CustomerList").then(response => response.json())
            .then(data => {
                this.setState({ Customerlist: data.CustomerList })
            })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            Id: this.state.id,
            
            CustomerName: this.state.CustomerName,
            ProductName: this.state.ProductName,
            StoreName: this.state.StoreName,
        }
        console.log("Submited data", data)
        fetch("/Product/AddEditSale", {
            method: "POST",
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                console.log("Success", data.success);
                alert(data.Message)
                window.location.href = "/Sales/Index";
            }).catch((error) => {
                caches.log("error", error);
            })
    }
    onchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    render() {
        const List1 = this.state.Customerlist.map((list, i) => {
            return (
                //<li key={i} className="nav-item dropdown">
                //    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                //        {this.state.CustomerName}
                //    </a>
                <tr key={i}>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        {
                            <td>
                                {list.Name}                                </td>
                        }
                    </div>
                    
                </tr>
            )
        }
        )
        return (
            <div className="modal fade" id="AddEditModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" >Add/Edit Sales Info</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" onClick={this.props.CloseModal}>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="form-group">
                                    <label htmlFor="txtDate" className="col-form-label">Date Sold </label>
                                    <input type="text" className="form-control" id="txtDate" name="Date_Sold" value={this.state.Date_Sold} onChange={this.onchange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="txtCustName" className="col-form-label">Customer Name </label>
                                {/*    */}{/*<input type="text" className="dropdown-menu" id="txtCustName" name="CustomerName" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" value={this.state.CustomerName} onChange={this.onchange}/>*/}
                                {/*    */}{/*<li key={i} className="nav-item dropdown">*/}
                                {/*        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                                {/*            {this.state.CustomerName}*/}
                                {/*        </a>*/}
                                {/*        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">*/}
                                {/*            {*/}
                                {/*                { CustomerName } > {*/}
                                {/*                    Customer_Id*/}
                                {/*                }*/}
                                {/*                //this.state.Customerlist.map((list, j) => {*/}
                                {/*                //    return (<a key={j} className="dropdown-item" {sub.SubUrl}>{sub.SubName}</a>)*/}
                                {/*                //})*/}
                                {/*            }*/}
                                {/*        </div>*/}
                                    {/*    */}{/*</li>*/}
                                    <div>{List1}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txtProdName" className="col-form-label">Product Name </label>
                                    <textarea className="form-control" id="txtProdName" name="ProductName" value={this.state.ProductName} onChange={this.onchange}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txtStoreName" className="col-form-label">Store Name </label>
                                    <textarea className="form-control" id="txtStoreName" name="StoreName" value={this.state.StoreName} onChange={this.onchange}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.CloseModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.onSubmit}> Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddEditSales;