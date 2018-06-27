import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { deleteStatus } from '../actions/auth_actions';



const styles = theme => ({
    root: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
});

class DeleteStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    


    renderStatuses = (item, index) => {
        return (
            <div key={index}>
                <br />
            <Button style={{ margin: '10px' }} color="secondary" aria-label="add" className={this.props.classes.button} onClick={this.deleteStatus.bind(this, item.id)}> 
            {item.title} 
            </Button>
            </div>
        )
    }

    deleteStatus = (id) => {
        this.props.deleteStatus(id);
    }

    render() {

        return (
            <div>

                <h3> Select the status to delete </h3>

                <br />

                {this.props.statuses.map(this.renderStatuses)}

            </div>
        )
    }


}

const mapStateToProps = (state) => ({
    id: state.auth.id,
    token: state.auth.token,
    permalink: state.auth.permalink,
    statuses: state.auth.statuses
})

const mapDispatchToProps = {
    deleteStatus
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DeleteStatus));