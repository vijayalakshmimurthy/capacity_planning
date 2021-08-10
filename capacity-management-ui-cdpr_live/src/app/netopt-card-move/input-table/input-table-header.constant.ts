/** editColumn is for edit mode type of table */
export let staticTable = [
    {
        field: 'source_sne', header: 'Source Device', visible: true, columnWidth: '200px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputTablePage'
    }, {
        field: 'source_port', header: 'Source Port', visible: true, columnWidth: '180px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputTablePage'
    },
    {
        field: 'destination_sne', header: 'Destination Device', visible: true, columnWidth: '200px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputTablePage'
    },
    {
        field: 'destination_port', header: 'Destination Port', visible: true, columnWidth: '180px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputTablePage'
    },
    {
        field: 'fist_Project_No', header: 'Fist Project No', visible: true, columnWidth: '190px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: ''
    },
    {
        field: 'scheme_Driver', header: 'Scheme Driver', visible: true, columnWidth: '180px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputTablePage'
    },
    {
        field: 'capacity_Required_Date', header: 'Capacity Required Date', visible: true, columnWidth: '300px', fixed: true,
        properties: { sort: true, editable: true },
        type: null, values: '', pageName: 'inputTablePage'
    },
    {
        field: 'actions', header: 'Action', visible: true, columnWidth: '180px',
        properties: { sort: false, editable: true, action: true }, pageName: 'inputTablePage'
    }];
