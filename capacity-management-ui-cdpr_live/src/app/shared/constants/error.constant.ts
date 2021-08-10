export const CP_ERROR = {
    STATUS_CODE: {
        200: {
            code: 'Success Message',
            message: '',
            severity: ''
        },
        401: {
            code: 'Error Message',
            message: '',
            severity: ''
        },
        409: {
            code: 'Error Message',
            message: '',
            severity: ''
        },
        500: {
            code: 'Error Message',
            message: '',
            severity: ''
        },
        400: {
            code: 'Error Message',
            message: '',
            severity: ''
        },
        404: {
            code: 'Error Message',
            message: '',
            severity: ''
        },
        Warning: {
            code: 'Warn Message',
            message: '',
            severity: ''
        },
        Info: {
            code: 'Info',
            message: '',
            severity: ''
        }

    },
    SEVERITY: {
        SUCCESS: 'success',
        ERROR: 'error',
        INFO: 'info',
        WARN: 'warn'
    },
    STATUS_MESSAGES: {
        DELETE_INFO: 'Data deleted successfully',
        FORM_SUBMIT: 'Data submitted successfully',
        FORM_UPDATE: 'Data updated successfully',
        FORM_DELETE: 'Data not deleted',
        NO_RECORD: 'No Record Found',
        THREED_PLAN_SAVED: 'Plan Saved Successfully',
        FILE_UPLOAD: 'Uploaded Succesfully',
        TABLE_RECORD: 'Record saved successfully'
    },
    ERROR_MESSAGES: {
        ERROR: 'Oops! Something Went Wrong',
        NOT_FOUND: 'Not Found',
        THREED_EDIT_ERROR: 'Selected Ports/cards combination are not allowed for Reservation/CUF Update',
        THREED_PLAN_ACTION_ERROR: 'No appropriate card in fill data available',
        CARD_MOVE_ERROR: 'Not a valid selection, Please select a card to move',
        FILE_NOT_SUBMIT: 'File have not Updated',
        THREED_PLAN_SPEED_LIMITATION_ERROR: 'Selected Card can’t be inserted due to Chassis Speed limitation',
        THREED_PLAN_ERROR: 'Selected card infill will require to upgrade the Chassis',
        FAILED_TO_SAVE: 'Failed to save',
        SEARCH_ERROR: 'Data not found for SNE/TRSAREA',
        WFMT_FAILING: 'Please try again later. WFMT submission is failing',
        CHASSIS_RESERVATION: 'Record has been failed to Add',
        CBP_CREATION_FOR_SAS_ERROR: 'Selected ports are not suitable for SAS plan',
        PORT_MOVE_ERROR: 'Not a valid selection, Please select a valid port to move',
        CARD_MOVE_LEVEL_ERROR: 'Higher level to lower level is not supported',
        CARD_MOVE_SOURCE_DESTINATION_SAME_ERROR: 'Source and Destination cannot be same',
        RECOVERY_INVALID_SELECTION: 'Select entity is not supported for Recovery',
        RECOVERY_ERROR: "This card can't be selected for Recovery, as one of the Parent card is already marked for Recovery"
    }
};
