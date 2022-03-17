import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import Multiimage from "../Components/Multiimage";
import Swal from 'sweetalert2';
class Addampaign extends Component {
    state={
        campaignName: '',
        startDate: "2017-06-01",
        endDate: "2017-06-01",
        totalBudget: '',
        dailyBudget: '',
        creatives:[],
        images:[]
    }
    //Call back to reusable multiimage uploader component
    multiImageUploaderCallbackFunction = (imData) => {
        if (imData) {
            for (const file of imData) {
                this.state.images.push(file);
            }
        }
        this.setState({creatives: this.state.images})
    }
    //handle each input field and geting the data
    handleInput = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    //saving the data to server
    saveCampaign= async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("campaignName",this.state.campaignName)
        formData.append("startDate",this.state.startDate)
        formData.append("endDate",this.state.endDate)
        formData.append("totalBudget",this.state.totalBudget)
        formData.append("dailyBudget",this.state.dailyBudget)
        for(const fd of this.state.images){
            formData.append("creatives[]", fd);
        }
        const res = await axios.post('http://localhost:8000/api/addcampaign',formData,{headers:{
            "Content-Type":"multipart/form-data"
            }});
        if(res.data.status===201){
            Swal.fire({
                title: 'Success',
                text: res.data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            this.setState({
                campaignName: '',
                startDate: "2017-06-01",
                endDate: "2017-06-01",
                totalBudget: '',
                dailyBudget: '',
                creatives:[]
            });
        }else{
            Swal.fire({
                title: 'Error',
                text: res.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>
                                    Add Campaign
                                    <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form action="" onSubmit={this.saveCampaign}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Campaign Name</label>
                                        <input type="text" name="campaignName" onChange={this.handleInput} value={this.state.campaignName} className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Campaign Start Date</label>
                                        <input type="date" name="startDate" onChange={this.handleInput} value={this.state.startDate} className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Campaign End Date</label>
                                        <input type="date" name="endDate" onChange={this.handleInput} value={this.state.endDate} className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Campaign Total Budget (in USD)</label>
                                        <input type="number" name="totalBudget" onChange={this.handleInput} value={this.state.totalBudget} className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Campaign Daily Budget (in USD)</label>
                                        <input type="number" name="dailyBudget" onChange={this.handleInput} value={this.state.dailyBudget} className="form-control"/>
                                    </div>
                                    <Multiimage parentCallback ={this.multiImageUploaderCallbackFunction}/>
                                    <div className="form-group mb-3">
                                        <button className="btn btn-primary">Save Date</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Addampaign;
