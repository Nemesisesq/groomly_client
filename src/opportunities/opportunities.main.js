import React, {Component} from 'react'
import List from '@material-ui/core/List'
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import axios from 'axios'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/es/Button/Button";
import AddIcon from "@material-ui/icons/Add"
import SaveIcon from "@material-ui/icons/Save"
import TextField from "@material-ui/core/es/TextField/TextField";
import {withStyles} from '@material-ui/core/styles';
import _ from 'lodash'

const hostUri = "http://localhost:3000/api";

const OpportunityList = props => {
    return (
        <List>
            {props.opportunities.map(item => {
                return (
                    <ListItem key={item.id}>
                        {item.name}
                        |
                        {item.summary}
                    </ListItem>
                )
            })}
        </List>
    )
}

const OpportunityDetail = props => {
    const {detail} = props;
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
                            onChange={data => props.handleChange(key, data)}
                            margin="normal"
                            disabled={!props.editing}
                        />
                    </ListItem>
                )
            })}
        </List>
    )
}


class Opportunities extends Component {

    constructor(props) {
        super(props);
        this.state = {
            opportunities: [{name: 'hello world', id: 1}, {name: "wornderful", id: 2}],
            detail: {},
            editing: true
        }
    }

    componentDidMount() {


        axios({
            method: "get",
            url: `${hostUri}/opportunities`,
            responseType: "application/json",
        })
            .then(data => {

                this.setState({
                    opportunities: [...data.data]
                })
            })
            .catch(error => {
                console.log(error)
            })

    }

    _newOpp = () => {
        this.setState({
            editing: true
        })
        axios({
            method: "get",
            url: `${hostUri}/opportunities/new`,
            responseType: "application/json",
        })
            .then(data => {
                this.setState({
                    detail: {...data.data}
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    _saveDetail = () => {
// better handling is needed
        axios({
            method: "post",
            url: `${hostUri}/opportunities`,
            responseType: "application/json",
            data: this.state.detail
        })
            .then(data => {
                debugger
                this.setState({
                    editing : false
                })
            })
            .catch(error => {
                console.log(error)
            })

    }
    _handleChange = (key, data) => {

        this.setState({
            detail: {
                ...this.state.detail,
                ... {[key]: data.target.value}
            }
        })
        console.log(data)
    }

    render() {
        return (<div>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <OpportunityList opportunities={this.state.opportunities}/>
                        <Button variant="fab" color="primary" aria-label="add" onClick={this._newOpp}>
                            <AddIcon/>
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <OpportunityDetail detail={this.state.detail} handleChange={this._handleChange}
                                           editing={this.state.editing}/>
                        <Button variant="fab" color="default" aria-label="add" onClick={this._saveDetail}>
                            <SaveIcon/>
                        </Button>

                    </Grid>
                </Grid>
            </div>
        )
    }
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
});


export default withStyles(styles)(Opportunities)