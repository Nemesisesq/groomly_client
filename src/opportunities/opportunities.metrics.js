import React, {Component} from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";

export default class Metrics extends Component {
    state = {

    }
    render() {
        debugger
        const {detail, handleChange, editing, metrics} = this.props;

        const dm = detail.metrics || []
        return (
            <div>
                <List>
                    {dm.map((item, index) => {
                        return (
                            <ListItem key={index}>
                                {` ${item.type} | ${item.name} | ${item.weight} |  Value: ${item.value.score}`}
                            </ListItem>
                        )
                    })}
                </List>

                <FormControl>
                    <InputLabel htmlFor="age-helper">Add a Metric</InputLabel>
                    <Select
                        value={this.state.metric}
                        onChange={data => handleChange("metrics", data)}
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
            </div>
        )
    }
}