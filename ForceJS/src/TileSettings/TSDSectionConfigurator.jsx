import React, {Component} from 'react'
import TSDialogSection from '../TileSettings/TSDialogSection.jsx'
import {EditableText} from '@blueprintjs/core'

export var FormFieldType = {
	Textfield:0,
	MultilineTextfield:1
}

class TSDSectionConfigurator {
	newSection = () => {
		this.fields = {}
	}

	addField = (type, title, params) => {
		var field
		switch (type) {
			case FormFieldType.Textfield:
				field = <EditableText {...params} />
			break
			case FormFieldType.MultilineTextfield:
				field = <EditableText multiline placeholder={title} {...params} />
			break
			default:
			break	
		}
		var style = {
			marginTop: 5,
			marginBottom: 10
		}
		var nested = (
			<div style={style}>
				<h6>{title}</h6>
				{field}<br/>
			</div>
			)
		this.fields[title] = {
			type: type,
			field: field
        }
	}

	getClassInstanceOfSection = (instance) => {
	    console.log("get section instance called")
        console.log("returned values is: " + instance.getValues())
	}

	closeSection = (title) => {
		var section = (<TSDialogSection title={title}
                                        fields={this.fields}
                                        getInstanceFunc={this.getClassInstanceOfSection.bind(this)} />)
		this.sections.push(section)
	}

	output = () => {
		return this.sections
	}

	constructor() {
		this.sections = []
	}
}

export default TSDSectionConfigurator