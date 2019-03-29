import api from '../index'
import urls from './mockUrl'

const header = {}

export default {
  getBuyRecord(params) {
    return api.get(urls.getBuyRecord, params, header)
  }
}