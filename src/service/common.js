const { mock } = process.env.API_HOST_LIST

const common = [
  {
    name: 'GET_PERMISSION',
    url: `${mock}/api/authenticate`,
    method: 'GET',
    withCredentials: true
  },
  {
    name: 'GET_ME',
    url: `${mock}/api/me`,
    method: 'GET',
    withCredentials: true
  },
  {
    name: 'GET_MENU',
    url: `${mock}/api/menu`,
    method: 'GET',
    withCredentials: true
  },
  {
    name: 'COMMON_FILEUPLOAD',
    url: `${mock}/common/fileUpload`,
    method: 'POST',
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
]

export default common
