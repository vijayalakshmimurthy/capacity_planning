/** This is the constraint object which defines here using in Tier One module */
/** staticColumn is for all type of table */
export let staticColumn = [
    { field: 'siteName', header: 'Site Name', visible: true, fixed: true,  columnWidth: '60px',
    properties: { sort: false, editable: false } },
    { field: 'code1141', header: '1141 Code', visible: true, fixed: true, columnWidth: '20px',
    properties: { sort: false, editable: false } }
];
/** staticColumn is for all type of withour sort */
export let staticColumnSort = [
    { field: 'siteName', header: 'Site Name', visible: true, fixed: true, columnWidth: '60px',
    properties: { sort: true, editable: false} },
    { field: 'code1141', header: '1141 Code', visible: true, fixed: true, columnWidth: '20px',
    properties: { sort: true, editable: false} }
];
/** editColumn is for edit mode type of table */
export let editColumn = [
    {
        field: 'broadband1g', header: '1G Broadband', visible: true, columnWidth: '117px',
        properties: { sort: false, editable: true},
        type: 'number', values: ''
    },
    {
        field: 'broadband10g', header: '10G Broadband', visible: true, columnWidth: '124px',
        properties: { sort: false, editable: true },
        type: 'number', values: ''
    },
    {
        field: 'ethernetFaste', header: 'FastE Ethernet', visible: true, columnWidth: '117px',
        properties: { sort: false, editable: true },
        type: 'number', values: ''
    },
    {
        field: 'ethernet1gHe', header: '1G HE Ethernet', visible: true, columnWidth: '122px',
        properties: { sort: false, editable: true },
        type: 'number', values: ''
    },
    {
        field: 'ethernet10gHe', header: '10G HE Ethernet', visible: true, columnWidth: '130px',
        properties: { sort: false, editable: true},
        type: 'number', values: ''
    },
    {
        field: 'ethernet10gWmcApolloTef', header: '10G WMC Apollo TEF', visible: true, columnWidth: '153px',
        properties: { sort: false, editable: true},
        type: 'number', values: ''
    },
    {
        field: 'ethernet100gAccess', header: '100G Access Ethernet', visible: true, columnWidth: '159px',
        properties: { sort: false, editable: true},
        type: 'number', values: ''
    },
    {
        field: 'backhaul10g', header: '10G Backhaul', visible: true, columnWidth: '113px',
        properties: { sort: false, editable: true},
        type: 'number', values: ''
    },
    {
        field: 'backhaul100g', header: '100G Backhaul', visible: true, columnWidth: '121px',
        properties: { sort: false, editable: true},
        type: 'number', values: ''
    },
    { field: 'actions', header: 'Action', visible: true, columnWidth: '100px',
    properties: { sort: false, editable: false, action: true} }];

    /** editColumn is for edit mode type of table for editColumnCorRT */
export let editColumnCorRT = [
    {
        field: 'forecastlr410g', header: '10GE', visible: true, columnWidth: '110px',
        properties: { sort: false, editable: true},
        type: 'number', values: ''
    },
    {
        field: 'forecastsr10100g', header: '100GE SR 10', visible: true, columnWidth: '122px',
        properties: { sort: false, editable: true },
        type: 'number', values: ''
    },
    {
        field: 'forecastlr4100g', header: '100GE LR 4', visible: true, columnWidth: '117px',
        properties: { sort: false, editable: true },
        type: 'number', values: ''
    },
    {
        field: 'forecastsr4100g', header: '100GE SR4', visible: true, columnWidth: '124px',
        properties: { sort: false, editable: true },
        type: 'number', values: ''
    },
    {
        field: 'forecastddsr100g', header: '100GE DD SR 4', visible: true, columnWidth: '130px',
        properties: { sort: false, editable: true},
        type: 'number', values: ''
    },
    {
        field: 'forecastddlr100g', header: '100GE DD LR 4', visible: true, columnWidth: '153px',
        properties: { sort: false, editable: true},
        type: 'number', values: ''
    },
    // {
    //     field: 'forecastlr10100g', header: '100GE LR 10', visible: true, columnWidth: '120px',
    //     properties: { sort: false, editable: true},
    //     type: 'number', values: ''
    // },
    {
        field: 'forecastother100g', header: '100GEOther', visible: true, columnWidth: '120px',
        properties: { sort: false, editable: true},
        type: 'number', values: ''
    },
   
    { field: 'actions', header: 'Action', visible: true, columnWidth: '100px',
    properties: { sort: false, editable: false, action: true} }];

