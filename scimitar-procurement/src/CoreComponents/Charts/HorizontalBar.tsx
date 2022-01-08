import * as React from 'react';

import compStyles from '../Componentstyles.module.scss';

import { HorizontalBar } from 'react-chartjs-2';
interface HorizontalBarProps {
   data?: any;
}

const data = {
   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
   datasets: [
      {
         stack: "stack1",
         label: 'My First dataset',
         backgroundColor: 'rgba(255,99,132,0.8)',
         borderColor: 'rgba(255,99,132,1)',
         borderWidth: 0,
         hoverBackgroundColor: 'rgba(255,99,132,1)',
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
      xAxes: [{
         stacked: true
      }],
      yAxes: [{
         stacked: true
      }]
   }
};
export const HorizontalBarComponent: React.FC<HorizontalBarProps> =
   (props) => {

      return (

         <>

                  <HorizontalBar data={props.data || data}
                     width={100}
                     height={50}
                  // options={options}
                  />
         </>
      );
   };