import React, {Component} from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'
import _ from 'lodash'
import Grid from "@material-ui/core/Grid";
export default class Model extends Component {

    state = {

    }
    render(){
        const {detail, handleChange, editing} = this.props;
        return (
            <Grid container spacing={16}>
                {Object.keys(detail)
                    .filter(x => _.includes(['name', 'summary', 'business_category'], x))
                    .map(key => {
                        return (
                            <Grid item key={key}>
                                <TextField
                                    id={key}
                                    label={key}
                                    value={detail[key]}
                                    onChange={data => handleChange(key, data)}
                                    margin="normal"
                                />
                            </Grid>
                        )
                    })
                }

            </Grid>
        )
    }

}