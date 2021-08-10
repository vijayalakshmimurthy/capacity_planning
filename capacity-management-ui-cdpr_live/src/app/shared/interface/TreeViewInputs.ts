/** Srims Navigator Value */
export interface TreeViewInputs {
    nodes?: Node;
    fields?: Field;
}
/** Srims Navigator TreeViewInputs-Node */
export interface Node {
    selectionMode?: string;
    labelDelimiter?: string;
}
/** Srims Navigator TreeViewInputs-Field */
export interface Field {
    filter?: boolean;
    selectAll?: boolean;
    placeHolder?: string;
}
