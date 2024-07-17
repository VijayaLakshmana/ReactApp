import Api from "./ApiService";
import { updateField } from "../Redux/BusDetails";
class BusSearchService {
  constructor() {
    this.busUrl = process.env.REACT_APP_BUS_URL;
    this.api = new Api();
  }
  async busData(dispatch, toast) {
    try {
      const response = await this.api.get(this.busUrl);
      dispatch(updateField({ field: "busDetails", value: response.data }));
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  }
  updateBusDetails(busDetails, date) {
    busDetails.map(async (bus) => {
      if (
        bus.dates.length === 0 ||
        !bus.dates.find((dateObj) => dateObj.date === date)
      ) {
        await this.api.put(`${this.busUrl}/${bus._id}`, {
          date: date,
          bookedSeats: []
        });
      }
    });
  }

  async fetchFilteredBuses(
    from,
    to,
    showACBus,
    showNonACBus,
    showSeaterBus,
    showNonSeaterBus,
    selectBoardingPoint,
    selectDropingPoint,
    minPrice,
    maxPrice
  ) {
    try {
      const response = await this.api.get(
        `http://localhost:5000/bus/search?from=${from}&to=${to}&showACBus=${showACBus}&showNonACBus=${showNonACBus}&showSeaterBus=${showSeaterBus}&showNonSeaterBus=${showNonSeaterBus}&selectBoardingPoint=${selectBoardingPoint}&selectDropingPoint=${selectDropingPoint}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch filtered buses");
      }
    } catch (error) {
      throw new Error("Failed to fetch filtered buses: " + error.message);
    }
  }
}
export default BusSearchService;