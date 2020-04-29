const {sale, mock} = process.env.API_HOST_LIST

const demo = [
  {
    name: 'MDDS_AREA_INIT',
    url: `${sale}/mdds/area/init`,
    method: 'GET',
    withCredentials: true
  },
  {
    name: 'MDDS_AREA_PAGE',
    url: `${sale}/mdds/area/page`,
    method: 'GET',
    withCredentials: true
  },
  {
    name: 'MDDS_AREA_ADD',
    url: `${sale}/mdds/area/add`,
    method: 'POST',
    withCredentials: true
  },
  {
    name: 'MDDS_AREA_UPDATE',
    url: `${sale}/mdds/area/update`,
    method: 'POST',
    withCredentials: true
  },
  {
    name: 'MDDS_AREA_GETAREAINFO',
    url: `${sale}/mdds/area/getAreaInfo`,
    method: 'GET',
    withCredentials: true
  },
  {
    name: 'MDDS_AREA_LIST_BYADCODE',
    url: `${sale}/mdds/area/list/byadcode`,
    method: 'POST',
    withCredentials: true
  },
  {
    name: 'MDDS_CITY_SERVICE_LIST',
    url: `${sale}/mdds/city/service/list`,
    method: 'GET',
    withCredentials: true
  },
  {
    name: 'MDDS_CITY_SERVICE_INIT',
    url: `${sale}/mdds/city/service/init`,
    method: 'GET',
    withCredentials: true
  },
  {
    name: 'MDDS_CITY_SERVICE_UPDATE_STATUS',
    url: `${sale}/mdds/city/service/update/status`,
    method: 'POST',
    withCredentials: true
  },
  {
    name: 'MDDS_CITY_SERVICE_CREATE',
    url: `${sale}/mdds/city/service/create`,
    method: 'POST',
    withCredentials: true
  },
  {
    name: 'MDDS_CITY_SERVICE_UPDATE',
    url: `${sale}/mdds/city/service/update`,
    method: 'POST',
    withCredentials: true
  },
  {
    name: 'GDS_BRAND_INIT',
    url: `${sale}/gds/brand/init`,
    method: 'GET',
    withCredentials: true
  },
  {
    name: 'GDS_BRAND_LIST',
    url: `${sale}/gds/brand/list`,
    method: 'GET',
    withCredentials: true
  },
  {
    name: 'GDS_BRAND_CREATEBRAND',
    url: `${sale}/gds/brand/createBrand`,
    method: 'POST',
    withCredentials: true
  },
  {
    name: 'GDS_BRAND_UPDATEBRAND',
    url: `${sale}/gds/brand/updateBrand`,
    method: 'POST',
    withCredentials: true
  },
  {
    name: 'GDS_BRAND_UPDATEBRAND_STATUS',
    url: `${sale}/gds/brand/updateBrand/status`,
    method: 'POST',
    withCredentials: true
  },
  {
    name: 'GDS_SPU_EVICTDIRECTIONCACHE',
    url: `${sale}/gds/spu/evictDirectionCache`,
    method: 'GET',
    withCredentials: true
  },
  {
    name: 'MDDS_MERCHANT_PAGE',
    url: `${mock}/mdds/merchant/page`,
    method: 'GET',
    withCredentials: true
  },
  {
    name: 'MDDS_MERCHANT_INIT',
    url: `${mock}/mdds/merchant/init`,
    method: 'GET',
    withCredentials: true
  },
  {
    name: 'CREATE_MERCHANT',
    url: `${sale}/mdds/merchant/createMerchant`,
    method: 'post',
    withCredentials: true
  },
  {
    name: 'UPDATE_MERCHANT',
    url: `${sale}/mdds/merchant/updateMerchant`,
    method: 'post',
    withCredentials: true
  },
  {
    name: 'GET_MERCHANT',
    url: `${sale}/mdds/merchant/getMerchant`,
    method: 'get',
    withCredentials: true
  },
  {
    name: 'DEMO',
    url: `${mock}/demo`,
    method: 'GET',
    withCredentials: true
  }
]

export default demo
