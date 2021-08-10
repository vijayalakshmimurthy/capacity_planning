/** editColumn is for edit mode type of table */
export let cardRecoveryHeader = [
    {
        field: 'sne_Id', header: 'Device', visible: true, columnWidth: '130px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputTablePageRecoverySne'
    },
    
    {
        field: 'recovery_type', header: 'Recovery Type ', visible: true, columnWidth: '107px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'select', values: '', pageName: 'inputTablePageRecoverySne', options: [{
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
        field: 'holder', header: 'Holder', visible: true, columnWidth: '130px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputTablePageRecoverySne'
    },
    {
        field: 'fist_Project_No', header: 'Fist Project No', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputTablePageRecoverySne'
    },
    {
        field: 'scheme_Driver', header: 'Scheme Driver', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'text', values: '', pageName: 'inputTablePageRecoverySne'
    },
    {
        field: 'capacity_Required_Date', header: 'Capacity Required Date', visible: true, columnWidth: '176px', fixed: false,
        properties: { sort: true, editable: true },
        type: null, values: '', pageName: 'inputTablePageRecoverySne'
    },
     {
        field: 'physical_Connector_Removal', header: 'Physical Connecter Removal ', visible: true, columnWidth: '110px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'select', pageName: 'inputTablePageRecoverySne', options: [{
            id: 94,
            label: 'Y',
            value: 'Y'
        },
        {
            id: 95,
            label: 'N',
            value: 'N'
        }]
    },
    {
        field: 'rack_Recovery', header: 'Rack Recovery', visible: true, columnWidth: '100px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'select',  pageName: 'inputTablePageRecoverySne', options: [{
            id: 92,
            label: 'Y',
            value: 'Y'
        },
        {
            id: 93,
            label: 'N',
            value: 'N'
        }]
    },
    {
        field: 'network_Change', header: 'Network Change', visible: true, columnWidth: '100px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'select', pageName: 'inputTablePageRecoverySne',options: [{
            id: 96,
            label: 'Y',
            value: 'Y'
        },
        {
            id: 97,
            label: 'N',
            value: 'N'
        }]
    },
    {
        field: 'auto_Progression', header: 'Auto Progression', visible: true, columnWidth: '100px', fixed: true,
        properties: { sort: true, editable: true },
        type: 'select', pageName: 'inputTablePageRecoverySne', options: [{
            id: 98,
            label: 'Y',
            value: 'Y',
            parentName: 'auto_Progression' ,
        },
        {
            id: 99,
            label: 'N',
            value: 'N'
        }]
    },
    {
        field: 'actions', header: 'Action', visible: true, columnWidth: '100px',
        properties: { sort: false, editable: true, action: true }, pageName: 'inputTablePageRecoverySne'
    }];
