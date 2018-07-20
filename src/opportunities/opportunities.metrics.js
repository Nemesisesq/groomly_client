import React, {Component} from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import _ from 'lodash'

const value_type= {1: 'Value', 2:'Effort'}

export default class Metrics extends Component {
    state = {}
    render() {
        const {detail, handleChange, values, editing, metrics} = this.props;

        const dm = detail.metric_values || []
        return (
            <div>
                <List>
                    {dm.map((item, index) => {
                        const {metric, value} = item
                        return (
                            <ListItem key={index}>
                                <Grid container spacing={24}>

                                    <Grid item xs={12}>
                                        <div> Type: {value_type[metric.type]}</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div> Name: {metric.name}</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div> Weight: {metric.weight}</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div> Value: {value.score}</div>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl>
                                        <InputLabel htmlFor="value-helper">Add a value</InputLabel>
                                        <Select
                                            value={this._value(metric, value)}
                                            onChange={data => {

                                                handleChange("value", data, index)
                                            }}

                                        >
                                            {metric.choices.map((item2, index) => {

                                                return (
                                                    <MenuItem key={index} value={item2}>{item2.name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                        <FormHelperText>Select a Value</FormHelperText>
                                    </FormControl>
                                    </Grid>

                                </Grid>
                            </ListItem>
                        )
                    })}
                </List>
            </div>
        )
    }

    _value(metric, value) {
debugger
         let v = _.find(metric.choices, value)
        return v || "";
    }
}