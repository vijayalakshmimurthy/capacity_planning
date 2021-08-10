/** editColumn is for edit mode type of table */
export let staticTable = [

    {
        field: 'projectId', header: 'Project ID', visible: true, columnWidth: '100px', fixed: true,
        properties: { sort: true, editable: false, filtertype:'text',fieldtype:'text' },
        type: 'text', values: '', pageName: 'inputTablePage'
    }, {
        field: 'jobName', header: 'Job Name', visible: true, columnWidth: null, fixed: true,
        properties: { sort: true, editable: false , filterType: 'text', fieldType: 'text' },
        type: 'text', values: '', pageName: 'inputTablePage'
    },
    {
        field: 'owner', header: 'Owner', visible: true, columnWidth: '280px', fixed: true,
        properties: { sort: true, editable: false,filtertype:'text',fieldtype:'text' },
        type: 'text', values: '', pageName: 'inputTablePage'
    },
    {
        field: 'filetype', header: 'File Type', visible: true, columnWidth: '200px', fixed: true,
        properties: { sort: true, editable: false,filtertype:'text',fieldtype:'text' },
        type: 'text', values: '', pageName: 'inputTablePage'
    },
    {
        field: 'uploaddate', header: 'Upload Date', visible: true, columnWidth: null, fixed: true,
        properties: { sort: true, editable: true ,filtertype:'text',fieldtype:'text'},
        type: 'calander', values: ''
    },
    {
        field: 'status', header: 'Status', visible: true, columnWidth: null, fixed: true,
        properties: { sort: true, editable: true,filtertype:'text',fieldtype:'text' },
        type: 'select', values: '', pageName: 'inputTablePage'
    },
    {
        field: 'actions', header: 'Action', visible: true, columnWidth: null,
        properties: { sort: false, editable: true, action: true }, pageName: 'inputTablePage'
    }];
