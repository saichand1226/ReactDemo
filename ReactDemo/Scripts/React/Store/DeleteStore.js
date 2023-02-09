import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-dom/client';
class DeleteStore extends React.Component {
    constructor(props) {
        super(props)

    }
    onDelete = () => {
        fetch("/Store/RemoveStore?id=" + this.props.id).
            then(response => response.json())
            .then(data => {
                alert(data.Message);
                this.props.reload();
            })
    }
    render() {
        return (
            <div className="modal fade" id="deleteStore" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete Store</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure ?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.onDelete.bind(this)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default DeleteStore;