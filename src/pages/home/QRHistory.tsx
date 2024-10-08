import React, { useState, useEffect } from 'react';
import CustomTable, { ColumnConfig } from "../../components/CustomTable";
import { Typography, Button } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface QRHistoryData {
    item_code: string;
    description: string;
    purchasing_document: string;
    manufacturing_date: string;
    exportStatus: string;
}

const QRHistory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { itemCode } = useParams<{ itemCode?: string }>();
    const [data, setData] = useState<QRHistoryData[]>([]);
    const [allExported, setAllExported] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            const queryParams = new URLSearchParams(location.search);
            const purchasingDocument = queryParams.get('purchasingDocument');
            const itemCodes = JSON.parse(queryParams.get('itemCodes') || '[]');

            // Simulated data fetching
           const allData: QRHistoryData[] = [
                { item_code: '123', description: 'Item 123 Description', purchasing_document: 'PO12345', manufacturing_date: '2024-09-01', exportStatus: 'Pending' },
                { item_code: '234', description: 'Item 234 Description', purchasing_document: 'PO12345', manufacturing_date: '2024-09-02', exportStatus: 'Pending' },
                { item_code: '345', description: 'Item 345 Description', purchasing_document: 'PO12345', manufacturing_date: '2024-09-03', exportStatus: 'Pending' },
                { item_code: '456', description: 'Item 456 Description', purchasing_document: 'PO12346', manufacturing_date: '2024-09-04', exportStatus: 'Pending' },
                { item_code: '567', description: 'Item 567 Description', purchasing_document: 'PO12346', manufacturing_date: '2024-09-05', exportStatus: 'Pending' },
                { item_code: '678', description: 'Item 678 Description', purchasing_document: 'PO12346', manufacturing_date: '2024-09-06', exportStatus: 'Pending' },
            ];
            let filteredData: QRHistoryData[];

            if (itemCode) {
                filteredData = allData.filter((item) => item.item_code === itemCode);
            } else if (purchasingDocument && itemCodes.length > 0) {
                filteredData = allData.filter((item) => 
                    item.purchasing_document === purchasingDocument && itemCodes.includes(item.item_code)
                );
            } else {
                filteredData = allData;
            }

            // Check if all PO numbers are the same
            if (filteredData.length > 1) {
                const firstPO = filteredData[0].purchasing_document;
                const allSamePO = filteredData.every(item => item.purchasing_document === firstPO);
                
                if (allSamePO) {
                    setAllExported(true);
                    filteredData = filteredData.map(item => ({...item, exportStatus: 'Exported'}));
                } else {
                    setAllExported(false);
                }
            } else {
                setAllExported(false);
            }

            setData(filteredData);
        };

        fetchData();
    }, [location, itemCode]);

    const handleExport = (itemCode: string) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.item_code === itemCode
                    ? { ...item, exportStatus: 'Exported' }
                    : item
            )
        );
        // Here you would typically call an API to perform the actual export
        console.log(`Exporting data for item code: ${itemCode}`);
    };

    const columns: ColumnConfig[] = [
        { field: 'item_code', headerName: 'Item Code', width: 150 },
        { field: 'description', headerName: 'Description', width: 250 },
        { field: 'purchasing_document', headerName: 'PO Number', width: 250 },
        { field: 'manufacturing_date', headerName: 'Manufacturing Date', width: 250 },
        {
            field: 'exportStatus',
            headerName: 'Export',
            width: 200,
            renderCell: (params) => {
                const isPending = params.value === 'Pending' && !allExported;
                return (
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: isPending ? 'red' : 'green',
                            color: 'white',
                            width: '100%',
                        }}
                        onClick={() => isPending && handleExport(params.row.item_code)}
                        disabled={!isPending}
                    >
                        {isPending ? 'EXPORT' : 'EXPORTED'}
                    </Button>
                );
            },
        },
    ];

    return (
        <div className='screen' style={{ padding: '20px' }}>
            <Typography variant="h5">
                {itemCode ? `QR History for Item Code: ${itemCode}` : 'QR History'}
            </Typography>
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