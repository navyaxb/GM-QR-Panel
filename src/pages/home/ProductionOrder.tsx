import CustomTable,{ColumnConfig} from "../../components/CustomTable";
import React, { useEffect, useState } from 'react';
import { Input, InputGroup } from 'rsuite';
import { Typography, Snackbar } from '@mui/material';
import './Productions.css'
import Button from '@mui/material/Button';

const ProductionOrder = () => {
    const [data, setData] = useState([
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
            serial_number: 'Batch001',
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
            serial_number: 'Batch002',
            lot: 'Lot2',
            total_no_of_pkt: 20,
            qr_type: 'Type B',
            ean_code: 'EAN002',
            quality_check: 'Failed',
            sfg_to_fg: 'No',
            active: 'No',
            scanned: 'No',
        }
    ]);    
    
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     const response = await usersQRCodeScannedTransactionHistoryReport();
    //     if (response.data.code === 200) {
    //         const users = response.data.results.data;
    //         const processedUsers = users.map((user: any, index: number) => ({
    //             ...user,
    //             id: index,
    //             created_at: new Date(user.created_at).toLocaleString(),
    //             scan_time: new Date(user.scan_time).toLocaleString(),
    //         }));
            
    //         setData(processedUsers);
    //     } else {
    //         setData([]);
    //     }
    //     setLoading(false);
    // }
    const columns: ColumnConfig[] = [
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
            field: 'item_code',
            headerName: 'Item Code',
            width: 150,
            editable: false,
        },
        {
            field: 'item_desciption',
            headerName: 'Item Description',
            width: 150,
            editable: false,
        },
        {
            field: 'material_group',
            headerName: 'Material Group',
            width: 200,
            editable: false,
        },
        {
            field: 'plant',
            headerName: 'Plant',
            width: 200,
            editable: false,
        },
        {
            field: 'order_quantity',
            headerName: 'Order Quantity',
            width: 200,
            editable: false,
        },
        {
            field: 'qr_size',
            headerName: 'QR Size',
            width: 200,
            editable: false,
        },
        {
            field: 'serial_number',
            headerName: 'Serial Number',
            width: 200,
            editable: false,
        },
        {
            field: 'lot',
            headerName: 'Lot',
            width: 200,
            editable: false,
        },
        {
            field: 'total_no_of_pkt',
            headerName: 'Total No of Pkt',
            width: 200,
            editable: false,
        },
        {
            field: 'qr_type',
            headerName: 'QR Type',
            width: 200,
            editable: false,
        },
        {
            field: 'ean_code',
            headerName: 'EAN Code',
            width: 200,
            editable: false,
        },
        {
            field: 'quality_check',
            headerName: 'Quality Check',
            width: 200,
            editable: false,
        },
        // {
        //     field: 'sfg_to_fg',
        //     headerName: 'SFG To FG',
        //     width: 200,
        //     editable: false,
        // },
        // {
        //     field: 'active',
        //     headerName: 'Active',
        //     width: 200,
        //     editable: false,
        // },
        // {
        //     field: 'scanned',
        //     headerName: 'Scanned',
        //     width: 200,
        //     editable: false,
        // },
        {
            field: 'action',
            headerName: 'Action',
            width: 250,
            renderCell: (rowData: any) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button variant="outlined" onClick={() => handleDetailsClick(rowData)}>Details</Button>
                    <Button variant="contained">Download</Button>
                </div>
            ),
        }
        
       
    ];
    const handleDetailsClick = (rowData: any) => {
        // Redirect to the details page
        // In a real-world application, use `useNavigate` from `react-router-dom`
        window.location.href = `/production-order-details/${rowData.id}`;
    };

    const styles = {
        width: 450,
        marginBottom: 10
    };


    return (
        <div className='screen' style={{ padding: '20px' }}>
            <Typography variant="h5">Production Order</Typography>
            <div className='table' style={{ marginTop: '20px' }}>
                <CustomTable
                    editMode={'row'}
                    data={data}
                    columns={columns}
                    loading={false}
                    getRowId={(data: any) => data.id}
                />
            </div>
        </div>
    );
};

export default ProductionOrder;
