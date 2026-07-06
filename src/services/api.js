import axios from "axios";

// export const getCountries = async () => {
//   try {
//     const res = await axios.get("https://restcountries.com/v3.1/all?fields=name");
//     return res.data.map((c) => c.name.common ).sort();
//   } catch (error) {
//     console.error("Error fetching countries:", error.message);
//     return [];
//   }
// }



export const getStates = async (country) => {
  try {
    const res = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/states",
      {
        country: country,
      }
    );
    
    return res.data.data.states.map((state) => state.name);
  } catch (error) {
    console.error("Error fetching states:", error.message);
    return [];
  }
};

