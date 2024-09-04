import CustomTable, { ColumnConfig } from "../../components/CustomTable";
import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const ProductionOrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    interface DataItem {
        item_code: string;
        id: number;
        purchasing_document: string;
        document_date: string;
        vendor_name: string;
        item_desciption: string;
        material_group: string;
        plant: string;
        order_quantity: number;
        qr_size: string;
        batch_number: string;
        lot: string;
        total_no_of_pkt: number;
        qr_type: string;
        ean_code: string;
        quality_check: string;
        sfg_to_fg: string;
        active: string;
        scanned: string;
    }
    
    const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        // Simulate fetching the data based on the ID
        const fetchData = () => {
            const allData = [
                {
                    id: 1,
                    purchasing_document: 'PO12345',
                    document_date: '2024-09-04',
                    vendor_name: 'Vendor A',
                    item_code: '123, 234, 345',
                    item_desciption: 'Item Description A',
                    material_group: 'Material Group 1',
                    plant: 'Plant 1',
                    order_quantity: 100,
                    qr_size: 'Medium',
                    batch_number: 'Batch001',
                    lot: 'Lot1',
                    total_no_of_pkt: 10,
                    qr_type: 'Type A',
                    ean_code: 'EAN001',
                    quality_check: 'Passed',
                    sfg_to_fg: 'Yes',
                    active: 'Yes',
                    scanned: 'Yes',
                },
                {
                    id: 2,
                    purchasing_document: 'PO12346',
                    document_date: '2024-09-04',
                    vendor_name: 'Vendor B',
                    item_code: '456, 567, 678',
                    item_desciption: 'Item Description B',
                    material_group: 'Material Group 2',
                    plant: 'Plant 2',
                    order_quantity: 200,
                    qr_size: 'Large',
                    batch_number: 'Batch002',
                    lot: 'Lot2',
                    total_no_of_pkt: 20,
                    qr_type: 'Type B',
                    ean_code: 'EAN002',
                    quality_check: 'Failed',
                    sfg_to_fg: 'No',
                    active: 'No',
                    scanned: 'No',
                }
                // Other rows...
            ];

            const selectedData = allData.find((item) => item.id === parseInt(id ?? ''));
            if (selectedData) {
                // Split the item_code into separate rows
                const splitData = selectedData.item_code.split(',').map((code) => ({
                    ...selectedData,
                    item_code: code.trim(),
                }));
                setData(splitData);
            }
        };

        fetchData();
    }, [id]);

    const handleGenerateClick = (itemCode: string) => {
        navigate(`/generateqr`, { state: { itemCode, ...data.find(d => d.item_code === itemCode) } });
    };

    const columns: ColumnConfig[] = [
        {
            field: 'item_code',
            headerName: 'Item Code',
            width: 150,
            editable: false,
        },
        {
            field: 'purchasing_document',
            headerName: 'Purchasing Document',
            width: 150,
            editable: false,
        },
        {
            field: 'document_date',
            headerName: 'Document Date',
            width: 150,
            editable: false,
        },
        {
            field: 'vendor_name',
            headerName: 'Vendor Name',
            width: 150,
            editable: false,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params: any) => (
                <Button
                    variant="contained"
                    onClick={() => handleGenerateClick(params.row.item_code)}
                >
                    Generate
                </Button>
            ),
        },
    ];

    return (
        <div className='screen' style={{ padding: '20px' }}>
            <Typography variant="h5">Production Order Details</Typography>
            <div className='table' style={{ marginTop: '20px' }}>
                <CustomTable
                    editMode={'row'}
                    data={data}
                    columns={columns}
                    loading={false}
                    getRowId={(data: any) => data.item_code}
                />
            </div>
        </div>
    );
};

export default ProductionOrderDetails;
