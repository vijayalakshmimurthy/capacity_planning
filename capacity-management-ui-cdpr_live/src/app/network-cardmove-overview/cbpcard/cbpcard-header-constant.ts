/** editColumn is for edit mode type of table */
export let staticTable = [
   {
        field: 'exCode', header: '1141 Code', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: false, filter : false, filterType: 'text', fieldType: 'text'},
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'projectid', header: 'Project Id', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: false, filter : false, filterType: 'text', fieldType: 'text' },
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'cpnumber', header: 'CP Number', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: false, filter : false, filterType: 'text', fieldType: 'text' },
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'cpdate', header: 'CP Date', visible: true, columnWidth: '150px', fixed: true,
        properties: { sort: true, editable: false, filter : false, filterType: 'text', fieldType: 'text' },
        type: null, values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'productType', header: 'Product Type', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: false, filter : false, filterType: 'text', fieldType: 'text' },
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'sneId', header: 'SNE ID', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: false, filter : false, filterType: 'text', fieldType: 'text' },
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'slot', header: 'Slot', visible: true, columnWidth: '110px',
        properties: { sort: true, editable: false, action: true, filter : false, filterType: 'text', fieldType: 'text' }, 
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'cardInfillType', header: 'Card Infill Type', visible: true, columnWidth: '110px',
        properties: { sort: true, editable: false, action: true, filter : false, filterType: 'text', fieldType: 'text' },
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'jobtype', header: 'Job Type', visible: true, columnWidth: '110px',
        properties: { sort: true, editable: false, action: true, filter : false, filterType: 'text', fieldType: 'text'},
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'portAvailability', header: 'No. of Ports Availability ', visible: true, columnWidth: '110px',
        properties: { sort: true, editable: false, action: true, filter : false, filterType: 'text', fieldType: 'text' },
        type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'status', header: 'Status ', visible: true, columnWidth: '110px',
        properties: { sort: false, editable: false, action: false },  type: 'text', values: '', pageName: 'inputCardmoveTablePage'
    }
];
