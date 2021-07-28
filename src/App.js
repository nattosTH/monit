
import React, { useEffect,useState} from 'react';
import {Line} from 'react-chartjs-2'

function App() {
  
  const [dataset, setDataset] = useState({
    labels: [],
    datasets: [
      {
        label: 'login counter',
        data: [],
        fill: true,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  });

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const getData = () => {
    fetch('http://localhost:4000')
    .then(res => res.json())
    .then(data =>{
      const labels = data.map((e) => e.snapdatetime);
      const dataCount = data.map((e) => e.count);
      let oldDatasets = dataset.datasets;
      oldDatasets[0].data = dataCount;    
      setDataset(prevState => ({
        ...prevState,
        labels: labels,
        datasets:[oldDatasets[0]]
      }));
    })
    .catch(error => console.log(error))
  }
  
  useEffect(() => {
    getData();

    const interval = setInterval(() => {
      getData();
    }, 10000)

    return () => clearInterval(interval)
  },[]);

  
  
  
  return (
   
    <div id="graph" style={{"width" : "700px","height": "auto"}}>
        <Line  data={dataset} options={options} />
        {/* <button onClick={makeRefleshTimer}>Reflesh</button> */}
    </div>
  );
}

export default App;
