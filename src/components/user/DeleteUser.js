import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core//Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Delete from '@material-ui/icons/Delete';
import auth from '../auth/auth-helper';
import { deleteUser } from '../../services/api-user';
import { Redirect } from 'react-router-dom';

class DeleteUser extends Component {
	state = {
		redirectSignout: false,
		refresh:false,
		open: false
	};
	clickButton = () => {
		this.setState({ open: true });
	};
	deleteAccount = () => {
		const jwt = auth.isAuthenticated();
		deleteUser(
			{
				userId: this.props.userId
			},
			{ t: jwt.token }
		).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				if (this.props.loggingOut) {
					auth.signout(() => console.log('deleted'));
					this.setState({redirectSignout: true});
				}
				else {
					this.setState({refresh: true});
				}
			}
		});
	};
	handleRequestClose = () => {
		this.setState({ open: false });
	};
	render() {
		const redirectSignout = this.state.redirectSignout;
		if (redirectSignout) {
			return <Redirect to="/" />;
		}
		const refresh = this.state.refresh;
		if (refresh) {
			return <Redirect to={"/user/" + this.props.userId}  />;
		}
		// else
		// 	return <Redirect to={"/"+this.props.userId} />;
		return (
			<span>
				<IconButton
					aria-label="Delete"
					onClick={this.clickButton}
					color="secondary"
				>
					<Delete />
				</IconButton>

				<Dialog open={this.state.open} onClose={this.handleRequestClose}>
					<DialogTitle>{'Delete Account'}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Confirm to delete your account.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleRequestClose} color="primary">
							Cancel
						</Button>
						<Button
							onClick={this.deleteAccount}
							color="secondary"
							autoFocus="autoFocus"
						>
							Confirm
						</Button>
					</DialogActions>
				</Dialog>
			</span>
		);
	}
}

export default DeleteUser;
