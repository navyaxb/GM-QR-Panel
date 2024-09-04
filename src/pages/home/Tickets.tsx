import React, { useEffect, useState } from 'react';
import { Typography, Snackbar, Modal, Backdrop, Fade, Box, IconButton, Menu, MenuItem } from '@mui/material';
import './Dashboard.css';
// import { raisedIssueTicketForUser, raisedTicketHistoryReport, searchUniqueCodeBasedOnMobileNumber } from '../../utils/services/apiService';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Input, InputPicker } from 'rsuite';
import SearchIcon from '@mui/icons-material/Search';
import { Text } from 'rsuite';
import CustomTable, { ColumnConfig } from '../../components/CustomTable';
import CloseIcon from '@mui/icons-material/Close';
import FileInput from '../../components/FileInput';
import { useGridApiContext } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PaginatedTable from '../../components/PaginatedTable';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    BorderAllRounded: 10
};

const Tickets = () => {
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarContent, setSnackbarContent] = React.useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginationData, setPaginationData] = useState({
        page: 1,
        pageSize: 10,
    });
    const [totalRows, setTotalRows] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchMobile, setSearchMobile] = React.useState('');
    const [formData, setFormData] = React.useState({
        imageRelated: 'ISSUE_TICKET',
        user_unique_code: '',
        user_full_name: '',
        user_mobile_number: '',
        user_issue_type: '',
        user_ticket_description: '',
    });

    const navigate = useNavigate();

    const pickerItems = [
        'OTP Issue',
        'Scan Issue',
        'Redemption Issue',
        'KYC Issue',
        'Other'
    ].map(item => ({ label: item, value: item }));

    useEffect(() => {
        // fetchData(paginationData);
    }, []);
    const handlePaginationChange = async (pageData: any) => {
        const data = {
            page: pageData.page + 1,
            pageSize: pageData.pageSize,
        }
        setPaginationData(data);
        // fetchData(data);
    }
    // const fetchData = async (pageData: any) => {
    //     const response = await raisedTicketHistoryReport(
    //         pageData.page,
    //         pageData.pageSize,
    //         'created_at',
    //         'DESC'
    //     );
    //     if (response.data.code === 200) {
    //         const users = response.data.results.data;
    //         const processedUsers = users.map((user: any, index: number) => ({
    //             ...user,
    //             id: index,
    //             created_at: new Date(user.created_at).toLocaleString(),
    //             updated_at: new Date(user.updated_at).toLocaleString(),
    //         }));
    //         setData(processedUsers);
    //     }
    //     else {
    //         setData([]);
    //     }
    //     setLoading(false);
    // }

    const ActionCell = ({ rowId, user }: { rowId: number, user: any }) => {
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const apiRef = useGridApiContext();
        const [open, setOpen] = React.useState(false);
        const [modalHeading, setModalHeading] = React.useState('');
        const [modalContent, setModalContent] = React.useState('');
        const [comment, setComment] = React.useState('');
        const [error, showError] = React.useState(false);

        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

        const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        };

        const handleMenuClose = () => {
            setAnchorEl(null);
        };

        const handleReopenTicket = () => {
            setModalHeading('Reopen Ticket');
            setModalContent('Are you sure you want to reopen the ticket ' + user.user_ticket_number + '?')
            handleOpen();
        }
        const handleResolveTicket = () => {
            setModalHeading('Resolve Ticket');
            setModalContent('Are you sure you want to resolve the ticket ' + user.user_ticket_number + '?')
            handleOpen();
        }
        const handleConfirm = async () => {
            if (comment === '') {
                showError(true);
                return;
            }
            setOpen(false);
            if (modalHeading === 'Reopen Ticket') {
                console.log('REOPEN', user.user_ticket_number);
                // fetchData(paginationData);
            }
            else if (modalHeading === 'Resolve Ticket') {
                console.log('RESOLVED', user.user_ticket_number);
                // fetchData(paginationData);
            }
        }

        return (
            <div>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                {modalHeading}
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                {modalContent}
                            </Typography>
                            <div className='inputContainer'>
                                <Text style={{ marginBottom: '5px', fontWeight: '700', marginTop: '10px' }}>Add Comments</Text>
                                <Input
                                    placeholder="Enter comment"
                                    value={comment}
                                    onChange={(value) => setComment(value)}
                                />
                               {error &&  <Text style={{color: 'red'}}>Comments are required!</Text>}
                            </div>
                            <div className='btnGrp'>
                                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                                <Button onClick={handleConfirm} color='error' variant="contained">Confirm</Button>
                            </div>
                        </Box>
                    </Fade>
                </Modal>
                <IconButton
                    aria-controls={`actions-menu-${rowId}`}
                    aria-haspopup="true"
                    onClick={handleActionClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id={`actions-menu-${rowId}`}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    {user.user_ticket_status === 'open' ? (
                        <MenuItem onClick={handleResolveTicket}>Resolve Ticket</MenuItem>
                    ) : (
                        <MenuItem onClick={handleReopenTicket}>Reopen Ticket</MenuItem>
                    )}
                </Menu>
            </div>
        );
    };

    const columns: ColumnConfig[] = [
        {
            field: 'user_tickets_id',
            headerName: 'Ticket Id',
            width: 150,
            editable: false,
        },
        {
            field: 'user_unique_code',
            headerName: 'Unique Code',
            width: 150,
            editable: false,
        },
        {
            field: 'user_full_name',
            headerName: 'Full Name',
            width: 150,
            editable: false,
        },
        {
            field: 'user_ticket_number',
            headerName: 'Ticket Number',
            width: 150,
            editable: false,
        },
        {
            field: 'user_ticket_image',
            headerName: 'Ticket Image',
            width: 150,
            editable: false,
            renderCell: (params) => {
                return params.value ? (
                    <img
                        src={params.value}
                        style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
                    />
                ) : '-';
            },
        },
        {
            field: 'user_mobile_number',
            headerName: 'Mobile Number',
            width: 200,
            editable: false,
        },
        {
            field: 'user_issue_type',
            headerName: 'Issue Type',
            width: 150,
            editable: false,
        },
        {
            field: 'user_ticket_description',
            headerName: 'Ticket Description',
            width: 150,
            editable: false,
        },
        {
            field: 'user_ticket_status',
            headerName: 'Ticket Status',
            width: 150,
            editable: false,
        },
        {
            field: 'user_ticket_resolved_by',
            headerName: 'Ticket Resolved By',
            width: 150,
            editable: false,
            renderCell: (params) => {
                return params.value ? params.value : '-';
            },
        },
        {
            field: 'user_ticket_resolved_at',
            headerName: 'Ticket Resolved At',
            width: 200,
            editable: false,
            renderCell: (params) => {
                return params.value ? params.value : '-';
            },
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 200,
            editable: false,
        },
        {
            field: 'updated_at',
            headerName: 'Updated At',
            width: 200,
            editable: false,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            editable: false,
            renderCell: (params) => (
                <ActionCell rowId={params.row.user_id} user={params.row} />

            ),
        },

    ];

    const pressRaiseTicket = async () => {
        setOpenDialog(true);
    };

    const raiseTicket = async () => {
        if (!selectedFile||
            formData.imageRelated === '' ||
            formData.user_unique_code === '' ||
            formData.user_full_name === '' ||
            formData.user_mobile_number === '' ||
            formData.user_issue_type === '' ||
            formData.user_ticket_description === ''
        ) {
            setSnackbarContent('Enter all the details');
            setOpenSnackbar(true);
            return;
        }
        const data = new FormData();
        if(selectedFile){
            console.log("SELCTED FILE", selectedFile)
            data.append('file', selectedFile);
        }
        data.append('imageRelated', formData.imageRelated);
        data.append('user_unique_code', formData.user_unique_code);
        data.append('user_full_name', formData.user_full_name);
        data.append('user_mobile_number', formData.user_mobile_number);
        data.append('user_issue_type', formData.user_issue_type);
        data.append('user_ticket_description', formData.user_ticket_description);
        
        const response =
        //  await raisedIssueTicketForUser(data);
        // if (response.data.code === 200) {
        //     setSnackbarContent(response.data.message)
        //     setOpenSnackbar(true);
        //     // fetchData(paginationData);
        // }
        setOpenDialog(false);
    }
    function isValidMobileNumber(mobile: string): boolean {
        console.log(mobile)
        const mobileNumberPattern = /^[0-9]{10}$/;
        return mobileNumberPattern.test(mobile);
    }
    const searchUniqueId = async (mobile: string) => {
        if (mobile && isValidMobileNumber(mobile)) {
            setLoading(true);
            const data = {
                user_mobile_number: mobile
            }
            const response = 
            // await searchUniqueCodeBasedOnMobileNumber(data);
            // if (response.data.code === 200) 
            //     {
            //     const res = response.data.results.data;
            //     setFormData((prevData: any) => ({
            //         ...prevData,
            //         user_unique_code: res.user_unique_code,
            //         user_full_name: res.user_full_name,
            //         user_mobile_number: res.user_mobile_number
            //     }))
            // }
            setLoading(false);
        }
    }

    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

    const handleFileChange = (file: File | null) => {
        if (file) {
            console.log('Selected file:', file);
            setSelectedFile(file)
        } else {
            setSnackbarContent('No file selected!')
            setOpenSnackbar(true);
            console.error('No file selected!');
            return;
        }
    };

    const handleInputChange = async (e: string) => {
        setSearchMobile(e);
        if(e.length === 10) {
            console.log("MOBILE", e)
            searchUniqueId(e);
        }
    }

    return (
        <div style={{padding: '20px'}}>
            <Typography variant="h5">Tickets</Typography>
            <Dialog open={openDialog} style={{ zIndex: '6' }}>
                <div className='dialog'>
                    <DialogTitle>Raise Ticket</DialogTitle>
                    <div className='closeIcon'>
                        <CloseIcon onClick={() => setOpenDialog(false)} />
                    </div>

                    <div className='searchUniqueId'>
                        <Input
                            placeholder="Enter Mobile Number to Search Unique ID"
                            value={searchMobile}
                            onChange={(e)=>handleInputChange(e)}
                            maxLength={10}
                        />
                        <div className='iconContainer' onClick={()=>searchUniqueId(searchMobile)}>
                            <SearchIcon className='searchIcon' />
                        </div>
                    </div>
                    <div className='inputContainer'>
                        <Text style={{ marginBottom: '5px', fontWeight: '700' }}>Unique ID</Text>
                        <Input
                            placeholder="Unique ID"
                            value={formData.user_unique_code}
                            disabled
                        />
                    </div>
                    <div className='inputContainer'>
                        <Text style={{ marginBottom: '5px', fontWeight: '700' }}>Issue Type</Text>
                        <InputPicker
                            data={pickerItems}
                            placeholder="Issue Type"
                            value={formData.user_issue_type}
                            onChange={(value) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    user_issue_type: value
                                }));
                            }}
                            block
                        />
                    </div>
                    <div className='inputContainer'>
                        <Text style={{ marginBottom: '5px', fontWeight: '700' }}>Ticket Description</Text>
                        <Input
                            placeholder="Ticket Description"
                            value={formData.user_ticket_description}
                            onChange={(e) => {
                                setFormData((prevdata: any) => ({
                                    ...prevdata,
                                    user_ticket_description: e
                                }))
                            }}

                        />
                    </div>
                    {/* <input type="file" onChange={uploadImage}></input> */}
                    <FileInput onFileChange={handleFileChange} />

                    {/* <div className='uploadImage' onClick={uploadImage}>
                        Click to upload image
                    </div> */}

                    <Button style={{marginTop: 10}} variant="contained" onClick={raiseTicket}>Submit</Button>
                </div>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarContent}
            />

            <div className='table'>
                <div className='buttonFlex'>
                    <div className='btnRaiseTicket' onClick={pressRaiseTicket}>
                        <AddCircleOutlineIcon className='btnRaiseTicketIcon' />
                        Raise Ticket
                    </div>
                </div>
                <PaginatedTable
                    editMode={'row'}
                    data={data}
                    columns={columns}
                    loading={loading}
                    getRowId={(data: any) => { return data.id; }}
                    rowCount={totalRows}
                    onPageChange={(pageData: any) => {
                        handlePaginationChange(pageData);
                    }}
                />
            </div>
        </div>
    );
};

export default Tickets;
