import * as React from 'react';

import compStyles from '../Componentstyles.module.scss';

import { Bar } from 'react-chartjs-2';
interface BarProps {
   data?: any;
   onClick(elem);
}

const data = {
   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
   datasets: [
      {
         stack: "stack1",
         label: 'My First dataset',
         backgroundColor: 'rgba(255,99,132,0.2)',
         borderColor: 'rgba(255,99,132,1)',
         borderWidth: 1,
         hoverBackgroundColor: 'rgba(255,99,132,0.4)',
         hoverBorderColor: 'rgba(255,99,132,1)',
         data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
         label: 'My 2nd dataset',
         stack: "stack1",
         data: [50, 30, 40, 51, 26, 45, 10]
      }
   ]
};
const options = {
   scales: {
      yAxes: [{
         ticks: {
            beginAtZero: true,
            min: 0,
            stepSize: 5
         }
      }]
   }
};
export const BarComponent: React.FC<BarProps> =
   (props) => {

      return (
         <>
            <Bar data={props.data || data}
               width={100}
               height={50}
               onElementsClick={props.onClick}
               options={options}
            />
         </>
      );
   };