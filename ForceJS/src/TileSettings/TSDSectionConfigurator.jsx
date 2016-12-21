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
	newSection = (sectionTitle) => {
		this.fields = {}
		this.sectionTitle = sectionTitle
        this.trackedChanges[this.sectionTitle] = {}
    }

	addField = (type, title, params) => {
	    if (title === "Tag") {
	        this.thisTag = params.defaultValue
        }
        var newParams = params
        // Add in the onChange listener to track the changes
        newParams["onChange"] = this.trackFieldChange.bind(this, type, this.sectionTitle, title)
        newParams["key"] = this.fieldNumber
        this.fieldNumber += 1
        // Set the inital values in the tracked dictionary just in case it is never changed
        if (type !== FormFieldType.Switch) {
            this.trackFieldChange(type, this.sectionTitle, title, params["defaultValue"])
        } else {
            this.trackFieldChange(type, this.sectionTitle, title, params["defaultChecked"])
        }

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

	closeSection = () => {
		var title = this.sectionTitle
		this.sectionTitle = ""
        this.fieldNumber = 0
		var section = (<TSDialogSection key={this.sections.length}
                                        title={title}
                                        fields={this.fields}
                                        getInstanceFunc={this.getClassInstanceOfSection.bind(this)} />)
		this.sections.push(section)
    }

	output = () => {
		return this.sections
	}

	trackFieldChange = function(typ, section, key, value) {
	    var v = value
	    if (typ === FormFieldType.NumericalText) {
	        v = parseFloat(value)
        }
		this.trackedChanges[section][key] = v
        // TODO: Make it so it doesn't warn twice
		if (section === "Tag") {
			if (v !== this.thisTag) {
                let index = this.allTags.indexOf(v)
                if (index !== -1) {
                    alert("Tag (" + v + ") already exists, please choose another one.")
                }
            }
		}
	}

	getData = () => {
		return this.trackedChanges
	}

	constructor(allTags) {
		this.allTags = allTags
		this.sections = []
		this.sectionTitle = ""
		this.trackedChanges = {}
		this.fieldNumber = 0
	}
}

export default TSDSectionConfigurator