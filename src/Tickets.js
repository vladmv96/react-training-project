import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { savePermalink } from './actions/auth_actions';
import { saveToken } from './actions/auth_actions';
import { saveFirstName } from './actions/auth_actions';
import { saveProjectId } from './actions/auth_actions';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Popup from 'reactjs-popup';
import CreateTicket from './CreateTicket';
import { saveStatuses } from './actions/auth_actions';
import Pagination from "react-js-pagination";


const styles = theme => ({
    root: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
});

class Tickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: '',
            activePage: 1,
            count: ''
        }
    }


    Exit = () => {
        this.props.saveToken(null);
        this.props.saveFirstName(null);
        this.props.savePermalink(null);
        this.props.history.push('/login');
    }

    componentWillMount = () => {
        console.log(this.props.id);
        this.getTickets();
        this.getStatuses();
        console.log(this.props.statuses);
        console.log(this.state.count);
    }

    renderItem = (item, index) => {
        return (
            <TableRow key={index}>
                <TableCell> {item.name} </TableCell>
                <TableCell> {item.phone} </TableCell>
                <TableCell> {item.email} </TableCell>
                <TableCell> {item.id} </TableCell>
            </TableRow>
        )
    }

    handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        this.setState({ 'activePage' : pageNumber }, () => {
            this.getTickets()
        });
      }

    getStatuses = () => {
        axios({
            url: 'https://api.evys.ru/admin2/ticket_statuses',
            method: 'get',
            headers: { 'Authorization': `Basic ${this.props.token}`, 'Account-Name': this.props.permalink }
        }).then(response => {
            this.props.saveStatuses(response.data.data.results);
        })
            .catch(err => {
                console.log(err.response);
            })
    }


    getTickets = () => {
        axios({
            url: `https://api.evys.ru/admin2/project/${this.props.id}/tickets`,
            method: 'get',
            headers: { 'Authorization': `Basic ${this.props.token}`, 'Account-Name': this.props.permalink },
            params: { page: this.state.activePage }
        })
            .then(response => {
                console.log(response.data.data.results);
                let count = response.data.data.count;
                this.setState({ 'count' : count });
                console.log(this.state.count);
                let tickets = response.data.data.results.map((item, index) => { return response.data.data.results[index] });
                this.setState({ 'tickets' : tickets });
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    render() {
        const { tickets } = this.state;
        const { classes } = this.props;

        return (
            <div>
                <Button style={{ float: 'left' }} variant="raised" color="secondary" onClick={this.Exit}> Exit </Button>
                <Popup
                    trigger={<Button style={{ float: 'right', margin: '10px', marginLeft: '-20px' }} variant="fab" color="primary" aria-label="add" className={classes.button}>
                        <AddIcon />
                    </Button>}
                    modal
                    closeOnDocumentClick
                >
                    {close => (
                        <div>
                        <a className="close" style={{float: 'right'}} onClick={close}>
                            &times;
                        </a>
                        <br />
                            <CreateTicket />
                        </div>
                    )}
                </Popup>
                <br />
                <h1>Tickets list</h1>
                {tickets.length !== 0 &&
                    <Paper className={classes.root}><Table className={classes.table}><TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Id</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {tickets.map(this.renderItem)}
                        </TableBody>
                    </Table>
                    </Paper>
                }
                 <Pagination
                    hideNavigation
                    activePage={this.state.activePage}
                    itemsCountPerPage={20}
                    totalItemsCount={this.state.count*20}
                    pageRangeDisplayed={this.state.count}
                    onChange={this.handlePageChange}
                />
            </div>
        )
    }


}

const mapDispatchToProps = {
    savePermalink,
    saveToken,
    saveFirstName,
    saveProjectId,
    saveStatuses
}

const mapStateToProps = (state) => ({
    id: state.auth.id,
    token: state.auth.token,
    first_name: state.auth.first_name,
    permalink: state.auth.permalink,
    statuses: state.auth.statuses
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Tickets));