import React, {Component} from 'react'
import TSDialogSection from '../TileSettings/TSDialogSection.jsx'
import {
    EditableText,
    Switch
} from '@blueprintjs/core'

export var FormFieldType = {
	Textfield:0,
	MultilineTextfield:1,
    NumericalText: 2,
    Switch: 3
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
            case FormFieldType.NumericalText:
                field = <EditableText {...params} />
                break
            case FormFieldType.Switch:
                field = <Switch {...params} />
                break
			default:
			break	
		}

		this.fields[title] = {
			type: type,
			title: title,
			field: field
        }
	}

	getClassInstanceOfSection = (instance) => {
	    console.log("get section instance called")
        console.log("returned values is: " + instance.getValues())
	}

	printLine = () => {
		console.log("--------------------")
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