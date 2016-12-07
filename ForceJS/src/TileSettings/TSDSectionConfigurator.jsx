import React, {Component} from 'react'
import TSDialogSection from '../TileSettings/TSDialogSection.jsx'
import {EditableText} from '@blueprintjs/core'

export var FormFieldType = {
	Textfield:0
}

class TSDSectionConfigurator {
	newSection = () => {
		this.fields = []
	}

	addField = (type, title) => {
		var field
		switch (type) {
			case FormFieldType.Textfield:
				field = (<EditableText placeholder={title} />)
			break
			default:
			break	
		}
		var nested = (<div>{field}<br/></div>)
		this.fields.push(nested)
	}

	closeSection = (title) => {
		var section = (<TSDialogSection title={title} fields={this.fields} />)
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