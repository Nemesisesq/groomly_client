import React, {Component} from 'react'
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {withStyles} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Model from "./opportunities.model";
import Metrics from "./opportunities.metrics";
import FatalAttributes from "./opportunities.fatalAttributes";
import {h as hostUri} from "../config";
import axios from "axios/index";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save"
import Grid from "@material-ui/core/Grid";


//TODO List current metrics that are associated with the opportunity. Needs to be tested
//TODO List current fatal attrabutes that are on the opportunity. Needs to be tested

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
});


class OpportunityDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            detail: {
                metrics: [],
                fatal_attributes: []
            },
            // value: null,
            metric: {},
            fatalAttribute: {}
        }
    }

    handleTabChange = (event, value) => {
        this.setState({value});
    };

    handleTabChangeIndex = index => {
        this.setState({value: index});
    };

    _newOpp = () => {

        // TODO make sure all new opportunities have all the MEtrics added to them available
        this.setState({
            editing: true,
            updating: false
        })
        axios({
            method: "get",
            url: `${hostUri}/opportunities/new`,
            responseType: "application/json",
        })
            .then(data => {
                let d = {...data.data}
                this._addMetricsToNewOpportunity(d);
                this.setState({
                    detail: d
                })

            })
            .catch(error => {
                console.log(error)
            })
    }

    _addMetricsToNewOpportunity = (d) => {
        d.metric_values = JSON.parse(
            JSON.stringify(
                this.state.metrics))
            .map(item => {
                return {"metric": item, "value": this.state.new_value}
            })


    }

    _saveDetail = () => {
// better handling is needed


        //TODO Handle the creation of the saving of metrics via the opportunity metric endpoints.


        if (!this.state.editing) {
            this.setState({
                editing: true
            });
            return
        }

        if (this.state.updating) {
            axios({
                method: "put",
                url: `${hostUri}/opportunities/${this.state.detail.id}`,
                responseType: "application/json",
                data: this.state.detail
            })
                .then(data => {
                    this._getOpportunities()
                    this.setState({
                        editing: false
                    })

                })
                .catch(error => {
                    console.log(error)
                })

        } else {

            axios({
                method: "post",
                url: `${hostUri}/opportunities`,
                responseType: "application/json",
                data: this.state.detail
            })
                .then(data => {
                    this._getOpportunities()
                    this.setState({
                        editing: false
                    })
                })
                .catch(error => {
                    console.log(error)
                })

        }


    }

    _handleChange = (key, data, index) => {
        let value = data.target.value;
        if (key === "value") {

            this.state.detail.metric_values[index].value = value
            this.forceUpdate()

            return
        }


        if (key === "metric.value") {
            this.state.detail.metric_values[index].weight = value
            this.forceUpdate()

            return
        }
        this.setState((prevState, props) => {


            switch (key) {
                case "metric":
                    value = [...prevState.detail.metrics, value];
                    break;
                case "fatal_attribute":
                    value = [...(prevState.detail.fatal_attributes || []), value];
                    break;
                default:
            }


            return {
                detail: {
                    ...this.state.detail,
                    ... {[key]: value}
                }
            }
        })
        console.log(data)
    }

    _selectDetail = (event, id) => {
        axios({
            method: "get",
            url: `${hostUri}/opportunities/${id}`,
            responseType: "application/json",
        })
            .then(data => {
                this.setState({
                    detail: {...data.data},
                    updating: true
                })
            })
            .catch(error => {
                console.log(error)
            })

    }


    render() {
        const {classes, theme} = this.props;
        return (
            //TODO Add tabs for metrics and Fatal Attributes
            <div>
                <Button variant="fab" color="default" aria-label="add" onClick={this._saveDetail}>
                    {<SaveIcon/>}
                </Button>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <div>Opportunity</div>
                            <Model detail={this.state.detail} dir={theme.direction}/>

                            <div>Metrics</div>
                            <Metrics detail={this.state.detail} dir={theme.direction}/>
                            <div>Fatal Attributes</div>
                            <FatalAttributes detail={this.state.detail} fatal_attributes={[]} dir={theme.direction}/>
                        </Grid>
                    </Grid>

            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(OpportunityDetail)
