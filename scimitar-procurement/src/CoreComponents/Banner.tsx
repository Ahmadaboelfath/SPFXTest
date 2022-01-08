import * as React from 'react';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from "mdbreact";

import compStyles from './Componentstyles.module.scss';

interface BannerProps {
    PageTitle?: string;
}
export const BannerComponent: React.FC<BannerProps> =
    (props) => {
        return (

            <div className={compStyles.banner}>
                <MDBContainer>
                    <h3 className={compStyles.bannerTitle}>{props.PageTitle}</h3>
                </MDBContainer>
            </div>
        );
    };
