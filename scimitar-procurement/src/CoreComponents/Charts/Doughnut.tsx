import * as React from 'react';

import compStyles from '../Componentstyles.module.scss';

import { MDBBtn, MDBIcon } from 'mdbreact';
import { Doughnut } from 'react-chartjs-2';
interface DoughnutProps {
   data?: any;
   key?:number;
}
const data = {
   labels: [
      'Red',
      'Green',
      'Yellow'
   ],

   datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
         "#5E2750",
         "#EB9700",
         "#FECB00"
      ]
   }]
};

export const DoughnutComponent: React.FC<DoughnutProps> =
   (props) => {

      return (

         <>
               <div className={compStyles.chartPie}>
                  <Doughnut key={props.key} data={props.data || data} />


                     </div>

         </>
      );
   };