import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { onSnapshot } from "firebase/firestore";
import { queryLoadWeightsForUserId } from "../util/queryLoadWeightsForUserId";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chart = {
  options: {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      type: "datetime",
    },
    markers: {
      size: [4, 7],
    },
  },
  series: [
    {
      data: [],
    },
  ],
};

function WeightChart({ user }) {
  const [weights, setWeights] = useState([]);
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);
  //console.log("user" + user.uid);

  useEffect(() => {
    return onSnapshot(
      queryLoadWeightsForUserId(user.uid, "asc"),
      (snapshot) => {
        setWeights(snapshot.docs);
      }
    );
  }, [user]);

  useEffect(() => {
    const data = weights.map((w) => ({
      x: w.data().date.toDate().getTime(),
      y: parseInt(w.data().weight),
    }));

    //console.log(data);

    setSeries([
      {
        data: data,
      },
    ]);

    //console.log(chartData);

    // async function getLatestPrice() {}

    // This function will be run when the component will be unmunted
    return () => {
      //clearTimeout(timeoutId);
    };
  }, [weights]);

  return (
    <Box>
      <Chart options={chart.options} series={series} type="line" width="900" />
    </Box>
  );
}

export default WeightChart;
