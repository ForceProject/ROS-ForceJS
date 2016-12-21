import React, {Component} from 'react'
import {
    Button,
    Dialog,
    Intent,
    RadioGroup,
    Radio
} from '@blueprintjs/core'
import TextField from 'material-ui/TextField'
import Dropzone from 'react-dropzone'
import './LoadDialog.css'
import GF from './GlobalFunctions'

class LoadDialog extends Component {

    textfieldValueChanged = (event, newValue) => {
        this.pasteValue = newValue
    }

    saveClicked = () => {
        let value = this.state.showUpload ? this.uploadValue : this.pasteValue
        console.log(value)
        if (GF.isJSON(value)) {
            this.app.loadController(value)
            this.toggleDialog()
        } else {
            alert("Uploaded/Pasted data was not a valid JSON file/string.")
        }
    }

    toggleDialog = () => {
        console.log("toggle called")
        this.setState({
            isOpen: !this.state.isOpen
        })
        //if (!this.state.isOpen) {
        this.app.removeCurrentDialog()
        //}
    }

    fileDropped = (files) => {
        if (files.length > 0) {
            console.log("File Dropped")
            console.log(files)
            var file = files[0]
            //if (file.type.indexOf("text") == 0) {
            var reader = new FileReader();
            reader.onload = (e) => {
                // get file content
                var text = e.target.result;
                if (GF.isJSON(text)) {
                    this.uploadValue = text
                } else {
                    alert("Uploaded file was not a valid JSON file.")
                }
            }
            reader.readAsText(file);
            //}
            this.setState({
                files: files
            })
        }
    }

    constructor(props) {
        super(props)
        this.app = this.props.app
        this.state = {
            isOpen: true,
            files: [],
            uploadMethod:"Upload",
            showUpload: true,
        }
        this.pasteValue = ""
    }

    radioChanged = () => {
        this.setState({
            uploadMethod: this.state.uploadMethod === "Upload" ? "Paste" : "Upload",
            showUpload: this.state.uploadMethod !== "Upload",
        })
    }

    render() {
        var uploadSection = (<div>
            <h5>Upload File</h5>
            <Dropzone onDrop={this.fileDropped} multiple={false} className="dropzone">
                <div key="prompt">Drop files here, or click to select files to upload.</div>
                <br/>
                {this.state.files.map((file) =>
                    <div key="result">
                        <h6> File Selected:</h6>
                        <img src={file.preview}/>
                        <p>{file.name}</p>
                    </div>
                )}
            </Dropzone>
        </div>)

        /*
         <EditableText
         placeholder="Copy and Paste the JSON of a save file into here to load it as a controller."
         multiline
         minLines={10}
         maxLines={15}
         onChange={this.textfieldValueChanged}
         defaultValue={this.pasteValue}/>
         */

        var pasteSection = (
            <div>
                <h5>Paste Controller JSON</h5>
                <TextField
                    hintText="Copy & Paste the JSON of a save file here to load it."
                    floatingLabelText="JSON Entry Field"
                    multiLine={true}
                    fullWidth={true}
                    rows={
                        this.pasteValue.length > 0 ? 5:1
                    }
                    rowsMax={15}
                    style={
                        {
                            fontSize: this.pasteValue.length > 0 ? 10:15
                        }
                    }
                    onChange={this.textfieldValueChanged}/>

            </div>
        )

        return (
            <Dialog
                iconName="pt-icon-document-open"
                isOpen={this.state.isOpen}
                onClose={this.toggleDialog}
                title="Load Controller">
                <div className="pt-dialog-body">
                    <h5>Upload Method</h5>
                    <RadioGroup onChange={this.radioChanged} selectedValue={this.state.uploadMethod}>
                        <Radio label="Upload JSON File" value="Upload" />
                        <Radio label="Paste JSON String" value="Paste" />
                    </RadioGroup>
                    <br/>
                    { this.state.showUpload ? (uploadSection) : (pasteSection) }
                </div>
                <div className="pt-dialog-footer">
                    <div className="pt-dialog-footer-actions">
                        <Button text="Cancel" />
                        <Button intent={Intent.PRIMARY} onClick={this.saveClicked} text="Load" />
                    </div>
                </div>
            </Dialog>
        )
    }
}

export default LoadDialog