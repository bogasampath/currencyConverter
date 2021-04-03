import axios from 'axios';
import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class LineChart extends Component{

    state ={
        history: {}
    }
    
    componentDidMount(){
        axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?currency=EUR&start=2013-08-01&end=2013-09-28')
            .then(response =>{
                //console.log(response.data.bpi);
                let a = {...this.state.history}
                
                a.bpi = {...response.data.bpi}
               // console.log(a);
                this.setState({ history: a})
        });
     }
    
    
    render(){
        //  {console.log(this.state.history.bpi['2013-08-03'])}
    return <div>
        <Line
            height={200}
            width={400}
            
            data = {{
                labels: [1,2,3,4,5,6,7,8],
                
                datasets: [{
                    label: 'Last 60 days trend',
                    data: [12, 19, 3, 15, 32, 3,45,7],
                    backgroundColor:['#58d68d'],
                    //showLine : true,
                    borderWidth: 2,
                    lineTension:0,
                    
                }],
                
            }}
            
         />

    </div>
    }
}

export default LineChart;