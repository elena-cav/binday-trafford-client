import http from '../src/http-common';

class BinDayDataService {
  getBinByArea(area) {
    return http.get(`/areas/${area}?getNextDate=true`);
  }
  getBinsByArea(area) {
    return http.get(`/areas/${area}`);
  }
  getGreenBinContent() {
    return http.get(`/colours/green`);
  }
}

export default new BinDayDataService();
