import React, { useCallback } from 'react';
import {
    DataGrid,
    GridRowModel,
    GridColDef,
    GridRowId,
    GridRowsProp,
} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert, { AlertProps } from '@mui/material/Alert';

interface DataItem {
    [key: string]: any;
}

// Define a type alias for ColumnConfig
export type ColumnConfig = GridColDef<DataItem>;

interface PaginatedTableProps {
    data: DataItem[];
    columns: ColumnConfig[];
    loading: boolean;
    editMode: any;
    getRowId: any;
    onPageChange: (pageData: any) => void;
    rowCount: number;
}
const useFakeMutation = () => {
    return React.useCallback(
        (newRow: GridRowModel) =>
            new Promise<GridRowModel>((resolve, reject) => {
                setTimeout(() => {
                    const invalidColumn = Object.keys(newRow).find(
                        (key) => key !== 'id' && key !== '__typename' && newRow[key] === ''
                    );
                    if (invalidColumn) {
                        reject(invalidColumn);
                    } else {
                        resolve(newRow);
                    }
                }, 200);
            }),
        []
    );
};

function computeMutation(newRow: GridRowModel, oldRow: GridRowModel) {
    const changedColumns = Object.keys(newRow).filter(
        (key) => newRow[key] !== oldRow[key] && key !== 'id' && key !== '__typename'
    );
    if (changedColumns.length === 0) {
        return null;
    }
    return `Changed ${changedColumns.join(', ')} from '${changedColumns.map((col) => oldRow[col]).join(', ')}' to '${changedColumns.map((col) => newRow[col]).join(', ')}'`;
}

const PaginatedTable: React.FC<PaginatedTableProps> = ({
    data,
    columns,
    loading = true,
    getRowId,
    editMode = 'cell',
    onPageChange,
    rowCount
}) => {
    const mutateRow = useFakeMutation();
    const noButtonRef = React.useRef<HTMLButtonElement>(null);
    const [promiseArguments, setPromiseArguments] = React.useState<any>(null);
    const [paginationModel, setPaginationModel] = React.useState({
        page: 1,
        pageSize: 10,
    });


    const [snackbar, setSnackbar] = React.useState<Pick<
        AlertProps,
        'children' | 'severity'
    > | null>(null);

    const handleCloseSnackbar = () => setSnackbar(null);

    const handlePaginationModelChange = useCallback((newModel: any) => {
        setPaginationModel(newModel);   
        onPageChange(newModel);
      }, []);

    const processRowUpdate = React.useCallback(
        (newRow: GridRowModel, oldRow: GridRowModel) =>
            new Promise<GridRowModel>((resolve, reject) => {
                const mutation = computeMutation(newRow, oldRow);
                if (mutation) {
                    setPromiseArguments({ resolve, reject, newRow, oldRow });
                } else {
                    resolve(oldRow);
                }
            }),
        [],
    );

    const handleNo = () => {
        const { oldRow, resolve } = promiseArguments;
        resolve(oldRow); // Resolve with the old row to not update the internal state
        setPromiseArguments(null);
    };
    const handleYes = async () => {
        const { newRow, reject, resolve } = promiseArguments;

        try {
            // Make the HTTP request to save in the backend
            const response = await mutateRow(newRow);
            setSnackbar({ children: 'User successfully saved', severity: 'success' });
            resolve(response);
            setPromiseArguments(null);
        } catch (error) {
            const changedColumn = error;
            setSnackbar({ children: `${changedColumn} cannot be empty`, severity: 'error' });
            reject(newRow);
            setPromiseArguments(null);
        }
    };

    const handleEntered = () => {

    };


    const renderConfirmDialog = () => {
        if (!promiseArguments) {
            return null;
        }

        const { newRow, oldRow } = promiseArguments;
        const mutation = computeMutation(newRow, oldRow);

        return (
            <Dialog
                maxWidth="xs"
                TransitionProps={{ onEntered: handleEntered }}
                open={!!promiseArguments}
            >
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent dividers>
                    {`Pressing 'Yes' will change ${mutation}.`}
                </DialogContent>
                <DialogActions>
                    <Button ref={noButtonRef} onClick={handleNo}>
                        No
                    </Button>
                    <Button onClick={handleYes}>Yes</Button>
                </DialogActions>
            </Dialog>
        );
    };
    return (
        <div>
            <div style={{ height: '400px', width: '100%' }}>
                {renderConfirmDialog()}
                <DataGrid
                    editMode={editMode}
                    rows={data}
                    columns={columns}
                    loading={loading}
                    autoHeight={true}
                    getRowId={getRowId}
                    onPaginationModelChange={handlePaginationModelChange}
                    paginationMode="server"
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10, 25, 50, 100]}
                    processRowUpdate={processRowUpdate}
                    rowCount={rowCount}
                />
                {!!snackbar && (
                    <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
                        <Alert {...snackbar} onClose={handleCloseSnackbar} />
                    </Snackbar>
                )}
            </div>
        </div>
    );
};

export default PaginatedTable;
