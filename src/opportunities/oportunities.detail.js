import _ from "lodash";
import React, {Component} from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";

//TODO List current metrics that are associated with the opportunity
//TODO List available fatal attributes
//TODO List current fatal attrabutes that are on the opportunity.

export default class OpportunityDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            metric: {},
            fatalAttribute: {}
        }
    }

    render() {
        const {detail, handleChange, editing, metrics, fatal_attributes} = this.props;
        debugger
        return (
            <List>
                {Object.keys(detail)
                    .filter(x => _.includes(['name', 'summary', 'business_category'], x))
                    .map(key => {
                        return (
                            <ListItem key={key}>
                                <TextField
                                    id={key}
                                    label={key}
                                    value={detail[key]}
                                    onChange={data => handleChange(key, data)}
                                    margin="normal"
                                    disabled={!editing}
                                />
                            </ListItem>
                        )
                    })
                }

                <Typography>
                    METRICS
                </Typography>


                {detail.metrics.map((item, index) => {
                    return (
                        <ListItem key={index}>
                            {` ${item.type} | ${item.name} | ${item.weight} |  Value: ${item.value.score}`}
                        </ListItem>
                    )
                })}

                <Typography>
                    FATAL ATTRIBUTES
                </Typography>

                {detail.fatal_attributes.map((item, index)=> {
                    return (
                        <ListItem key={index}>
                            {` ${item.name} | ${item.summary}`}
                        </ListItem>
                    )
                })}


                <FormControl>
                    <InputLabel htmlFor="age-helper">Add a Metric</InputLabel>
                    <Select
                        value={this.state.metric}
                        onChange={data => this.handleChange("metrics", data)}
                        input={<Input name="metric" id="metric-helper"/>}
                    >
                        {metrics.map(item => {
                            return (
                                <MenuItem>{item.name}</MenuItem>
                            )
                        })}
                    </Select>
                    <FormHelperText>Select a Metric to Add</FormHelperText>
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="age-helper">Add a Fatal Attribute</InputLabel>
                    <Select
                        value={this.state.fatalAttribute}
                        onChange={data => this.handleChange("fatal_attribute", data)}
                        input={<Input name="fatal_attribute" id="fatal_attribute-helper"/>}
                    >
                        {fatal_attributes.map(item => {
                            return (
                                <MenuItem>{item.name}</MenuItem>
                            )
                        })}
                    </Select>
                    <FormHelperText>Select a Fatal Attribute to Add</FormHelperText>
                </FormControl>
            </List>
        )
    }
}
