import * as React from 'react';

import  Checkbox from '@material-ui/core/Checkbox';
import { Icon } from 'office-ui-fabric-react/lib/Icon';


interface filterstatus {
    showside?:boolean
}

interface FilterProps {
    filterBox?: boolean;
    handleInputChange(event);
 }

export class FilterComponent extends React.Component<FilterProps>{

    public render(): React.ReactElement<{}> {
        return (

            <>
                    <div className="subContainer filterArea">
                    {this.props.filterBox &&
                        <div className="leftContainer">
                            <button className="btn btnFilter" onClick={this.props.handleInputChange}><span className="filterCount"> </span> Filter 
                            <Icon iconName="ChevronDown" /></button>
                            <a className="clearFilter"> Clear filters </a>
                        </div>

                        }
                     
                        <div className="rightContainer">
                            <div className="row logSearch textCenter">
                                <div className="col-md-12 mb-12  col-12 mb-12 ">
                                    <div className="customSearch input-group md-form form-sm form-2 pl-0">
                                        <input className="form-control my-0 py-1 red-border" type="text" placeholder="Search" aria-label="Search" />
                                        <div className="input-group-append">
                                                 <Icon iconName="Zoom" />
                                        </div>
                                        <span className="cancelInput">X</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
       
           

                {this.props.filterBox &&

                <div className="leftFilter">
           <div className="filterOption">
                           <label className="filterLabel">By Status</label>
                           <ul>
                              <li>
                                 <label className="customCheckbox"  >Rework assigned
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li> <label className="customCheckbox" >Resubmitted
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li> <label className="customCheckbox" >Rejected
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li> <label className="customCheckbox" >Approved/ Progressed
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li> <label className="customCheckbox" >Live: Low risk
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label> 
                              </li>
                              <li><label className="customCheckbox">Live: Medium risk
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li><label className="customCheckbox">Live: High risk
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li><label className="customCheckbox">Live: Critical risk
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li><label className="customCheckbox">Expired
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                           </ul>
                        </div>
                        <div className="filterOption">
                           <label className="filterLabel">By month</label>
                           <ul>
                              <li>
                                 <label className="customCheckbox">March 2020
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li>
                                 <label className="customCheckbox">February 2020
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li>
                                 <label className="customCheckbox">January 2020
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li> 
                                 <label className="customCheckbox">December 2019
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li>
                                 <label className="customCheckbox">November 2019
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li>
                                 <label className="customCheckbox">October 2019
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li>
                                 <label className="customCheckbox">September 2019
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li>
                                 <label className="customCheckbox">August 2019
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li>
                                 <label className="customCheckbox">July 2019
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li>
                                 <label className="customCheckbox">June 2019
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li>
                                 <label className="customCheckbox">May 2019
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li>
                                 <label className="customCheckbox">April 2019
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                              <li>
                                 <label className="customCheckbox">Older
                                 <input type="checkbox"  />
                                 <span className="checkmark"></span>
                                 </label>
                              </li>
                           </ul>
                        </div>
                </div>
                }

          </>
        );
    }
}