/** messageColumn is for only show message type of table */
export let messageColumnCoreRT = [
    {
        field: 'forecastlr410g', header: '10GE', visible: true, columnWidth: '110px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'forecastsr10100g', header: '100GE SR 10', visible: true, columnWidth: '122px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'forecastlr4100g', header: '100GE LR 4', visible: true, columnWidth: '117px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'forecastsr4100g', header: '100GE SR4', visible: true, columnWidth: '124px',
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'forecastddsr100g', header: '100GE DD SR 4', visible: true, columnWidth: '130px',
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'forecastddlr100g', header: '100GE DD LR 4', visible: true, columnWidth: '153px',
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
    // {
    //     field: 'forecastlr10100g', header: '100GE LR 10', visible: true, columnWidth: '120px',
    //     properties: { sort: false, editable: true},
    //     type: 'number', values: ''
    // },
    {
        field: 'forecastother100g', header: '100GEOther', visible: true, columnWidth: '175px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
   
    {
        field: 'message', header: 'Message', visible: true, columnWidth: '180px',
        properties: { sort: true, editable: false}
    },
];
/** messageColumn is for only show message type of table */
export let messageColumn = [
    {
        field: 'broadband1g', header: '1G Broadband', visible: true, columnWidth: '117px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'broadband10g', header: '10G Broadband', visible: true, columnWidth: '124px',
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'ethernetFaste', header: 'FastE Ethernet', visible: true, columnWidth: '117px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'ethernet1gHe', header: '1G HE Ethernet', visible: true, columnWidth: '122px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'ethernet10gHe', header: '10G HE Ethernet', visible: true, columnWidth: '130px',
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'ethernet10gWmcApolloTef', header: '10G WMC Apollo TEF', visible: true, columnWidth: '153px',
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'ethernet100gAccess', header: '100G Access Ethernet', visible: true, columnWidth: '159px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'backhaul10g', header: '10G Backhaul', visible: true, columnWidth: '113px',
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'backhaul100g', header: '100G Backhaul', visible: true,  columnWidth: '121px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'message', header: 'Message', visible: true, columnWidth: '180px',
        properties: { sort: true, editable: false}
    },
];

/** emptyColumn is for only default type of table */
export let emptyColumn = [
    {
        field: 'broadband1g', header: '1G Broadband', visible: true, columnWidth: '117px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'broadband10g', header: '10G Broadband', visible: true, columnWidth: '124px',
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'ethernetFaste', header: 'FastE Ethernet', visible: true, columnWidth: '117px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'ethernet1gHe', header: '1G HE Ethernet', visible: true, columnWidth: '122px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'ethernet10gHe', header: '10G HE Ethernet', visible: true, columnWidth: '130px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'ethernet10gWmcApolloTef', header: '10G WMC Apollo TEF', visible: true, columnWidth: '153px',
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'ethernet100gAccess', header: '100G Access Ethernet', visible: true, columnWidth: '159px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'backhaul10g', header: '10G Backhaul', visible: true, columnWidth: '113px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'backhaul100g', header: '100G Backhaul', visible: true, columnWidth: '121px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    }];
    /** emptyColumn is for only default type of table */

    /** emptyColumn is for only default type of table */
export let emptyColumnCoreRT = [
    {
        field: 'forecastlr410g', header: '10GE', visible: true, columnWidth: '110px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'forecastsr10100g', header: '100GE SR 10', visible: true, columnWidth: '122px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'forecastlr4100g', header: '100GE LR 4', visible: true, columnWidth: '117px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'forecastsr4100g', header: '100GE SR4', visible: true, columnWidth: '124px',
        properties: { sort: true, editable: false },
        type: 'text', values: ''
    },
 
  
    {
        field: 'forecastddsr100g', header: '100GE DD SR 4', visible: true, columnWidth: '130px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'forecastddlr100g', header: '100GE DD LR 4', visible: true, columnWidth: '159px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    },
   
    {
        field: 'forecastother100g', header: '100GEOther', visible: true, columnWidth: '141px',
        properties: { sort: true, editable: false},
        type: 'text', values: ''
    }];
    /** emptyColumn is for only default type of table */

export let staticShow = [
    { field: 'siteName', header: 'Site Name', visible: true, columnWidth: '100px', properties: { sort: false, editable: false } },
    { field: 'code1141', header: '1141 Code', visible: true, columnWidth: '100px', properties: { sort: false, editable: false } },
    {
        field: 'broadband1g', header: '1G Broadband', visible: true, columnWidth: '100px',
        properties: { sort: false, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'broadband10g', header: '10G Broadband', visible: true, columnWidth: '100px',
        properties: { sort: false, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'ethernetFaste', header: 'FastE Ethernet', visible: true, columnWidth: '100px',
        properties: { sort: false, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'ethernet1gHe', header: '1G HE Ethernet', visible: true, columnWidth: '100px',
        properties: { sort: false, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'ethernet10gHe', header: '10G HE Ethernet', visible: true, columnWidth: '100px',
        properties: { sort: false, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'ethernet10gWmcApolloTef', header: '10G WMC Apollo TEF', visible: true, columnWidth: '120px',
        properties: { sort: false, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'ethernet100gAccess', header: '100G Access Ethernet', visible: true, columnWidth: '120px',
        properties: { sort: false, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'backhaul10g', header: '10G Backhaul', visible: true, columnWidth: '100px',
        properties: { sort: false, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'backhaul100g', header: '100G Backhaul', visible: true, columnWidth: '100px',
        properties: { sort: false, editable: false},
        type: 'text', values: ''
    },
    { field: 'actions', header: 'Action', visible: true, columnWidth: '100px',
    properties: { sort: false, editable: false, action: true } }];
    
export let staticShowCoreRT = [
    { field: 'siteName', header: 'Site Name', visible: true, columnWidth: '100px', properties: { sort: false, editable: false } },
    { field: 'code1141', header: '1141 Code', visible: true, columnWidth: '100px', properties: { sort: false, editable: false } },
    {
        field: 'forecastlr410g', header: '10GE', visible: true, columnWidth: '110px',
        properties: { sort: false, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'forecastsr10100g', header: '100GE SR 10', visible: true, columnWidth: '100px',
        properties: { sort: false, editable: false },
        type: 'text', values: ''
    },
    {
        field: 'forecastlr4100g', header: '100GE LR 4', visible: true, columnWidth: '100px',
        properties: { sort: false, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'forecastsr4100g', header: '100GR SR4', visible: true, columnWidth: '100px',
        properties: { sort: false, editable: false },
        type: 'text', values: ''
    },
 
  
    {
        field: 'forecastddsr100g', header: '100GE DD SR 4', visible: true, columnWidth: '100px',
        properties: { sort: false, editable: false},
        type: 'text', values: ''
    },
    {
        field: 'forecastddlr100g', header: '100GE DD LR 4', visible: true, columnWidth: '120px',
        properties: { sort: false, editable: false },
        type: 'text', values: ''
    },
    // {
    //     field: 'forecastlr10100g', header: '100GE LR 10', visible: true, columnWidth: '120px',
    //     properties: { sort: false, editable: true},
    //     type: 'number', values: ''
    // },
    {
        field: 'forecastother100g', header: '100GEOther', visible: true, columnWidth: '120px',
        properties: { sort: false, editable: false},
        type: 'text', values: ''
    },
   
    { field: 'actions', header: 'Action', visible: true, columnWidth: '100px',
    properties: { sort: false, editable: false, action: true } }];
