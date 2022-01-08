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
        <li className={props.author == "system" ? styles.systemComment: styles.userComment}>
            <label>{props.author == "system" ? <Icon iconName="System" /> : <Icon iconName="ChatInviteFriend" />}{props.author}</label>
            <pre><div  dangerouslySetInnerHTML={{ __html: props.comment }}></div></pre>
             <span>{props.date}</span>
        </li>
    );
};
