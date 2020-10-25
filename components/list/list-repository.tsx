import { AxiosRequestConfig } from "axios"
import { apiClient } from "../../config/apiClient"
import { SERVICES_DETAIL_DISTRICT, SERVICES_DISTRICT } from "../../config/constants/api"


export interface GetDistrictPayload {
  cityId: number
}
export interface GetDetailDistrictPayload {
  districtId: number
}
export interface GetDetailDistrictResponse {
data: DetailDistrictResponse
status: number
}
export interface GetDistrictResponse {
  data: DetailDistrictResponse
  status: number
  }
export interface DetailDistrictResponse {
    idDetailDistrict: number,
}
export const getDistrict = async (
    payload: GetDistrictPayload,
  ): Promise<GetDistrictResponse> => {
    try {
      const response = await apiClient.post(
        SERVICES_DISTRICT,
        payload,
        // {
        //   headers: {
        //     ["x-tenantId"]: "common",
        //     "content-type": "application/json",
        //   },
        // }
      )
      console.log('console.log(response);',response);
      alert('hihi')
      return response
    } catch (error) {
      return error.response
    }
  }
export const getDetailDistrict = async (
    payload: GetDetailDistrictPayload,
  ): Promise<GetDetailDistrictResponse> => {
    try {
      const response = await apiClient.post(
        SERVICES_DETAIL_DISTRICT,
        payload,
        {
          headers: {
            ["x-tenantId"]: "common",
            "content-type": "application/json",
          },
        }
      )
      return response
    } catch (error) {
      return error.response
    }
  }