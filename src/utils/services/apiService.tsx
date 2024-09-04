import axios, { AxiosInstance, AxiosResponse } from 'axios';
// import { API_LINK, DEV_API_LINK, PROD_API_LINK } from '../../values/constants';

export const api: AxiosInstance = axios.create({
    // baseURL: PROD_API_LINK,
});

async function createPostRequest(
    relativeUrl: string,
    data: any,
    contentType: string = 'application/json'
): Promise<AxiosResponse> {
    try {
        const headers = {
            Accept: 'application/json',
            'Content-Type': contentType,
        };
        // const authToken: string = await AsyncStorage.getItem('auth_token') as string;
        // if (authToken) {
        //     api.defaults.headers.common['Authorization'] = authToken;
        // }
        const response: AxiosResponse = await api.post(relativeUrl, data, {
            headers,
        });
        return response;
    } catch (error: any) {
        return error.response;
    }
}


async function createPutRequest(
    relativeUrl: string,
    data?: any,
): Promise<AxiosResponse> {
    try {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        let response: AxiosResponse;
        if(data) {
            response = await api.put(relativeUrl, data, {
                headers,
            });
        }
        else{
            response = await api.put(relativeUrl, {
                headers,
            });
        }
        return response;
    } catch (error: any) {
        return error.response;
    }
}

async function createGetRequest(
    relativeUrl: string,
): Promise<AxiosResponse> {
    try {
        const headers = {
            Accept: 'application/json',
        };
        const response: AxiosResponse = await api.get(relativeUrl, {
            headers,
        });
        return response;
    } catch (error: any) {
        return error.response;
    }
}

//1. --------------------------------LOGIN USER----------------------------

export async function loginUser(
    data: any
): Promise<AxiosResponse> {
    const path = 'web/api/webUserLogin';
    const response: AxiosResponse = await createPostRequest(path, data);
    return response;
}

//2. --------------------------------GET ALL USERS----------------------------

