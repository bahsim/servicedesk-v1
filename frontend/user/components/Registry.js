import React from 'react';
import createReactClass from 'create-react-class';

import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Table from './Table';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0093e7',
    },
    secondary: {
      main: '#e39b3d',
    },
  },
});

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Registry = createReactClass({
  render() {
		const { classes } = this.props;
		return (
			<MuiThemeProvider theme={theme}>
				<div className={classes.root}>
					<Paper className={classes.root} elevation={8}>
						<Table 
							top={this.props.top}
							i18n={this.props.i18n}
							registry={this.props.registry} 
							onClickRecord={this.props.onClickRecord} 
						/>
					</Paper>
				</div>
			</MuiThemeProvider>
		);
	}
})

export default withStyles(styles)(Registry);
