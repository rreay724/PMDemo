import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export const options = {
  title: "Billets",
  pieHole: 0.4,
  is3D: false,
  //   pieSliceText: "value",
};

const PieChart = () => {
  const [billets, setBillets] = useState([]);
  let pieData = [];

  useEffect(() => {
    const fetchBillets = async () => {
      const res = await axios.get("/billet");
      setBillets(res.data);
    };
    fetchBillets();
  }, []);

  const data = billets.map((billet) => billet.billetStatus);

  function numOfBilletStatus(array, value) {
    let count = 0;
    array.filter((v) => v === value && count++);
    return count;
  }
  pieData.push(["Billet Status", "Number of Billets"]);

  data.forEach((billetStatus) => {
    if (billetStatus === "Vacant") {
      pieData.push(["Vacant", numOfBilletStatus(data, "Vacant")]);
    } else if (billetStatus === "On-hold") {
      pieData.push(["On-hold", numOfBilletStatus(data, "On-hold")]);
    } else if (billetStatus === "Filled") {
      pieData.push(["Filled", numOfBilletStatus(data, "Filled")]);
    } else if (billetStatus === "Cancelled") {
      pieData.push(["Cancelled", numOfBilletStatus(data, "Cancelled")]);
    }
  });

  pieData = Array.from(new Set(pieData.map(JSON.stringify)), JSON.parse);

  return (
    <Chart
      chartType="PieChart"
      data={pieData}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
};

export default PieChart;
