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

const value_type= {1: 'Value', 2:'Effort'}

export default class Metrics extends Component {
    state = {}

    render() {
        debugger
        const {detail, handleChange, values, editing, metrics} = this.props;

        const dm = detail.metrics || []
        return (
            <div>
                <List>
                    {dm.map((item, index) => {
                        return (
                            <ListItem key={index}>
                                <Grid container spacing={24}>

                                    <Grid item xs={12}>
                                        <div> Type: {value_type[item.type]}</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div> Name: {item.name}</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div> Weight: {item.weight}</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div> Value: {item.value.score}</div>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl>
                                        <InputLabel htmlFor="age-helper">Add a value</InputLabel>
                                        <Select
                                            value={this.state.fatalAttribute}
                                            onChange={data => handleChange("value", data, item)}
                                            input={<Input name="fatal_attribute" id="fatal_attribute-helper"/>}
                                        >
                                            {values.map(item => {
                                                return (
                                                    <MenuItem>{item.name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                        <FormHelperText>Select a Fatal Attribute to Add</FormHelperText>
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
}