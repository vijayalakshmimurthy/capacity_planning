/** editColumn is for edit mode type of table */
export let editColumn = [
    {
        field: 'sauId', header: 'SAU', visible: true, columnWidth: '100px', fixed: true,
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    }, {
        field: 'code1141', header: 'Code1141', visible: true, columnWidth: null, fixed: true,
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'siteName', header: 'Exchange', visible: true, columnWidth: '280px', fixed: true,
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'sneId', header: 'MSE SNEID', visible: true, columnWidth: null, fixed: true,
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'phaseForecastDate', header: 'Phase Forecast Date', visible: true, columnWidth: null, fixed: true,
        properties: { sort: true, editable: true },
        type: 'null', values: ''
    },
    {
        field: 'phasePlannedDate', header: 'Phase Planned Date', visible: true, columnWidth: null, fixed: true,
        properties: { sort: true, editable: false },
        type: 'null', values: ''
    },
    {
        field: 'phaseStatus', header: 'Phase Status', visible: true, columnWidth: null, fixed: true,
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'actions', header: 'Action', visible: true, columnWidth: null,

        properties: { sort: false, editable: false, action: true }
    }];

export let staticTable = [
    {
        field: 'sauId', header: 'SAU', visible: true, columnWidth: '100px', fixed: true,
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    }, {
        field: 'code1141', header: 'Code1141', visible: true, columnWidth: null, fixed: true,
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'siteName', header: 'Exchange', visible: true, columnWidth: '280px', fixed: true,
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'sneId', header: 'MSE SNEID', visible: true, columnWidth: null, fixed: true,
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'phaseForecastDate', header: 'Phase Forecast Date', visible: true, columnWidth: null, fixed: true,
        properties: { sort: true, editable: true },
        type: 'null', values: ''
    },
    {
        field: 'phasePlannedDate', header: 'Phase Planned Date', visible: true, columnWidth: null, fixed: true,
        properties: { sort: true, editable: false },
        type: 'null', values: ''
    },
    {
        field: 'phaseStatus', header: 'Phase Status', visible: true, columnWidth: null, fixed: true,
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'actions', header: 'Action', visible: true, columnWidth: null,
        properties: { sort: false, editable: false, action: true }
    }];
