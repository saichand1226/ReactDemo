
import axios from "axios";
import React from "react";
import { Link } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import AddEditSales from './AddEditSales';


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            GetSaleslist: [],
            Id: 0,
            IsModalOpen: false,
            IsDeleteModalOpen: false

        }
    }

    componentDidMount() {
        this.getSales()
    }
    //getSales() {
    //    fetch("/Sales/GetSalesList").then(response => response.json())
    //        .then(data => {
    //            this.setState({
    //                GetSaleslist: data
    //            })
    //        })
    //}
    getSales = () => {
        fetch("/Sales/GetSalesList").then(response => response.json())
            .then(data => {
                this.setState({ GetSaleslist: data.GetSalesList })
            })
    }
    render() {
        const salelist = this.state.GetSaleslist.map((list, i) => {
            return (
                <tr key={i}>
                    <td>{list.CustomerName}</td>
                    <td>{list.ProductName}</td>
                    <td>{list.StoreName}</td>
                    <td>{list.Date_Sold}</td>
                    <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#AddEditModal" onClick={() => { this.setState({ IsModalOpen: true, Id: list.Id }) }}>Edit</button>
                        <span>|</span>
                        <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#deleteSale" onClick={() => { this.setState({ IsDeleteModalOpen: true, Id: list.Id }) }}>Delete</button>

                    </td>
                </tr>
            )
        })
        return (
            <div>
                <div className="float-left mr-4 mb-2">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#AddEditModal" onClick={() => { this.setState({ IsModalOpen: true }) }}>Add Sale</button>
                </div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Customer</th>
                            <th scope="col">Product</th>
                            <th scope="col">Store</th>
                            <th scope="col">Date Sold</th>
                            <th> Action</th>
                        </tr>

                    </thead>
                    <tbody>
                        {salelist}
                    </tbody>
                </table>
                {this.state.IsModalOpen == true ? <AddEditSales id={this.state.Id} CloseModal={() => { this.setState({ IsModalOpen: false }) }} /> : null}
                {this.state.IsDeleteModalOpen == true ? <DeleteSale id={this.state.Id} CloseModal={() => { this.setState({ IsDeleteModalOpen: false }) }} reload={this.getSales} /> : null}
            </div>
        )
    }
}


const container = document.getElementById('Saleslist');
const root = createRoot(container);
root.render(<Index />);
