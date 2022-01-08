import * as React from 'react';
import { MDBAlert, MDBContainer } from "mdbreact";

import './Componentstyles.scss';

interface NotficationProps {
    Message: string;
    Type: string;
    resetValues();

}
interface NotficationStats {
    hideMe: any;
}

export class NotficationMessage extends React.Component<NotficationProps, NotficationStats>{

    private timer;
    constructor(props: NotficationProps) {
        super(props);
        this.state = { hideMe: 0 };

    }



    public componentDidMount() {

        this.timer = setTimeout(
            function () {
                this.setState({ hideMe: 1 });
                this.props.resetValues();
            }
                .bind(this), 3000);
    }
    public componentWillUnmount() {
        clearInterval(this.timer);
    }

    public render(): React.ReactElement<{}> {
        return (
            <>
                {this.timer == 1 ?
                    <></> :
                    <MDBAlert className={
                        this.props.Type == "Success" ?  "notficationMessage  notficationMessageSuccess" :
                            this.props.Type == "Error" ?  " notficationMessage  notficationMessageError" :"notficationMessage"} dismiss>
                        <strong>{
                            this.props.Type == "Success" ? "Saved Successfully" :
                                this.props.Type == "Error" ? "Error in save" :
                                    "Information"}</strong> <p>{this.props.Message}</p>
                    </MDBAlert>

                }
            </>
        );




    }

}
