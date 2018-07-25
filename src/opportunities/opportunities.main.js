import React, {Component} from 'react'
import axios from 'axios'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add"
import SaveIcon from "@material-ui/icons/Save"
import EditIcon from "@material-ui/icons/Edit"
import OpportunityDetail from "./opportunities.detail";
import OpportunityList from "./opportunities.list"
import {h as hostUri} from "../config"


// const OpportunityDetail = props => {
//     const {detail} = props;
//     return (
//         <List>
//             {Object.keys(detail)
//                 .filter(x => _.includes(['name', 'summary', 'business_category'], x))
//                 .map(key => {
//                     return (
//                         <ListItem key={key}>
//                             <TextField
//                                 id={key}
//                                 label={key}
//                                 value={detail[key]}
//                                 onChange={data => props.handleChange(key, data)}
//                                 margin="normal"
//                                 disabled={!props.editing}
//                             />
//                         </ListItem>
//                     )
//                 })}
//         </List>
//     )
// }


class Opportunities extends Component {


    constructor(props) {
        super(props);
        this.state = {
            opportunities: [{name: 'hello world', id: 1}, {name: "wornderful", id: 2}],
            detail: {
                metrics: [],
                fatal_attributes: []
            },
            editing: true,
            updating: false,
            metrics: [],
            fatalAttributes: [],
            new_value: {}
        }
    }

    componentDidMount() {


        // if (location.host.match(/localhost/)) {
        //     hostUri = "http://localhost:3000/api";
        // } else {
        //     hostUri = "https://groomly.herokuapp.com/api";


        this._getOpportunities();
        this._getMetrics();
        this._getFatalAttributes();
        this._getValues()
        this._getNewValue()

    }

    _getOpportunities() {
        axios({
            method: "get",
            url: `${hostUri}/opportunities`,
            responseType: "application/json",
        })
            .then(data => {

                debugger
                this.setState({
                    opportunities: [...data.data]
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
    _getValues = () => {
        axios({
            method: "get",
            url: `${hostUri}/values/new`,
            responseType: "application/json",
        })
            .then(data => {
                this.setState({
                    values: [...data.data]
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    _getNewValue = () => {
        axios({
            method: "get",
            url: `${hostUri}/values`,
            responseType: "application/json",
        })
            .then(data => {
                this.setState({
                    new_value: [...data.data]
                })
            })
            .catch(error => {
                console.log(error)
            })
    }


    _getFatalAttributes = () => {
        axios({
            method: "get",
            url: `${hostUri}/fatal_attributes`,
            responseType: "application/json",
        })
            .then(data => {
                this.setState({
                    fatalAttributes: [...data.data]
                })
            })
            .catch(error => {
                console.log(error)
            })
    }


    _newOpp = () => {

        const {navigation} = this.props

        navigation.navigate('Opportunity', {id: 'new'})
        // TODO make sure all new opportunities have all the MEtrics added to them available
        // this.setState({
        //     editing: true,
        //     updating: false
        // })
        // axios({
        //     method: "get",
        //     url: `${hostUri}/opportunities/new`,
        //     responseType: "application/json",
        // })
        //     .then(data => {
        //         let d = {...data.data}
        //         this._addMetricsToNewOpportunity(d);
        //         this.setState({
        //             detail: d
        //         })
        //
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
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

        const {navigation} = this.props

        navigation.navigate('Opportunity', {id: id})

        // axios({
        //     method: "get",
        //     url: `${hostUri}/opportunities/${id}`,
        //     responseType: "application/json",
        // })
        //     .then(data => {
        //         this.setState({
        //             detail: {...data.data},
        //             updating: true
        //         })
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })

    }

    _cancelEdit = _ => {
        this.setState({
            editing: true
        })
    }

    render() {
        const {fatalAttributes, metrics, values, editing, detail} = this.state
        return (<div>
                        <Button variant="fab" color="primary" aria-label="add" onClick={this._newOpp}>
                            <AddIcon/>
                        </Button>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <OpportunityList opportunities={this.state.opportunities} select={this._selectDetail}/>
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


export default Opportunities