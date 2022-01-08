import * as React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export class BannerFilterComponent extends React.Component<{}>{


    public render(): React.ReactElement<{}> {
        return (


            <div className="topFilter">
                <div className="categoryFilter">
                    <label> Categories </label>
                    <Select className="dropdown">
                        <MenuItem value={10}>All</MenuItem>
                        <MenuItem value={20}>March 2020</MenuItem>
                        <MenuItem value={30}>April 2020</MenuItem>
                    </Select>
                </div>
                <div className="dateFilter">
                    <label> Time period </label>
                    <Select  className="dropdown">
                        <MenuItem value={10}>FY 2019-2020</MenuItem>
                        <MenuItem value={20}>FY 2018-2019</MenuItem>
                    </Select>
                </div>
                <button className="btn btn-primary">Submit</button>
            </div>
        );
    }
}
