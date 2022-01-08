import * as React from 'react';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from "mdbreact";

import './Componentstyles.scss';

interface BannerProps {
    PageTitle?: string;
}
export const BannerComponent: React.FC<BannerProps> =
    (props) => {
        return (

            <div className="banner">
                <MDBContainer>
                    <h3 className="bannerTitle">{props.PageTitle}</h3>
                </MDBContainer>
            </div>
        );
    };
