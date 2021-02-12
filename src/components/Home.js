import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	card: {
		maxWidth: 700,
		margin: 'auto',
		marginTop: theme.spacing.unit * 5
	},
	title: {
		padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme
			.spacing.unit * 2}px`,
		color: theme.palette.text.secondary,
		fontSize: 24
	},
	media: {
		minHeight: 450
	}
});

class Home extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Card className={classes.card}>
					<Typography type="headline" component="h2" className={classes.title}>
						CRUD User App
					</Typography>
					<CardContent>
						<Typography type="body1" component="p">
							This CRUD app allows for Sign In / Sign Up (from the navigation bar). <br/>  <br/>
							After Signing in, users can see a user list. <br/>  <br/>
							They can delete by tapping on the bin icon. Deleting themselves will log a user out. <br/>  <br/>
							They can update users by tapping the edit icon. <br/>  <br/>
						</Typography>
					</CardContent>
				</Card>
			</div>
		);
	}
}

export default withStyles(styles)(Home);
