import React, {Component} from "react";
import {Link } from 'react-router-dom';
import axios from "axios";
import Multiimage from "../Components/Multiimage";
import Swal from "sweetalert2";
class Editampaign extends Component {
    state={
        campaignName: '',
        startDate: "2017-06-01",
        endDate: "2017-06-01",
        totalBudget: '',
        dailyBudget: '',
        creatives:[],
        images:[],
        sendToMulti:'',
        imageToDel:[]
    }

    callbackFunction = (filesToUp,fileToDel) => {
        if (filesToUp ) {
            for (const file of filesToUp) {
                this.state.images.push(file);
            }
        }if(fileToDel){
            this.setState({imageToDel: fileToDel})
        }
        this.setState({creatives: this.state.images})
    }
    // when the url called the data according to the id is rendered to the state
    async componentDidMount() {
        const camp_id=this.props.match.params.id;
        const res = await axios.get(`http://localhost:8000/api/edit-campaign/${camp_id}`);
        if(res.data.status===200){
            this.setState({
                campaignName: res.data.campaign.campaign_name,
                startDate: res.data.campaign.start_date,
                endDate: res.data.campaign.end_date,
                totalBudget: res.data.campaign.total_budget,
                dailyBudget: res.data.campaign.daily_budget,
                creatives:res.data.campaign.creatives,
                sendToMulti:res.data.campaign.creatives
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
    handleInput = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    // sending the data to server
    updateCampaign= async (e)=>{
        e.preventDefault();
        const camp_id=this.props.match.params.id;
        const formData = new FormData();
        formData.append("campaignName",this.state.campaignName)
        formData.append("startDate",this.state.startDate)
        formData.append("endDate",this.state.endDate)
        formData.append("totalBudget",this.state.totalBudget)
        formData.append("dailyBudget",this.state.dailyBudget)
        formData.append("_method","PUT")
        for(const fd of this.state.images){
            formData.append("creatives[]", fd);
        }
        if(this.state.imageToDel.length){
            formData.append('imagetodel[]',this.state.imageToDel)
        }
        const res = await axios.post(`http://localhost:8000/api/update-campaign/${camp_id}`,formData);
        if(res.data.status===200){
            Swal.fire({
                title: 'Succes',
                text: res.data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
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
                                    Update Campaign
                                    <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form action="" onSubmit={this.updateCampaign}>
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
                                        <label htmlFor="">Campaign Total Budget</label>
                                        <input type="number" name="totalBudget" onChange={this.handleInput} value={this.state.totalBudget} className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Campaign Daily Budget</label>
                                        <input type="number" name="dailyBudget" onChange={this.handleInput} value={this.state.dailyBudget} className="form-control"/>
                                    </div>
                                    {this.state.sendToMulti === '' ? (<>Loading...</>) :(
                                        <Multiimage parentCallback={this.callbackFunction}
                                                    getImages={this.state.sendToMulti}/>
                                    )}
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Update Campaign</button>
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
export default Editampaign;
