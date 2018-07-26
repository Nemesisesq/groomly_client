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
import {connect} from "react-redux";
import {setDetail} from "../ducks/ducks.opportunity";
import _ from 'lodash'
import {withRouter} from "react-router";


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
            metrics: [],
            fatal_attributes: []
        }
    }

    _getFatalAttributes = () => {
        axios({
            method: "get",
            url: `${hostUri}/fatal_attributes`,
            responseType: "application/json",
        })
            .then(data => {
                this.setState({
                    fatal_attributes: [...data.data]
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    _getMetrics = () => {
        axios({
            method: "get",
            url: `${hostUri}/metrics`,
            responseType: "application/json",
        })
            .then(data => {
                this.setState({
                    metrics: [...data.data]
                })
            })
            .catch(error => {
                console.log(error)
            })
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
                this.setState({
                    detail: d
                })
                // this._addMetricsToNewOpportunity(d);

                return d
            })
            .catch(error => {
                console.log(error)
            })
    }

    _addMetricsToNewOpportunity = async (d) => {
        d.metric_values = await JSON.parse(
            JSON.stringify(
                this.state.metrics))
            .map(item => {
                return {"metric": item, "value": this.state.new_value}
            })
        return d

    }

    _saveDetail = () => {
// better handling is needed
        //TODO Handle the creation of the saving of metrics via the opportunity metric endpoints.
        const { match, location, history, setDetail } = this.props
debugger


        let data1 = this.state.detail;
        if (this.state.updating) {
            axios({
                method: "put",
                url: `${hostUri}/opportunities/${data1.id}`,
                responseType: "application/json",
                data: data1
            })
                .then(data => {
                    this.setState({
                        editing: false
                    })
                    history.push('/opportunities')


                })
                .catch(error => {
                    console.log(error)
                })

        } else {

            axios({
                method: "post",
                url: `${hostUri}/opportunities`,
                responseType: "application/json",
                data: data1
            })
                .then(data => {
                    this.setState({
                        editing: false
                    })
                    history.push('/opportunities')

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
                case "fatal_attributes":
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

    _selectDetail = async (id) => {
        await axios({
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

    async componentWillMount() {
       await this._getFatalAttributes()
       //  await this._getMetrics()
    }
    async componentDidMount(){
       const {detail_id} = this.props
        if (detail_id === 'new') {
            await this._newOpp()
        } else if (!_.isEmpty(detail_id)) {
            await this._selectDetail(detail_id)
        } else {
            this._newOpp()
        }
    }

    componentWillUnmount() {
        const {setDetail} = this.props
        setDetail(null)
    }

    render() {
        const {classes, theme} = this.props;
        const {fatal_attributes} = this.state
        return (
            //TODO Add tabs for metrics and Fatal Attributes
            <div>
                <Button variant="fab" color="default" aria-label="add" onClick={this._saveDetail}>
                    {<SaveIcon/>}
                </Button>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <h2>Opportunity</h2>
                        <Model handleChange = {this._handleChange}  detail={this.state.detail} dir={theme.direction}/>

                        <h2>Metrics</h2>
                        <Metrics handleChange = {this._handleChange} detail={this.state.detail} dir={theme.direction}/>
                        <h2>Fatal Attributes</h2>
                        <FatalAttributes handleChange = {this._handleChange}  detail={this.state.detail} {...this.state} fatal_attributes={fatal_attributes}/>

                    </Grid>
                </Grid>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        detail_id: state.opportunities.detail_id
    }
}
export default withRouter(connect(mapStateToProps, {setDetail})(withStyles(styles, {withTheme: true})(OpportunityDetail)))

