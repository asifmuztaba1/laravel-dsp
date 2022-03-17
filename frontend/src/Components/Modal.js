import React, {Component} from 'react';

class Modal extends Component {
    state = {
        images: {}
    }
    constructor(props) {
        super(props)
        this.state = {
            images: this.props.items
        }
        console.log(this.props)
    }
    render() {
        let imageGallery = ""
        if (this.state.images) {
            imageGallery =
                this.state.images.map((item, index) => {
                    let url = "http://localhost:8000/storage/" + item.file_name;
                    return <div key={index} className="wraper col-md-3"><img src={url} key={index} alt=""/><p className="text-center">{item.file_name}</p></div>
                    })
        }
        return (
                <div id="popup">
                    <div className="overlay"></div>
                    <button onClick={this.props.closePopup} className="btn btn-danger modalclosebutton">Close</button>
                    <div className="row gallery">
                        {imageGallery}
                    </div>
                </div>
        );
    }
}

export default Modal;
