import React, { PureComponent } from 'react';
import { filterEvents } from '../events';
import Data from '../../../public/data.json';

class FilterButtons extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            ...props,
            companies: Data.map(c => c.company)
        }
    }

    changeCompany = (EO) => { 
        console.log(EO.target.name)
    }

    render(){
        return  (<div 
        className='btn-group float-right'
        role='group'>
         <div>
             {
             this.state.companies.map(c => (
                <button onClick= {this.changeCompany}
                   name={c}  
                   className='btn btn-success'
                   title={`Select ${c}`}>
                        <span>{c}</span>
                </button>))
            }        
         </div>
     </div>);
    }
}

export default FilterButtons;