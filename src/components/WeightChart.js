import { Box, Heading, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { onSnapshot } from "firebase/firestore";
import { queryLoadWeightsForUserId } from "../util/queryLoadWeightsForUserId";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function WeightChart({ weights }) {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.50", dark: "gray.800" };
  const color = { light: "black", dark: "white" };
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);

  //console.log(colorMode);
  useEffect(() => {
    //console.log("mode:" + colorMode);
    setOptions({
      chart: {
        id: "weight-line-chart",
        background: bgColor,
      },
      theme: {
        mode: colorMode,
      },
      xaxis: {
        type: "datetime",
        tooltip: {
          // at the bottom
          enabled: false,
        },
      },
      markers: {
        size: [4, 7],
      },
      tooltip: {
        enabled: true,
      },
    });
  }, [colorMode]);

  useEffect(() => {
    const data = weights.map((w) => ({
      x: w.data().date.toDate().getTime(),
      y: parseInt(w.data().weight),
    }));
    //console.log(data);
    setSeries([
      {
        name: "Weight",
        data: data,
      },
    ]);
  }, [weights]);

  return (
    <Box>
      <Heading>Weights: </Heading>
      <Chart options={options} series={series} type="line" width="900" />
    </Box>
  );
}

export default WeightChart;
