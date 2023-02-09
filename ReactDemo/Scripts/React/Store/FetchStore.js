
import axios from "axios";
import React from "react";
import AddEditStore from './AddEditStore';
import DeleteStore from './DeleteStore';
import { createRoot } from 'react-dom/client';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Storelist: [],
            //Id: 0,
            IsModalOpen: false,
            IsDeleteModalOpen: false

        }
    }

    componentDidMount() {
        this.getStore()
    }
    getStore = () => {
        fetch("/Store/StoreList").then(response => response.json())
            .then(data => {
                this.setState({ Storelist: data.StoreList })
            })
    }
    render() {
        const List2 = this.state.Storelist.map((list, i) => {
            return (
                <tr key={i}>
                    
                    <td>{list.Name}</td>
                    <td>{list.Address}</td>
                    <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#AddEditModal" onClick={() => { this.setState({ IsModalOpen: true, Id: list.Id }) }}>Edit</button>
                        <span>|</span>
                        <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#deleteStore" onClick={() => { this.setState({ IsDeleteModalOpen: true, Id: list.Id }) }}>Delete</button>

                    </td>
                </tr>
            )
        })
        return (
            <div>
                <div className="float-left mr-4 mb-2">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#AddEditModal" onClick={() => { this.setState({ IsModalOpen: true }) }}>Add Store</button>
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
                        {List2}
                    </tbody>
                </table>
                {this.state.IsModalOpen == true ? <AddEditStore id={this.state.Id} CloseModal={() => { this.setState({ IsModalOpen: false }) }} /> : null}
                {this.state.IsDeleteModalOpen == true ? <DeleteStore id={this.state.Id} CloseModal={() => { this.setState({ IsDeleteModalOpen: false }) }} reload={this.getStore} /> : null}
            </div>
        )
    }
}


const container = document.getElementById('Storelist');
const root = createRoot(container);
root.render(<Index />);
