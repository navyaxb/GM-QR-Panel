import React, { useState, useEffect } from 'react';
import CustomTable, { ColumnConfig } from "../../components/CustomTable";
import { Typography, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

interface QRHistoryData {
    item_code: string;
    description: string;
    purchasing_document: string;
    manufacturing_date: string;
    exportStatus: string;
}

const QRHistory = () => {
    const { itemCode } = useParams<{ itemCode?: string }>();
    const navigate = useNavigate();
    const [data, setData] = useState<QRHistoryData[]>([]);

    useEffect(() => {
        const fetchData = () => {
            // Simulated data fetching
            const allData: QRHistoryData[] = [
                { item_code: '123', description: 'Item 123 Description', purchasing_document: 'PO123', manufacturing_date: '2024-09-01', exportStatus: 'Pending' },
                { item_code: '234', description: 'Item 234 Description', purchasing_document: 'PO234', manufacturing_date: '2024-09-02', exportStatus: 'Exported' },
                { item_code: '345', description: 'Item 345 Description', purchasing_document: 'PO345', manufacturing_date: '2024-09-03', exportStatus: 'Pending' },
                { item_code: '456', description: 'Item 456 Description', purchasing_document: 'PO456', manufacturing_date: '2024-09-04', exportStatus: 'Pending' },
                { item_code: '567', description: 'Item 567 Description', purchasing_document: 'PO567', manufacturing_date: '2024-09-05', exportStatus: 'Exported' },
                { item_code: '678', description: 'Item 678 Description', purchasing_document: 'PO678', manufacturing_date: '2024-09-06', exportStatus: 'Pending' },
            ];

            if (itemCode) {
                // Filter data based on the itemCode
                const filteredData = allData.filter((item) => item.item_code === itemCode);
                setData(filteredData);

                // Simulate changing the export status from pending to exported after 4 seconds
                setTimeout(() => {
                    setData((prevData) =>
                        prevData.map((item) =>
                            item.item_code === itemCode
                                ? { ...item, exportStatus: 'Exported' }
                                : item
                        )
                    );
                }, 4000);
            } else {
                // If no itemCode, show all data
                setData(allData);
            }
        };

        fetchData();
    }, [itemCode]);

    const handleGenerateMoreClick = () => {
        // Redirect to the Generate QR page
        navigate('/generateqr');
    };

    const columns: ColumnConfig[] = [
        {
            field: 'item_code',
            headerName: 'Item Code',
            width: 150,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 250,
        },
        {
            field: 'purchasing_document',
            headerName: 'PO Number',
            width: 250,
        },
        {
            field: 'manufacturing_date',
            headerName: 'Manufacturing Date',
            width: 250,
        },
        {
            field: 'exportStatus',
            headerName: 'Export Status',
            width: 200,
            renderCell: (params) => {
                if (itemCode) {
                    // Display a button if itemCode is present in the path
                    const isPending = params.value === 'Pending';
                    return (
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: isPending ? 'yelow' : 'red',
                                color: isPending ? 'black' : 'white',
                                width: '100%',
                            }}
                        >
                            {isPending ? 'Pending' : 'Export'}
                        </Button>
                    );
                } else {
                    // Display only the export status as text if itemCode is not present
                    return <Typography>{params.value}</Typography>;
                }
            },
        },
    ];

    return (
        <div className='screen' style={{ padding: '20px' }}>
            <Typography variant="h5">QR History</Typography>
            <div className='table' style={{ marginTop: '20px' }}>
                <CustomTable
                    editMode={'row'}
                    data={data}
                    columns={columns}
                    loading={false}
                    getRowId={(data: QRHistoryData) => data.item_code}
                />
            </div>
           
        </div>
    );
};

export default QRHistory;


