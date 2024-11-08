"use client"

import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

interface pointType {
  lat:number,
  lng:number,

}
interface GoogleMapsType {
  className?:string
  center?:pointType
  points: pointType[]
  zoom?:number
}

export default function GoogleMaps({className = "", center, points, zoom = 15 }:GoogleMapsType) {

  // const [markerRef, marker] = useMarkerRef();
  // useEffect(() => {
  //   if (!marker) {
  //     return;
  //   }
  //   // do something with marker instance here
  // }, [marker]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_IGOOGLE_MAPS_API_KEY as string}>
      <Map
        className={className}
        style={{width: '100%', height: '100%'}}
        defaultCenter={center || points[0]}
        defaultZoom={zoom}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        >
          {points.map((el,i)=>(
            <Marker
              // ref={markerRef}
              key={i}
              position={el}
              />
          ))}
      </Map>
    </APIProvider>
  )
}


