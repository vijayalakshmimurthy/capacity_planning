/** editColumn is for edit mode type of table */
export let staticTable = [
    {
        field: 'source_Device', header: 'Device', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', pageName: 'inputCardmoveTablePage'
    }, {
        field: 'source_Port', header: 'Port', visible: true, columnWidth: '104px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'source_Cardtype', header: 'Card Type', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'readonly', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'source_Cardmodel', header: 'Card Model', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'readonly', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'source_SpecVersion', header: 'Card Version', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'readonly', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'target_Device', header: 'Device', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'target_Port', header: 'Port', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'target_Cardtype', header: 'Card Type', visible: true, columnWidth: '110px',
        properties: { sort: true, editable: true, action: true },
        type: 'readonly', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'target_Cardmodel', header: 'Card Model', visible: true, columnWidth: '110px',
        properties: { sort: true, editable: true, action: true },  type: 'readonly', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'target_Spec_Version', header: 'Card Version', visible: true, columnWidth: '120px',
        properties: { sort: true, editable: true, action: true },  type: 'readonly', values: '', pageName: 'inputCardmoveTablePage'
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
        field: 'capacity_Required_Date', header: 'Capacity Required Date', visible: true, columnWidth: '155px',
        properties: { sort: true, editable: true, action: true },   type: null, values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'portmoveid', header: 'Port Move', visible: true, columnWidth: '110px', link: true, colour: '#6400aa',
        properties: { sort: true, editable: true, action: true },  type: 'link', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'action', header: 'Action', visible: true, columnWidth: '110px',
        properties: { sort: true, editable: true, action: true },   type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    }
];
