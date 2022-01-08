import * as React from 'react';
import './Componentstyles.scss';
import { MDBContainer, MDBRow, MDBCol, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';


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

   onClick() {
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
                     <span className="navbarbrand" >
                        <img src={require('../Assets/images/vd-logo-red.svg')} alt="Logo" />
                        V-DNA
                     </span>
                  </MDBNavbarBrand>


                  <MDBNavbarToggler onClick={this.onClick} />
                  <MDBCollapse isOpen={this.state.collapse} navbar>

                     <MDBNavbarNav right>
                        <MDBNavItem>
                           <MDBNavLink to="/" exact>Home</MDBNavLink>
                        </MDBNavItem>
                        {/* <MDBNavItem>
                           <MDBNavLink to="/new-request/New" exact>New Request</MDBNavLink>
                        </MDBNavItem>  */}
                     </MDBNavbarNav>
                  </MDBCollapse>
               </MDBNavbar>



            </MDBContainer>

         </div>
      );
   }
}
