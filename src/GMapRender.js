import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import request from 'superagent'
import { getAllResidencies } from './api.js'

export default class Map extends React.Component{
 
    state = {
        selected: null,
        resListings: []
    }

    setSelected = (selected) =>{
        this.setState({selected})
    }

    async componentDidMount(){
        const allListings = await getAllResidencies();
        this.setState({resListings: allListings})
        console.log(this.state.resListings)
    }

    // const [selected, setSelected] = useState(null);
    render(){
    
        return <GoogleMap 
              defaultZoom={4.5} 
              defaultCenter={{lat:37.9283459, lng:-94.5794797}} 
            >
                  {/* <Marker 
                  key={Math.random()}
                  position={{ lat:45.512230, lng:-122.658722
                  }}
                /> */}
  
                {/* map through all the residential listings and map 'em out lol  */}
              {this.state.resListings.map((res =>
  
                <Marker 
                  key={Math.random()}
                  position={{ lat:Number(res.lat), lng:Number(res.long) 
                  }}
                  onClick={() => {
                    this.setSelected(res);
                  }}
                />
              ))};
  
              {this.state.selected && (
                 <InfoWindow
                    position={{ lat:Number(this.state.selected.lat), lng:Number(this.state.selected.long) }} 
                    onCloseClick={() => {this.setSelected(null);}}
                  >
                <div style={{background: 'red', height: '200px', width: '200px'}}/>
                </InfoWindow>
        
               )}
            </GoogleMap>
    }
    
  }
  export const WrappedMap = withScriptjs(withGoogleMap(Map));