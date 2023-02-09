import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-dom/client';
class AddEditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            Name: '',
            Price: ''
        }
    }
    componentDidMount() {
        if (this.props.id > 0) {
            fetch("/Product/GetById?id=" + this.props.id)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        id: data.Id,
                        Product_Id: data.Product_Id,
                        Name: data.Name,
                        Price: data.Price
                    })
                })
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            Id: this.state.id,
            Product_Id: this.state.Product_Id,
            Name: this.state.Name,
            Price: this.state.Price
        }
        console.log("Submited data", data)
        fetch("/Product/AddEditProduct", {
            method: "POST",
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                console.log("Success", data.success);
                alert(data.Message)
                window.location.href = "/Product/Index";
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
        return (
            <div className="modal fade" id="AddEditModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" >Add/Edit Product Info</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" onClick={this.props.CloseModal}>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="form-group">
                                    <label htmlFor="txtname" className="col-form-label">Name </label>
                                    <input type="text" className="form-control" id="txtname" name="Name" value={this.state.Name} onChange={this.onchange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="txtPrice" className="col-form-label">Price </label>
                                    <textarea className="form-control" id="txtPrice" name="Price" value={this.state.Price} onChange={this.onchange}></textarea>
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
export default AddEditProduct;