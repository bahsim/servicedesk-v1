import React from 'react';
import createReactClass from 'create-react-class';

import NavBar from './NavBar'
import FuncPanelCurrent from './FuncPanelCurrent'
import FuncPanelHistory from './FuncPanelHistory'
import Registry from './Registry'
import Record from './Record'

import { 
	getRegistry,
	getRegistryHistory,
} from '../api/registry'
import { 
	getRecord,
	createRecord,
	refreshRecord,
	markRecord,
} from '../api/record'

import { initializeState } from '../state/registry'

import dataStatusesEn from '../data/statuses-en'
import dataStatusesRu from '../data/statuses-ru'

const dataStatuses = {
	en: dataStatusesEn,
	ru: dataStatusesRu,
}

export default createReactClass({
	
	getInitialState() {
		return initializeState()
	},
	
	componentDidMount() {
		//
		const { lang, i18n } = this.state;
		const data = dataStatuses[lang];
		const statusAll  		= {id: 'ALL', 		name: i18n[lang].STATUS_ALL};
		const statusNew  		= {id: 'NEW', 		name: i18n[lang].STATUS_NEW};
		const statusDone 		= {id: 'DONE', 		name: i18n[lang].STATUS_DONE};
		const statusDeleted = {id: 'DELETED', name: i18n[lang].STATUS_DELETED};
		//
		let statuses = [statusAll, statusNew];
		let statusesRecord = [statusNew];
		data.forEach((item) =>{
			if (item.name.trim() !== '') {
				statuses.push(item);
				statusesRecord.push(item);
			}
		});
		this.setState({
			statusAll,
			statusNew,
			statusDone,
			statusDeleted,
			statuses,
			statusesRecord,
		});
		//
		getRegistry((value) => {
			this.setState({ 
				isLoading:false, 
				registry: value,
			});
			const filterValue = (
				this.state.filterCurrentStatus
			);
			this.setRegistryFilter(filterValue);
		}, (error) => {
			this.setState({ 
				hasErrored: true, 
				errorMessage: error.message 
			})
		})
		loaderInit.outerHTML = '';
		app.hidden = false;
	},
	
	componentDidUpdate() {
		document.body.style.backgroundColor = (
			this.state.hasErrored == false && this.state.isLoading == false ? 
				('#eeeeee') : ('#0093e7')
		);
		switch(this.state.tabIndex) {
			case 0: {
				const registryTop = this.registryCurrent.getBoundingClientRect().top
				if (this.state.registryTop !== registryTop) {
					this.setState({
						registryTop: this.registryCurrent.getBoundingClientRect().top
					})
				}
				break;
			}
			case 1: {
				const registryTop = this.registryHistory.getBoundingClientRect().top
				if (this.state.registryTop !== registryTop) {
					this.setState({
						registryTop: this.registryHistory.getBoundingClientRect().top
					})
				}
				break;
			}
		}
	},
	
	setRegistryFilter(value) {
		let filtered = [];
		if (value === this.state.statusAll.id) {
			filtered = this.state.registry
		} else {
			filtered = this.state.registry.filter(
				(item) => (item.status === value)
			)
		}
		this.setState({
			filterCurrentStatus: value,
			registryFiltered: filtered,
		});
	},
	
	setRegistryHistoryFilter(date1, date2) {
		this.setState({ 
			filterHistoryPeriod: [date1, date2],
			isLoading: true,
		})
		
		getRegistryHistory(date1, date2, 
			(value) => {
				this.setState({ 
					isLoading:			 false, 
					registryHistory: value,
				});
				const filterValue = (
					this.state.filterCurrentStatus
				);
				this.setRegistryFilter(filterValue);
			}, (error) => {
				this.setState({ 
					hasErrored: true, 
					errorMessage: error.message 
				})
			})
	},
	
	onClickAdd() {
		this.setState({ appMode: 'newRec' });
	},
	
	onClickTab(e,tabIndex) {
		this.setState({ tabIndex })
	},
	
	onClickRecord(id, deleted, history) {
		this.setState({ isLoading: true})
		
		const appMode = (
			(deleted || history) ? 'viewRec' : 'editRec'
		);
		
		getRecord(id, (value) => {
			this.setState({
				record: 	 value,
				appMode: 	 appMode, 
				isLoading: false, 
			})
		}, (error) => {
			this.setState({ 
				hasErrored: 	true, 
				errorMessage: error.message 
			})
		})
	},
	
	saveNewRecord(record) {
		this.setState({ isLoading: true})
		
		createRecord(record, (value) => {
			this.setState({
				registry: 	value.registry,
				appMode: 		'registry', 
				isLoading: 	false, 
			});
			
			const filterValue = (
				this.state.filterCurrentStatus
			);
			this.setRegistryFilter(filterValue);
			
			this.onClickRecord(value.insertedId, false, false)
		}, (error) => {
			this.setState({ 
				hasErrored: 	true, 
				errorMessage: error.message 
			})
		})
	},
	
	saveEditRecord(id, record) {
		this.setState({ isLoading: true})
		
		refreshRecord(id, record, (value) => {
			this.setState({
				registry: 	value,
				appMode: 		'registry', 
				isLoading:	false, 
			});
			const filterValue = (
				this.state.filterCurrentStatus
			);
			this.setRegistryFilter(filterValue);
		}, (error) => {
			this.setState({ 
				hasErrored: 	true, 
				errorMessage: error.message 
			})
		})
	},
	
	markRecord(mark) {
		this.setState({ isLoading: true})
		let status = { id: '', name: '' }
		let deleted = false;
		let history = false;
		
		switch (mark) {
			case 'done': {
				status = this.state.statusDone;
				deleted = false;
				history = true;
				break;
			}
			case 'delete': {
				status = this.state.statusDeleted;
				deleted = true;
				history = false;
				break;
			}
			case 'restore': {
				const statuses = this.state.statusesRecord;
				if (statuses.length > 0) {
					status = statuses[statuses.length - 1];
				}
				deleted = false;
				history = false;
				break;
			}
		}
		
		const record = {...this.state.record, ...{
			deleted,
			history,
			status: 		status.id,
			statusView: status.name,
		}};
		
		markRecord(record._id, record,
			(value) => {
				this.setState({
					registry: 	value,
					appMode: 		'registry', 
				});
				const filterValue = (
					this.state.filterCurrentStatus
				);
				this.setRegistryFilter(filterValue);
				if (mark === 'restore') {
					const date1 = this.state.filterHistoryPeriod[0];
					const date2 = this.state.filterHistoryPeriod[1];
					setTimeout(() => {
						this.setRegistryHistoryFilter(date1, date2)
					}, 100)
					return;
				}
				this.setState({ isLoading:	false });
			}, (error) => {
				this.setState({ 
					hasErrored: 	true, 
					errorMessage: error.message 
				})
			}
		)
	},
	
	printRecord() {
		const { lang } = this.state;
		const { _id  } = this.state.record;
		window.open(
			document.URL + 'record/' + _id + '/check?lang=' + lang, 
			'_blank'
		);
	},
	
	closeRecord() {
		this.setState({ appMode: 'registry'})
	},
	
	displayMe(value) {
		return (
			this.state.appMode === value ? {display:''} : {display:'none'}
		)
	},
	
	hideMe(value) {
		return (
			this.state.appMode === value ? {display:'none'} : {display:''}
		)
	},
	
	displayTab(value) {
		return (
			this.state.tabIndex === value ? {display:''} : {display:'none'}
		)
	},
	
	render() {
		const styleLoaderError = (
			this.state.hasErrored ? (
				{display:''}
			) : (
				{display:'none'}
			)
		);
		const styleLoaderWait = (
			this.state.hasErrored == false && this.state.isLoading == true ? (
				{display:''}
			) : (
				{display:'none'}
			)
		);
		const styleWorkMode = (
			this.state.hasErrored == false && this.state.isLoading == false ? (
				{display:''}
			) : (
				{display:'none'}
			)
		);
		return (
			<div className="container" tabIndex="-1" style={{outline: 0}}>
				
				<div className="loader" style={styleLoaderError}>
					<img src="/logo.png" width="200vw" height="100vw" alt="" />
					<h2>{this.state.errorMessage}</h2>
				</div>
				
				<div className="loader" style={styleLoaderWait}>
					<img src="/logo.png" width="200vw" height="100vw" alt="" />
				</div>
				
				<div style={styleWorkMode}>
					
					<NavBar 
						i18n={this.state.i18n[this.state.lang]}
						tabIndex={this.state.tabIndex}
						onClickTab={this.onClickTab}
						hideMe={this.hideMe} 
						displayMe={this.displayMe} 
						displayTab={this.displayTab} 
						onClickAdd={this.onClickAdd} 
						onClickDone={this.markRecord} 
						onClickDelete={this.markRecord} 
						onClickRestore={this.markRecord} 
					/>
					
					<br/>
					
					<div style={this.displayMe('registry')}>
						<div style={this.displayTab(0)}>
							<FuncPanelCurrent 
								i18n={this.state.i18n[this.state.lang]}
								setFilter={this.setRegistryFilter}
								status={this.state.filterCurrentStatus}
								statuses={this.state.statuses}
							/>
							<div ref={(el) => this.registryCurrent = el }>
								<Registry 
									top={this.state.registryTop}
									i18n={this.state.i18n[this.state.lang]}
									registry={this.state.registryFiltered} 
									onClickRecord={this.onClickRecord} 
								/>
							</div>
						</div>
						<div style={this.displayTab(1)}>
							<FuncPanelHistory 
								i18n={this.state.i18n[this.state.lang]}
								period={this.state.filterHistoryPeriod}
								setFilter={this.setRegistryHistoryFilter}
							/>
							<div ref={(el) => this.registryHistory = el }>
								<Registry 
									top={this.state.registryTop}
									i18n={this.state.i18n[this.state.lang]}
									registry={this.state.registryHistory} 
									onClickRecord={this.onClickRecord} 
								/>
							</div>
						</div>
					</div>
					
					{this.state.appMode === 'newRec' &&
						<Record
							i18n={this.state.i18n[this.state.lang]}
							status={this.state.statusNew}
							statuses={this.state.statusesRecord}
							save={this.saveNewRecord} 
							close={this.closeRecord} 
						/>
					}
					
					{this.state.appMode === 'editRec' &&
						<Record
							i18n={this.state.i18n[this.state.lang]}
							statuses={this.state.statusesRecord}
							record={this.state.record}
							print={this.printRecord} 
							change={this.saveEditRecord} 
							close={this.closeRecord} 
						/>
					}
					
					{this.state.appMode === 'viewRec' &&
						<Record
							i18n={this.state.i18n[this.state.lang]}
							statuses={this.state.statusesRecord}
							record={this.state.record}
							close={this.closeRecord} 
						/>
					}
					
				</div>
				
			</div>
		)
		
	}
});
