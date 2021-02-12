import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import {withStyles} from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import {Link} from 'react-router-dom';

import {findUserProfile, updateUser} from '../../services/api-user.js';
import auth from "../auth/auth-helper";

const styles = theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 2
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing.unit * 2,
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing.unit * 2
    }
});

class UpdateUser extends Component {

    constructor({match}) {
        super();
        this.state = {
            userId: '',
            name: '',
            email: '',
            open: false,
            error: ''
        };
        this.match = match;
    }


    init = userId => {
        const jwt = auth.isAuthenticated();
        this.setState({currentUserId: userId});
        findUserProfile(
            {userId: userId},
            {t: jwt.token}
        ).then(data => {
            if (data.error) {
                this.setState({redirectToSignin: true});
            } else {
                this.setState({
                    userId: userId,
                    name: data.name,
                    email: data.email
                });
            }
        });
    };

    // init with name and email by default
    componentWillReceiveProps = props => {
        this.init(props.match.params.userId);
    };

    componentDidMount = () => {
        this.init(this.match.params.userId);
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    clickSubmit = () => {
        const jwt = auth.isAuthenticated();
        const user = {
            name: this.state.name || undefined,
            email: this.state.email || undefined,
        };
        updateUser(
            {
                userId: this.state.userId,
                user: user
            },
            {t: jwt.token}
        ).then(data => {
            if (data.error) {
                this.setState({error: data.error});
            } else {
                this.setState({error: '', open: true});
            }
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography
                            type="headline"
                            component="h2"
                            className={classes.title}
                        >
                            Update user information
                        </Typography>
                        <TextField
                            id="name"
                            label="Name"
                            className={classes.textField}
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                        />
                        <br/>
                        <TextField
                            id="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            margin="normal"
                        />

                        {this.state.error && (
                            <Typography component="p" color="error">
                                {this.state.error}
                            </Typography>
                        )}
                    </CardContent>
                    <CardActions>
                        <Button
                            color="primary"
                            variant="raised"
                            onClick={this.clickSubmit}
                            className={classes.submit}
                        >
                            Submit
                        </Button>
                    </CardActions>
                </Card>
                <Dialog open={this.state.open} disableBackdropClick={true}>
                    <DialogTitle>Update </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Successfully updated.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                            <Button color="primary" autoFocus="autoFocus" variant="raised" onClick={() => this.props.history.goBack()}>
                                Back
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(UpdateUser);
