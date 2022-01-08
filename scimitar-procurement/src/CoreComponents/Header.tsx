import * as React from 'react';
import { NavLink } from "react-router-dom";
import compStyles from './Componentstyles.module.scss';
import { MDBContainer, MDBRow, MDBCol, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, } from 'mdbreact';


export interface IHeaderState {
   collapse?: boolean;
}

export class HeaderPageComponent extends React.Component<{}, IHeaderState>{

   constructor(props) {
      super(props);
      this.state = {
         collapse: false,
      };
      this.onClick = this.onClick.bind(this);
   }

   public onClick() {
      this.setState({
         collapse: !this.state.collapse,
      });
   }


   public render(): React.ReactElement<{}> {
      return (

         <div className="navigationContainer">
            <MDBContainer>

               <MDBNavbar expand="md">
                  <MDBNavbarBrand href="/">
                     <span className={compStyles.navbarbrand} >
                        <img src={require('../Assets/images/vd-logo-red.svg')} alt="Logo" />
                        Anti-bribery Third Party Representative Register
                  </span>
                  </MDBNavbarBrand>


                  <MDBNavbarToggler onClick={this.onClick} />
                  <MDBCollapse isOpen={this.state.collapse} navbar>

                     <MDBNavbarNav right>
                       
                        <MDBNavItem>
                           <MDBNavLink to="/">Home</MDBNavLink>
                     </MDBNavItem>
                     </MDBNavbarNav>
                  </MDBCollapse>
               </MDBNavbar>



            </MDBContainer>

         </div>
      );
   }
}
