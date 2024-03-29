import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});


const OpportunityList = props => {
    const {select, opportunities, classes} = props
    const keys = [
        "name",
        "summary",
        "business_category",
        "value_score",
        "effort_score"
    ]
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {keys.map((item, index) => {
                            return <TableCell key={index}>{item}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {opportunities.map(n => {
                        return (
                            <TableRow
                                key={n.id}
                                onClick={event => {
                                    select(event, n.id)
                                }}
                            >
                                {keys.map((key, index) => {
                                    return <TableCell key={index}>{n[key]}</TableCell>
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    )

}

OpportunityList.propTypes = {
    select: PropTypes.func.isRequired,
    opportunities: PropTypes.array.isRequired
};
export default withStyles(styles)(OpportunityList);