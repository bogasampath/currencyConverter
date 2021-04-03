import axios from "axios";
import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class LineChart extends Component {
    currentDate = new Date()
    state = {
    history: {},
    currency: null,
    startDate: new Date(this.currentDate.setDate(this.currentDate.getDate() -60)).toISOString().split('T')[0],
    endDate: new Date(this.currentDate.setDate(this.currentDate.getDate() + 60)).toISOString().split('T')[0]
  };

 api(){
    
    axios.get("https://api.coindesk.com/v1/bpi/historical/close.json?currency="+this.props.currency+"&start="+this.state.startDate+"&end="+this.state.endDate).then((response) => {
        //console.log(response.data.bpi);
        let a = { ...this.state.history };

        a.bpi = { ...response.data.bpi };
        // console.log(a);
        this.setState({ history: a});
      });
 }
  componentDidMount() {
    
    this.api();

  }

  componentDidUpdate(prevProps,prevState) {
    if(prevProps.currency !== this.props.currency){
    this.api();
    }
  }

  render() {
    let labelData = this.state.history.bpi
      ? Object.keys(this.state.history.bpi).map((key) => [key])
      : "";

      let labelvalues = this.state.history && this.state.history.bpi
      ? Object.values(this.state.history.bpi)
      : "";

    let arr = [];
    let arr2=[];

    let maxVal = 12;

    let delta = Math.floor(labelData.length / maxVal);
                                
    for (let i = 0; i < labelData.length; i = i + delta) {
      arr.push(labelData[i]);
      arr2.push(labelvalues[i]);
    }

    return (
      <div>
        <Line
          height={200}
          width={400}
          data={{
            labels: arr,
            

            datasets: [
              {
                label: "Last 60 days trend",
                data: arr2,
                backgroundColor: ["#58d68d"],
                
                borderWidth: 2,
                lineTension: 0,
              },
            ],
          }}
          
        />
      </div>
    );
  }
}

export default LineChart;
