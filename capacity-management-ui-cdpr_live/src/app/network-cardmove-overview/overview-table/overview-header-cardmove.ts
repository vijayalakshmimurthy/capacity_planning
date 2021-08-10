/** editColumn is for edit mode type of table */
export let OverviewHeaderCardMove = [
    {
        field: 'sourceSneId', header: 'Device', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', pageName: 'inputCardmoveTablePage'
    }, {
        field: 'sourcePortId', header: 'Port', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'sourceCardType', header: 'Card Type', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'sourceCardName', header: 'Card Model', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'sourceCardVersion', header: 'Card Version', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'destinationSneId', header: 'Device', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'destinationPortId', header: 'Port', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'destinationCardType', header: 'Card Type', visible: true, columnWidth: '110px',
        properties: { sort: true, editable: true, action: true },
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'destinationCardName', header: 'Card Model', visible: true, columnWidth: '110px',
        properties: { sort: true, editable: true, action: true },  type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'destinationCardVersion', header: 'Card Version', visible: true, columnWidth: '120px',
        properties: { sort: true, editable: true, action: true },  type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'fist_Project_No', header: 'Fist Project No', visible: true, columnWidth: '110px',
        properties: { sort: true, editable: true, action: true },  type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'scheme_Driver', header: 'Scheme Driver', visible: true, columnWidth: '110px',
        properties: { sort: true, editable: true, action: true },  type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'capacity_Required_Date', header: 'Capacity Required Date', visible: true, columnWidth: '180px',
        properties: { sort: true, editable: true, action: true },   type: null, values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'portmoveid', header: 'Port Move', visible: true, columnWidth: '110px', link: true, colour: '#6400aa',
        properties: { sort: true, editable: true, action: true },  type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'action', header: 'Action', visible: true, columnWidth: '110px',
        properties: { sort: true, editable: true, action: true },   type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    }
];
