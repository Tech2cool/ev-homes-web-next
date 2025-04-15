"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import styles from "./piegraphcard.module.css";

const data1 = [
  { name: "Completed", value: 400 },
  { name: "Pending", value: 90 },

];
const Piegraphcard = ({Healine, percentage, status, lableone, labletwo,valueone,valuetwo, colors}) => {
  return (
    <div className={styles.maincontainer}>
      <div className={styles.container}>
        <div className={styles.chartWrapper}>
        <div className={styles.header} >{Healine}</div>
        <ResponsiveContainer fill>
            <PieChart>
              <Pie
                data={data1}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={104}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                // cornerRadius={20}
              >
                {data1.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip />
              <circle cx="50%" cy="50%"  r="28%" fill="#333" />
              <text x="50%"    y="32%"   textAnchor="middle"  dominantBaseline="middle"    fill="white" fontSize={14}  >
               <tspan fontSize={10}>{status} </tspan>
               <tspan  x="50%" dy="1.0em"  fontSize={20} fill={colors[1]}  >{percentage}</tspan>
               <tspan dy="1.6em" fill="grey" fontSize={12}   x="50%">Total</tspan>
               <tspan dy="2.0em" fill={colors[0]} fontSize={10}   x="50%">{lableone} : {valueone}</tspan>
               <tspan dy="1.2em" fill={colors[1]} fontSize={10}   x="50%">{labletwo} : {valuetwo}</tspan>
               
           
            </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

       
      </div>
    </div>
  );
};

export default Piegraphcard;
