import * as React from 'react';
import styles from './Feedback.module.scss';
import { Button, Icon } from 'office-ui-fabric-react';
import FeedBackService from "./FeedbackService";

interface FeedbackProps {
    Message: string;
    context?: any;
}
interface FeedbackStats {
    showBox: any;
    Msgtitle: string;
    MsgBody: string;
    showsuccess: any;
    showerror: any;
}



export class FeedBack extends React.Component<FeedbackProps, FeedbackStats>{


    private Feedbacksave: FeedBackService;


    constructor(props: FeedbackProps) {
        super(props);
        this.state = {
            showBox: false,
            Msgtitle: "",
            MsgBody: "",
            showsuccess: false,
            showerror: false,
        };
        this.Feedbacksave = new FeedBackService(this.props.context);
    }

    public handleMsgTitle(value) {
        const newState = { ...this.state };
        newState.Msgtitle = value;
        this.setState(newState);
    }

    public handleMsgBody(value) {
        const newState = { ...this.state };
        newState.MsgBody = value;
        this.setState(newState);
    }

    public submitFeedBack() {



        this.Feedbacksave.addFeedback(this.state.Msgtitle, this.state.MsgBody).then((feedAdd) => {
            if (feedAdd) {
                this.setState({
                    showBox: !this.state.showBox,
                    showsuccess: !this.state.showsuccess,
                    Msgtitle: "",
                    MsgBody: "",
                });
                setTimeout(() => {
                    this.setState({
                        showsuccess: !this.state.showsuccess,
                    });
                }, 5000);
                console.log("Feed back add succsufly");
            }
            else {
                this.setState({
                    showBox: !this.state.showBox,
                    showerror: !this.state.showerror,
                    Msgtitle: "",
                    MsgBody: "",
                });
                setTimeout(() => {
                    this.setState({
                        showerror: !this.state.showsuccess,
                    });
                }, 5000);
                console.log("Failed to add feedback");
            }
        });
    }

    public render(): React.ReactElement<{}> {
        return (

            <>
            {this.state.showsuccess &&
                <p className={styles.feedbackSucess}>Thank You! Your feedback submitted successfully</p> }
                {this.state.showerror &&
                <p className={styles.feedbackerror}>Sorry!</p>
                }

                <div className={styles.feedbackBox}>
                    <Button className={this.state.showBox ? styles.feedbackbtn + ' ' + styles.activeBtn : styles.feedbackbtn} onClick={() => {
                        this.setState({
                            showBox: !this.state.showBox
                        });
                    }}>
                        <span><Icon iconName="Feedback" />Feedback</span>
                    </Button>
                    <div className={this.state.showBox ? styles.feedbackform + ' ' + styles.activeBox : styles.feedbackform}>
                        <p>
                            {this.props.Message}
                        </p>
                        <div className={styles.field}>
                            <label>Subject</label>
                            <input name="subjectINput" value={this.state.Msgtitle} type="text" onChange={e => this.handleMsgTitle(e.target.value)} />
                        </div>
                        <div className={styles.field}>
                            <label>Body</label>
                            <textarea name="MessageINput"  value={this.state.MsgBody} onChange={e => this.handleMsgBody(e.target.value)} ></textarea>
                        </div>
                        <Button onClick={() => this.submitFeedBack()}><Icon iconName="send" />Submit</Button>
                    </div>
                </div>
            </>
        );
    }
}
