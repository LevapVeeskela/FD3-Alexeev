import React, { PureComponent } from 'react';
import { companyEvents } from '../events';
import Data from '../../../public/data.json';

class CompanyButtons extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            data: [...Data]
        }
    }

    changeCompany = (EO) => { 
        companyEvents.emit('EChangeCompany', Data.find(d => d.company === EO.target.value))
    }

    render(){
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