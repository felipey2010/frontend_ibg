import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Title from "./Title";

// Generate Sales Data
// function createData(time, amount) {
//   return { time, amount };
// }

const members = [
  { name: "Crianças (0-8)", número: 20 },
  { name: "Adolescentes (8-13)", número: 18 },
  { name: "Jovens (13-30)", número: 34 },
  { name: "Adultos (acima de 30)", número: 28 },
];

// const data = [
//   createData("00:00", 0),
//   createData("03:00", 300),
//   createData("06:00", 600),
//   createData("09:00", 800),
//   createData("12:00", 1500),
//   createData("15:00", 2000),
//   createData("18:00", 2400),
//   createData("21:00", 2400),
//   createData("24:00", undefined),
// ];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Detalhes de Membresia</Title>
      <ResponsiveContainer>
        <LineChart
          data={members}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}>
          <XAxis dataKey="name" stroke="#000000" />
          <YAxis stroke="#000000">
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
              }}>
              Contagem
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="número" stroke="#c11c1c" dot={false} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
