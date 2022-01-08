import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import styles from "./Componentstyles.module.scss";

interface ICommentProps{
    author:string;
    date: string;
    comment: string;
}
export const Comment: React.FC<ICommentProps> = (props)=>{
    return(
        <li className={props.author == "system" ? [styles.systemComment, styles.Comment].join(' '): [styles.userComment , styles.Comment].join(' ')}>
            <div className={styles.CommentLbl}>
            <span>{props.author == "system" ? <Icon iconName="System" /> : <Icon iconName="ChatInviteFriend" />}{props.author}</span>
            <span>{props.date}</span>
            </div>
            <div className={styles.CommentContent}>
            <span>{props.comment}</span>
            </div>
             
        </li>
    );
};
