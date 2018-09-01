
import { i18n } from '../i18n';

export function initializeState() {
	return {
		lang: 'en',
		i18n: i18n,
		isLoading: true,
		hasErrored: false,
		errorMessage: '',
		appMode: 'registry',
		tabIndex: 0,
		registry: [],
		registryFiltered: [],
		registryHistory: [],
		registryTop: 0,
		record: {
			created: '',
			status: '',
			statusView: '',
			clientInfo: '',
			deviceInfo: '',
			componentParts: '',
			footNote: '',
		},
		filterCurrentStatus: 'ALL',
		filterHistoryPeriod: [
			moment(new Date()).format('YYYY-MM-DD'),
			moment(new Date()).format('YYYY-MM-DD'),
		],
		statusAll: {},
		statusNew: {},
		statusDone: {},
		statusDeleted: {},
		statuses: [],
		statusesRecord: [],
	}
}
