
import axios from "axios";
import React from "react";
import AddEditProduct from './AddEditProduct';
import DeleteProduct from './DeleteProduct';
import { createRoot } from 'react-dom/client';


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Productlist: [],
            Id: 0,
            //Product_Id: 0;
            IsModalOpen: false,
            IsDeleteModalOpen: false

        }
    }

    componentDidMount() {
        this.getProduct()
    }
    getProduct = () => {
        fetch("/Product/ProductList").then(response => response.json())
            .then(data => {
                this.setState({ Productlist: data.ProductList })
            })
    }
    render() {
        const productlist = this.state.Productlist.map((list, i) => {
            return (
                <tr key={i}>

                    <td>{list.Name}</td>
                    <td>{list.Price}</td>
                    <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#AddEditModal" onClick={() => { this.setState({ IsModalOpen: true, Id: list.Id }) }}>Edit</button>
                        <span>|</span>
                        <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#deleteProduct" onClick={() => { this.setState({ IsDeleteModalOpen: true, Id: list.Id }) }}>Delete</button>

                    </td>
                </tr>
            )
        })
        return (
            <div>
                <div className="float-left mr-4 mb-2">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#AddEditModal" onClick={() => { this.setState({ IsModalOpen: true }) }}>Add Product</button>
                </div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th> Action</th>
                        </tr>

                    </thead>
                    <tbody>
                        {productlist}
                    </tbody>
                </table>
                {this.state.IsModalOpen == true ? <AddEditProduct id={this.state.Id} CloseModal={() => { this.setState({ IsModalOpen: false }) }} /> : null}
                {this.state.IsDeleteModalOpen == true ? <DeleteProduct id={this.state.Id} CloseModal={() => { this.setState({ IsDeleteModalOpen: false }) }} reload={this.getProduct} /> : null}
            </div>
        )
    }
}


const container = document.getElementById('Productlist');
const root = createRoot(container);
root.render(<Index />);
