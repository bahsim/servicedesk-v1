import React from 'react';
import createReactClass from 'create-react-class';

import { withStyles } from '@material-ui/core/styles';
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
  tableCell: {
    fontSize: '14px'
  },
});

const TableView = createReactClass({
  getRowStyle(flag) {
		return (
			flag ? {textDecoration: 'line-through'} : {}
		)
	},
	render() {
		const { classes } = this.props;
		const registryHeight = ( (window.innerHeight - this.props.top) - 25 ) + 'px';
		const styleMainDiv = {height: registryHeight, overflow: 'auto'}
		return (
			<Paper 
				style={styleMainDiv}
				ref={(el) => this.registry = el} 
				className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell className={classes.tableCell}>
								{this.props.i18n.DATE_TIME}
							</TableCell>
							<TableCell className={classes.tableCell}>
								{this.props.i18n.STATUS}
							</TableCell>
							<TableCell className={classes.tableCell}>
								{this.props.i18n.CLIENT_INFO}
							</TableCell>
							<TableCell className={classes.tableCell}>
								{this.props.i18n.DEVICE_INFO}
							</TableCell>
							<TableCell className={classes.tableCell}>
								{this.props.i18n.COMPONENT_PARTS}
							</TableCell>
							<TableCell className={classes.tableCell}>
								{this.props.i18n.FOOT_NOTE}
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.props.registry.map(n => {
							return (
								<TableRow 
									style={this.getRowStyle(n.deleted)}
									key={n._id} 
									hover 
									onClick={() => this.props.onClickRecord(n._id, n.deleted, n.history)}
								>
									<TableCell component="th" scope="row" className={classes.tableCell}>
										{moment(n.created).format('DD.MM.YYYY HH:mm')}
									</TableCell>
									<TableCell className={classes.tableCell}>
										{n.statusView}
									</TableCell>
									<TableCell className={classes.tableCell}>
										{n.clientInfo}
									</TableCell>
									<TableCell className={classes.tableCell}>
										{n.deviceInfo}
									</TableCell>
									<TableCell className={classes.tableCell}>
										{n.componentParts}
									</TableCell>
									<TableCell className={classes.tableCell}>
										{n.footNote}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Paper>
		)
	}
});

export default withStyles(styles)(TableView);