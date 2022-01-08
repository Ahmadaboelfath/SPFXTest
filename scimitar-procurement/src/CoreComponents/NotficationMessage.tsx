import * as React from 'react';
import { MDBAlert, MDBContainer } from "mdbreact";

import compStyles from './Componentstyles.module.scss';

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
                        this.props.Type == "Success" ? compStyles.notficationMessage + " " + compStyles.notficationMessageSuccess :
                            this.props.Type == "Error" ? compStyles.notficationMessage + " " + compStyles.notficationMessageError :
                                compStyles.notficationMessage} dismiss>
                        <strong>{
                            this.props.Type == "Success" ? "Success" :
                                this.props.Type == "Error" ? "Error" :
                                    "Information"}</strong> <p>{this.props.Message}</p>
                    </MDBAlert>

                }
            </>
        );




    }

}
