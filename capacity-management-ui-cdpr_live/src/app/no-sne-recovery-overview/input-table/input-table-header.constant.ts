/** editColumn is for edit mode type of table */
export let staticTable = [
    {
        field: 'sne_id', header: 'Device', visible: true, columnWidth: '120px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputTablePageRecoverySne'
    },
    {
            field: 'holder', header: 'Holder', visible: true, columnWidth: '120px', fixed: true,
            properties: { sort: true, editable: true },
            type: 'text', values: '', pageName: 'inputTablePageRecoverySne'
    },
    {
        field: 'recovery_type', header: 'Recovery Type ', visible: true, columnWidth: '120px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'select', values: '', pageName: 'inputTablePageRecoverySne', options: [
            {
                id: 60,
                label: 'Device',
                value: 'Device'
            },
            {
                id: 61,
                label: 'Chassis',
                value: 'Chassis'
            }, {
                id: 62,
                label: 'Card',
                value: 'Card'
            }
        ]
    },
    {
        field: 'fist_Project_No', header: 'Fist Project No', visible: true, columnWidth: '130px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputTablePageRecoverySne'
    },
    {
        field: 'scheme_Driver', header: 'Scheme Driver', visible: true, columnWidth: '130px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputTablePageRecoverySne'
    },
    {
        field: 'capacity_required_date', header: 'Capacity Required Date', visible: true, columnWidth: '180px', fixed: true,
        properties: { sort: true, editable: true },
        type: null, values: '', pageName: 'inputTablePageRecoverySne'
    },
     {
        field: 'physical_connector_removal', header: 'Physical Connecter Removal ', visible: true, columnWidth: '100px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'select', values: 'N', pageName: 'inputTablePageRecoverySne', options: [{
            label: 'Y',
            value: 'Y'
        },
        {
            label: 'N',
            value: 'N'
        }]
    },
    {
        field: 'rack_recovery', header: 'Rack Recovery', visible: true, columnWidth: '100px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'select', values: 'N', pageName: 'inputTablePageRecoverySne', options: [{
            label: 'Y',
            value: 'Y'
        },
        {
            label: 'N',
            value: 'N'
        }]
    },
    {
        field: 'network_change', header: 'Network Change', visible: true, columnWidth: '100px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'select', values: 'N', pageName: 'inputTablePageRecoverySne', options: [{
            label: 'Y',
            value: 'Y'
        },
        {
            label: 'N',
            value: 'N'
        }]
    },
    {
        field: 'auto_progression', header: 'Auto Progression', visible: true, columnWidth: '100px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'select', values: 'N', pageName: 'inputTablePageRecoverySne', options: [{
            label: 'Y',
            value: 'Y'
        },
        {
            label: 'N',
            value: 'N'
        }]
    },
    {
        field: 'recover_sne_id', header: 'Recovery', visible: true, columnWidth: '110px', link: true, colour: '#6400aa',
        properties: { sort: true, editable: true, action: true },  type: '', values: '', pageName: 'inputCardmoveTablePage'
    },
    {
        field: 'actions', header: 'Action', visible: true, columnWidth: '130px',
        properties: { sort: false, editable: true, action: true }, pageName: 'inputTablePageRecoverySne'
    }];