export async function getAllUsers(
    page: number,
    pageSize: number,
    orderBy: string,
    orderDir: 'ASC' | 'DESC'
): Promise<AxiosResponse> {
    const path = `web/api/getAllRegisteredUsersOfLoyalty?limit=${pageSize}&page=${page}&orderBy=${orderBy}&orderDir=${orderDir}`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//4. --------------------------------DEACTIVATE USER----------------------------

export async function deactivateUser(
    user_id: number
): Promise<AxiosResponse> {
    const path = `web/api/deactivateLoyaltyUser/${user_id}`;
    const response: AxiosResponse = await createPutRequest(path);
    return response;
}

//5. --------------------------------ACTIVATE USER----------------------------

export async function activateUser(
    user_id: number
): Promise<AxiosResponse> {
    const path = `web/api/activateLoyaltyUser/${user_id}`;
    const response: AxiosResponse = await createPutRequest(path);
    return response;
}

//6. --------------------------------LOGIN REPORTS----------------------------

export async function usersLoginHistoryReport(
    page: number,
    pageSize: number,
    orderBy: string,
    orderDir: 'ASC' | 'DESC'
): Promise<AxiosResponse> {
    const path = `web/api/usersLoginHistoryReport?limit=${pageSize}&page=${page}&orderBy=${orderBy}&orderDir=${orderDir}`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//7. --------------------------------OTP HISTORY REPORTS----------------------------

export async function userSmsOTPHistoryReport(): Promise<AxiosResponse> {
    const path = 'web/api/userSmsOTPHistoryReport';
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//8. --------------------------------DASHBOARD DATA----------------------------

export async function userDashboardShowOverallData(): Promise<AxiosResponse> {
    const path = 'web/api/userDashboardShowOverallData';
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//9. --------------------------------SEARCH UNIQUE CODE----------------------------

export async function searchUniqueCodeBasedOnMobileNumber(
    data: any
): Promise<AxiosResponse> {
    const path = 'web/api/searchUniqueCodeBasedOnMobileNumber';
    const response: AxiosResponse = await createPostRequest(path, data);
    return response;
}

//10. --------------------------------EXPORT CSV USERS----------------------------

export async function usersExportCSVDownload(): Promise<void> {
    const path = 'web/api/usersExportCSVDownload';
    // const relativeUrl = PROD_API_LINK + path
    const relativeUrl = path
    const response: AxiosResponse = await axios.get(relativeUrl, {
        responseType: 'blob', // Important for handling binary data
    });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'users.csv'); // or whatever file name you want
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

//11. --------------------------------TRANSACTION HISTORY----------------------------

export async function usersQRCodeScannedTransactionHistoryReport(): Promise<AxiosResponse> {
    const path = 'web/api/usersQRCodeScannedTransactionHistoryReport';
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//11. --------------------------------POINTS HISTORY----------------------------

export async function userDashboardForShowPointsHistoryForSpecificUsers(
    page: number,
    pageSize: number,
    orderBy: string,
    orderDir: 'ASC' | 'DESC'
): Promise<AxiosResponse> {
    const path = 'web/api/userDashboardForShowPointsHistoryForSpecificUsers?limit=${pageSize}&page=${page}&orderBy=${orderBy}&orderDir=${orderDir}`;';
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//12. --------------------------------TICKET HISTORY REPORT----------------------------

export async function raisedTicketHistoryReport(
    page: number,
    pageSize: number,
    orderBy: string,
    orderDir: 'ASC' | 'DESC'
): Promise<AxiosResponse> {
    const path = `web/api/raisedTicketHistoryReport?limit=${pageSize}&page=${page}&orderBy=${orderBy}&orderDir=${orderDir}`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//13. --------------------------------RAISE TICKET----------------------------

export async function raisedIssueTicketForUser(
    data: any
): Promise<AxiosResponse> {
    const path = 'web/api/raisedIssueTicketForUser';
    const response: AxiosResponse = await createPostRequest(path, data, 'multipart/form-data');
    return response;
}

//14. --------------------------------GET USER DETAILS BASED ON ID----------------------------

export async function getSpecificUserBasedOnId(
    userId: string
): Promise<AxiosResponse> {
    const path = `web/api/viewSpecificUserBasedOnId/${userId}`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//15. --------------------------------EDIT PROFILE BY ADMIN----------------------------

export async function editUserDetailsByAdmin(
    userId: any,
    data: any
): Promise<AxiosResponse> {
    const path = `web/api/editUserDetailsByAdmin/${userId}`;
    const response: AxiosResponse = await createPutRequest(path, data);
    return response;
}

//16. --------------------------------REGISTERED USERS----------------------------

export async function getAllRegisteredUsersOfLoyalty(
    page: number,
    pageSize: number,
    orderBy: string,
    orderDir: 'ASC' | 'DESC'
): Promise<AxiosResponse> {
    const path = `web/api/getAllRegisteredUsersOfLoyalty?limit=${pageSize}&page=${page}&orderBy=${orderBy}&orderDir=${orderDir}`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//17. --------------------------------EDIT PROFILE BY ADMIN----------------------------

export async function updateMasterAllocationOfPointsAndLimit(
    data: any
): Promise<AxiosResponse> {
    const path = `web/api/updateMasterAllocationOfPointsAndLimit`;
    const response: AxiosResponse = await createPostRequest(path, data);
    return response;
}

//18. --------------------------------ADD MASTER CAMPAIGN CHANNEL CONFIG----------------------------

export async function insertMasterCamapignChannelConfig(
    data: any
): Promise<AxiosResponse> {
    const path = `web/api/insertMasterCamapignChannelConfig`;
    const response: AxiosResponse = await createPostRequest(path, data);
    return response;
}

//19. --------------------------------CATALOGUE UPLOAD----------------------------

export async function inserCatalogueMasterPdfUpload(
    data: any
): Promise<AxiosResponse> {
    const path = `web/api/inserCatalogueMasterPdfUpload`;
    const response: AxiosResponse = await createPostRequest(path, data, 'multipart/form-data');
    return response;
}

//20. --------------------------------BANNER UPLOAD----------------------------

export async function insertBannersImageUpload(
    data: any
): Promise<AxiosResponse> {
    const path = `web/api/insertBannersImageUpload`;
    const response: AxiosResponse = await createPostRequest(path, data, 'multipart/form-data');
    return response;
}

//21. --------------------------------ADD ISSUE TYPE----------------------------

export async function insertIssueTypeMasterEntry(
    data: any
): Promise<AxiosResponse> {
    const path = `web/api/insertIssueTypeMasterEntry`;
    const response: AxiosResponse = await createPostRequest(path, data, 'multipart/form-data');
    return response;
}

//22. --------------------------------ADD PRODUCT CATEGORY BULK----------------------------

export async function insertProductCategoryMasterInBulk(
    data: any
): Promise<AxiosResponse> {
    const path = `web/api/insertProductCategoryMasterInBulk`;
    const response: AxiosResponse = await createPostRequest(path, data, 'multipart/form-data');
    return response;
}

//23. --------------------------------ADD PRODUCT SKU BULK----------------------------

export async function insertProductSKUMasterInBulk(
    data: any
): Promise<AxiosResponse> {
    const path = `web/api/insertProductSKUMasterInBulk`;
    const response: AxiosResponse = await createPostRequest(path, data, 'multipart/form-data');
    return response;
}

//24. --------------------------------ADD PRODUCT SUB CATEGORY BULK----------------------------

export async function insertProductSubCategoryMasterInBulk(
    data: any
): Promise<AxiosResponse> {
    const path = `web/api/insertProductSubCategoryMasterInBulk`;
    const response: AxiosResponse = await createPostRequest(path, data, 'multipart/form-data');
    return response;
}

//25. --------------------------------ADD SINGLE PRODUCT CATEGORY----------------------------

export async function addSingleEntryProductCategoryMaster(
    data: any
): Promise<AxiosResponse> {
    const path = `web/api/addSingleEntryProductCategoryMaster`;
    const response: AxiosResponse = await createPostRequest(path, data, 'multipart/form-data');
    return response;
}

//26. --------------------------------ADD SINGLE PRODUCT SUB CATEGORY----------------------------

export async function addSingleEntryProductSubCategoryMaster(
    data: any
): Promise<AxiosResponse> {
    const path = `web/api/addSingleEntryProductSubCategoryMaster`;
    const response: AxiosResponse = await createPostRequest(path, data, 'multipart/form-data');
    return response;
}

//27. --------------------------------ADD PRODUCT SUB CATEGORY BULK----------------------------

export async function addSingleEntryProductSKUMaster(
    data: any
): Promise<AxiosResponse> {
    const path = `web/api/addSingleEntryProductSKUMaster`;
    const response: AxiosResponse = await createPostRequest(path, data, 'multipart/form-data');
    return response;
}

//28. --------------------------------GET PRODUCT CATEGORY TABLE----------------------------

export async function getAllProductCategoryMasterData(): Promise<AxiosResponse> {
    const path = `web/api/getAllProductCategoryMasterData`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//29. --------------------------------GET PRODUCT SUB CATEGORY TABLE----------------------------

export async function getAllProductSubCategoryMasterData(): Promise<AxiosResponse> {
    const path = `web/api/getAllProductSubCategoryMasterData`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//30. --------------------------------GET SKU MASTER DATA----------------------------

export async function getAllProductSKUMasterData(): Promise<AxiosResponse> {
    const path = `web/api/getAllProductSKUMasterData`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//31. --------------------------------GET CAMPAIGN DATA----------------------------

export async function getTheDataOfCampaignConfig(): Promise<AxiosResponse> {
    const path = `web/api/getTheDataOfCampaignConfig`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}


//32. --------------------------------BLOCK USER----------------------------

export async function blockedLoyaltyUser(
    user_id: number
): Promise<AxiosResponse> {
    const path = `web/api/blockedLoyaltyUser/${user_id}`;
    const response: AxiosResponse = await createPutRequest(path);
    return response;
}

//33. --------------------------------UNBLOCK USER----------------------------

export async function unblockedLoyaltyUser(
    user_id: number
): Promise<AxiosResponse> {
    const path = `web/api/unblockedLoyaltyUser/${user_id}`;
    const response: AxiosResponse = await createPutRequest(path);
    return response;
}

//34. --------------------------------GET ENROLLMENT USERS----------------------------

export async function usersEnrollmentHistoryReport(
    page: number,
    pageSize: number,
    orderBy: string,
    orderDir: 'ASC' | 'DESC'
): Promise<AxiosResponse> {
    const path = `web/api/usersEnrollmentHistoryReport?limit=${pageSize}&page=${page}&orderBy=${orderBy}&orderDir=${orderDir}`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//35. --------------------------------GET REDEMPTION USERS----------------------------

export async function usersRedemptionHistoryReport(
    page: number,
    pageSize: number,
    orderBy: string,
    orderDir: 'ASC' | 'DESC'
): Promise<AxiosResponse> {
    const path = `web/api/usersRedemptionHistoryReport?limit=${pageSize}&page=${page}&orderBy=${orderBy}&orderDir=${orderDir}`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//36. --------------------------------GET REDEMPTION USERS----------------------------

export async function rejectUser(
    userId: number
): Promise<AxiosResponse> {
    const path = `web/api/rejectUserForLogin/${userId}`;
    const response: AxiosResponse = await createPutRequest(path);
    return response;
}

//37. --------------------------------GET REDEMPTION USERS----------------------------

export async function approveUser(
    userId: number
): Promise<AxiosResponse> {
    const path = `web/api/approvedUserForLogin/${userId}`;
    const response: AxiosResponse = await createPutRequest(path);
    return response;
}

//38. --------------------------------GET BANNERS----------------------------

export async function getTheDataOfBanners(): Promise<AxiosResponse> {
    const path = `web/api/getTheDataOfBanners`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//39. --------------------------------GET CATALOGUE----------------------------

export async function getTheCatalogue(): Promise<AxiosResponse> {
    const path = `web/api/getTheCatalogue`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//39. --------------------------------UPDATE BANNER----------------------------

export async function updateBannersImageUpload(
    data: any
): Promise<AxiosResponse> {
    const path = `web/api/updateBannersImageUpload`;
    const response: AxiosResponse = await createPostRequest(path, data);
    return response;
}

//40. --------------------------------GET ISSUE TYPE TABLE----------------------------

export async function getTheDataOfIssueType(
    page: number,
    pageSize: number,
    orderBy: string,
    orderDir: 'ASC' | 'DESC'
): Promise<AxiosResponse> {
    const path = `web/api/getTheDataOfIssueType?limit=${pageSize}&page=${page}&orderBy=${orderBy}&orderDir=${orderDir}`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//41. --------------------------------GET ALL STATE----------------------------

export async function getAllStateMaster(): Promise<AxiosResponse> {
    const path = `web/api/getAllStateMaster`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//42. --------------------------------GET SCHEME MASTER DATA----------------------------

export async function getTheDataOfSchemeMaster(): Promise<AxiosResponse> {
    const path = `web/api/getTheDataOfSchemeMaster`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//43. --------------------------------INSERT SCHEME MASTER DATA----------------------------

export async function insertScheme(
    data: any
): Promise<AxiosResponse> {
    const path = `web/api/insertScheme`;
    const response: AxiosResponse = await createPostRequest(path, data);
    return response;
}

//44. --------------------------------GET POINTS ALLOCATION LIMIT----------------------------

export async function getTheDataOfPointsAllocationAndLimit(): Promise<AxiosResponse> {
    const path = `web/api/getTheDataOfPointsAllocationAndLimit`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//45. --------------------------------GET ALL REDEMPTION REQUEST OF USER----------------------------

export async function getAllRedemptionRequestOfUser(
    page: number,
    pageSize: number,
    orderBy: string,
    orderDir: 'ASC' | 'DESC'
): Promise<AxiosResponse> {
    const path = `web/api/getAllRedemptionRequestOfUser?limit=${pageSize}&page=${page}&orderBy=${orderBy}&orderDir=${orderDir}`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}
//46. ------------------------------- APPROVE USER FOR REDEMPTION ----------------------------

export async function approvedUserForRedemption(
    userId: number
): Promise<AxiosResponse> {
    const path = `web/api/approvedUserForRedemption/${userId}`;
    const response: AxiosResponse = await createPutRequest(path);
    return response;
}
//47. --------------------------------REJECT REDEMPTION USERS----------------------------

export async function rejectUserForRedemption(
    userId: number
): Promise<AxiosResponse> {
    const path = `web/api/rejectUserForRedemption/${userId}`;
    const response: AxiosResponse = await createPutRequest(path);
    return response;
}

//48. --------------------------------USER SEARCH FILTER DATA----------------------------

export async function userSearchFilterData(
    data: any
): Promise<AxiosResponse> {
    const path = 'web/api/userSearchFilterData';
    const response: AxiosResponse = await createPostRequest(path, data);
    return response;
}

//49. --------------------------------GET ALL GEOGRAPHY LOCATION DATA----------------------------

export async function getAllGeoGraphyLocationDetails
(): Promise<AxiosResponse> {
    const path = `web/api/getAllGeoGraphyLocationDetails`;
    const response: AxiosResponse = await createGetRequest(path);
    return response;
}

//50. --------------------------------GET STATE CITY BY PINCODE---------------------------

export async function fetchStateCityByPincode
(data: any): Promise<AxiosResponse> {
    const path = `auth/user/api/mobile/fetchStateCityByPincode`;
    const response: AxiosResponse = await createPostRequest(path, data);
    return response;
}