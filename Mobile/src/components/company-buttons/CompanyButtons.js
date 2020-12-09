import React, { PureComponent } from 'react';
import { companyEvents } from '../events';

class CompanyButtons extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    changeCompany = (EO) => {companyEvents.emit('EChangeCompany', this.state.data.find(d => d.company === EO.target.value))}
    
    render() {
        return  (<div 
        className='btn-group'
        role='group'>
         <div>
            {
            this.state.data.map(d => (
                <input type='button'
                        onClick= {this.changeCompany}
                        key={d.id}
                        defaultValue={d.company}
                        className='btn btn-success'
                        title={`Select ${d.company}`}/>))
            }        
         </div>
     </div>);
    }
}

export default CompanyButtons;