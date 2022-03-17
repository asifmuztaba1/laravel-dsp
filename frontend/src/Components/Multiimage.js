import React, { Component } from 'react';

class Multiimage extends Component {

    fileObj = [];
    fileArray = [];
    sendD=[];

    constructor(props) {
        super(props)
        this.state = {
            file: [null],
            fetchdFile:[],
            isGetImageProp:false,
            filesToDeleteOnUpdate:[]
        }
        /*
            Here the condition is checked for using the update image and insert image component switching
         */
        if(this.props.getImages) {
            this.state.isGetImageProp=true
            this.props.getImages.map((item, index) => {
                let url = "http://localhost:8000/storage/" + item.file_name
                return this.state.fetchdFile.push([item.id,url])
            })
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
    }
    //If the user select previous image to be change in update comp this function will revoke
   onDeleteButtonClick(item){
        this.setState({
            fetchdFile: this.state.fetchdFile.filter(function(feeder){ return feeder[0] !== item[0] })
        })
        this.state.filesToDeleteOnUpdate.push(item[0])
        console.log(this.state.filesToDeleteOnUpdate)
       this.sendDataToUpdate(null,this.state.filesToDeleteOnUpdate)
    }
    //sending data to parent component
    sendData = (files) => {
        this.props.parentCallback(files);
    }
    sendDataToUpdate = (fileToUp,fileToDel) => {
        this.props.parentCallback(fileToUp,fileToDel);
    }
//uploading the image data by sending them to parent
    uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
            if(this.state.isGetImageProp){
                this.state.fetchdFile.push([null,URL.createObjectURL(this.fileObj[0][i])])
            }
            this.sendD.push(this.fileObj[0][i])
        }
        this.setState({ file: this.fileArray })
        if(this.state.isGetImageProp){
            this.sendDataToUpdate(e.target.files,this.state.filesToDeleteOnUpdate)
        }else{
            this.sendData(e.target.files);
        }
    }
    render() {
        return (
            <div>
                <div className="form-group multi-preview multiimage-preview-hub">
                    {(this.state.isGetImageProp)?
                        ((this.state.fetchdFile || []).map((item,index) => (
                            //this function works in update campaign data
                        <div key={index}>
                            <img  src={item[1]} alt="..." />
                            <button type="button" className="btn btn-danger" onClick={this.onDeleteButtonClick.bind(this,item) }>Delete</button></div>
                    ))):
                        ((this.fileArray || []).map((url,index) => (
                            //this function works in create new campaign
                        <img key={index} src={url} alt="..." />
                    )))}
                </div>

                <div className="form-group">
                    <input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />
                    <br/>
                </div>
            </div>
        )
    }
}
export default Multiimage;
