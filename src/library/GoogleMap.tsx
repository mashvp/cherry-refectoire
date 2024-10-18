'use client'

import GoogleMapReact from 'google-map-react';

interface GooglemapType {
  className:string
}

export default function GoogleMap({className}:GooglemapType){
  const defaultProps = {
    center: {
      lat: 43.5986837,
      lng: 1.4489756
    },
    zoom: 16
  };

  return (
    // Important! Always set the container height explicitly
    <div className={className}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBZdzHO4nwB1gabI_vENfeWOq69_YuZDa0" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={43.5986837}
          lng={1.4489756}
          texte="sdfghj"
          // className='rounded-4 bg-ClearPrimary'
        />
     
      </GoogleMapReact>
    </div>
  );
}



const AnyReactComponent = ({ texte, lat, lng }:any) => <div>{texte}</div>;


// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

// const mapStyles = {
//   width: '100%',
//   height: '50%'
// };

// const GoogleMap = () => {

//   return (
//     <Map
//       google={window.google}
//       zoom={17}
//       style={mapStyles}
//       initialCenter={
//         {
//           lat: 19.020145856138136,
//           lng: -98.24006775697993
//         }
//       }
//     >
//       <Marker
//         position={
//           {
//             lat: 19.020145856138136,
//             lng: -98.24006775697993
//           }
//         }
//       />

//     </Map>
//   )
// }

// export default GoogleApiWrapper({
//   apiKey: "YOUR API KEY",
// })(GoogleMap);