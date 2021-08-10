/** This is the constraint object which defines here using in Tier One module */
/** staticColumn is for all type of table */
export let staticColumn = [
    {
        field: 'projectType', header: 'Reservation Type', visible: true, fixed: true, columnWidth: '70px',
        properties: { sort: false, editable: false }
    },
    {
        field: 'actions', header: 'Action', visible: true, fixed: true, columnWidth: '30px',
        properties: { sort: false, editable: false }
    }
];
/** staticColumn is for all type of withour sort */
export let staticColumnSort = [
    {
        field: 'all', header: 'ALL', visible: true, fixed: false, columnWidth: '30px',
        properties: { sort: false, editable: false, filterType: 'text', fieldType: 'checkbox' }
    },
    {
        field: 'projectType', type: 'text', header: 'Reservation Type', visible: true, fixed: true, columnWidth: '70px',
        properties: { sort: false, editable: true, fieldType: 'text', filterType: 'text' }
    }
];
