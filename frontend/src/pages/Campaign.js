import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import Modal from "../Components/Modal";

class Campaign extends Component {
    state={
        campaign:[],
        loading:true,
        showPopup: false,
        creatives:{}
    }
    openPopup(item) {
        this.setState({
            showPopup: true,
            creatives:item
        });
    }
    closeingPopup(){
        this.setState({
            showPopup: false,
        });
    }
    async componentDidMount() {
        const res = await axios.get('http://localhost:8000/api/campaign');
        if(res){
            this.setState({
                campaign:res.data.campaign,
                loading:false
            })
        }
    }
    showImagePrev(data){
        console.log(data)
    }
    render() {
        let camp_table="";
        if (this.state.loading){
            camp_table=<tr><td colSpan="6">Loading...</td></tr>;
        }else{
            camp_table=
            this.state.campaign.map((item)=>{
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.campaign_name}</td>
                        <td>{item.start_date}</td>
                        <td>{item.end_date}</td>
                        <td>{item.total_budget}</td>
                        <td>{item.daily_budget}</td>
                        <td>
                            <button onClick={this.openPopup.bind(this,item.creatives)} className="btn btn-primary">View Creatives</button>
                        </td>
                        <td>
                            <Link to={`edit-campaign/${item.id}`} className="btn btn-success btn-sm float-end">Edit</Link>
                        </td>
                    </tr>
                );
            })
        }
        return (<div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>
                                    Campaign Data
                                    <Link to={'add-campaign'} className="btn btn-primary btn-sm float-end">Add
                                        Campaign</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Campaign Name</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Total Budget</th>
                                            <th>Daily Budget</th>
                                            <th>Creatives</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {camp_table}
                                    </tbody>
                                </table>
                                {this.state.showPopup ?
                                    <Modal
                                        items={this.state.creatives}
                                        closePopup={this.closeingPopup.bind(this)}
                                    />
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default Campaign;
