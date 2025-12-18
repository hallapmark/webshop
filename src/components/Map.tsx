import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import styles from "../css/Map.module.css"

function Map() {
  return (
    <div>
      <MapContainer className={styles.map} center={[59.435, 24.748]} zoom={12.5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[59.433, 24.752]}>
          <Popup>
            Solaris keskus. <br /> Avatud 9-22.
          </Popup>
        </Marker>
        <Marker position={[59.427, 24.723]}>
          <Popup>
            Kristiine keskus. <br /> Avatud 9-22.
          </Popup>
        </Marker>
        <Marker position={[59.422, 24.794]}>
          <Popup>
            Ülemiste keskus. <br /> Avatud 9-22.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
export default Map